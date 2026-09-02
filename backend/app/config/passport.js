import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import User from "../models/auth.js";

console.log(
  "GOOGLE_CLIENT_ID exists:",
  !!process.env.GOOGLE_CLIENT_ID
);

console.log(
  "GOOGLE_CLIENT_SECRET exists:",
  !!process.env.GOOGLE_CLIENT_SECRET
);

console.log(
  "GOOGLE_CALLBACK_URL:",
  process.env.GOOGLE_CALLBACK_URL
);

console.log(
  "GITHUB_CLIENT_ID exists:",
  !!process.env.GITHUB_CLIENT_ID
);

console.log(
  "GITHUB_CLIENT_SECRET exists:",
  !!process.env.GITHUB_CLIENT_SECRET
);

console.log(
  "GITHUB_CALLBACK_URL:",
  process.env.GITHUB_CALLBACK_URL
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      authorizationParams: {
        prompt: "select_account",
      },
    },
    async (
      accessToken,
      refreshToken,
      profile,
      done
    ) => {
      try {
        const googleId = profile.id;

        const name =
          profile.displayName || "Google User";

        const email =
          profile.emails?.[0]?.value?.toLowerCase();

        console.log("Google Login Callback");
        console.log("Google ID:", googleId);
        console.log("Google Name:", name);
        console.log("Google Email:", email);

        if (!email) {
          return done(
            new Error("Google email not available"),
            null
          );
        }

        let user = await User.findOne({
          googleId,
        });

        if (!user) {
          user = await User.findOne({
            email,
          });
        }

        if (!user) {
          user = await User.create({
            name,
            email,
            googleId,
            password: null,
            authProvider: "google",
            providerId: googleId,
            isVerified: true,
          });

          console.log(
            "New Google user created:",
            user.email
          );
        } else {
          user.name = name;
          user.email = email;

          if (!user.googleId) {
            user.googleId = googleId;
          }

          user.authProvider = "google";
          user.providerId = googleId;
          user.isVerified = true;

          await user.save();

          console.log(
            "Existing Google user updated:",
            user.name,
            user.email
          );
        }

        return done(null, user);
      } catch (error) {
        console.error(
          "Google authentication error:",
          error
        );

        return done(error, null);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (
      accessToken,
      refreshToken,
      profile,
      done
    ) => {
      try {
        const githubId = profile.id;

        const name =
          profile.displayName ||
          profile.username ||
          "GitHub User";

        const email =
          profile.emails?.[0]?.value?.toLowerCase();

        console.log("GitHub Login Callback");
        console.log("GitHub ID:", githubId);
        console.log("GitHub Name:", name);
        console.log("GitHub Email:", email);

        if (!email) {
          return done(
            new Error(
              "GitHub email not available. Please make your email public on GitHub."
            ),
            null
          );
        }

        let user = await User.findOne({
          githubId,
        });

        if (!user) {
          user = await User.findOne({
            email,
          });
        }

        if (!user) {
          user = await User.create({
            name,
            email,
            githubId,
            password: null,
            authProvider: "github",
            providerId: githubId,
            isVerified: true,
          });

          console.log(
            "New GitHub user created:",
            user.email
          );
        } else {
          user.name = name;
          user.email = email;

          if (!user.githubId) {
            user.githubId = githubId;
          }

          user.authProvider = "github";
          user.providerId = githubId;
          user.isVerified = true;

          await user.save();

          console.log(
            "Existing GitHub user updated:",
            user.name,
            user.email
          );
        }

        return done(null, user);
      } catch (error) {
        console.error(
          "GitHub authentication error:",
          error
        );

        return done(error, null);
      }
    }
  )
);

export default passport;