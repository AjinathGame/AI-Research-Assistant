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
    },
    async (
      accessToken,
      refreshToken,
      profile,
      done
    ) => {
      try {
        console.log("========== GOOGLE AUTH ==========");

        const googleId = profile.id;

        const name =
          profile.displayName || "Google User";

        const email =
          profile.emails?.[0]?.value?.toLowerCase().trim();

        console.log("Google ID:", googleId);
        console.log("Google Name:", name);
        console.log("Google Email:", email);

        if (!email) {
          return done(
            new Error(
              "Google email not available"
            ),
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
            role: "user",
            isVerified: true,
            isActive: true,
            lastLoginAt: new Date(),
          });

          console.log(
            "New Google user created:",
            user.email
          );
        } else {
          if (!user.googleId) {
            user.googleId = googleId;
          }

          if (!user.providerId) {
            user.providerId = googleId;
          }

          user.authProvider = "google";
          user.isVerified = true;
          user.lastLoginAt = new Date();

          await user.save();

          console.log(
            "Existing Google account linked:",
            user.email
          );

          console.log(
            "Existing user role preserved:",
            user.role
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
      scope: ["user:email"],
    },
    async (
      accessToken,
      refreshToken,
      profile,
      done
    ) => {
      try {
        console.log("========== GITHUB AUTH ==========");

        const githubId = profile.id;

        const name =
          profile.displayName ||
          profile.username ||
          "GitHub User";

        const email =
          profile.emails?.[0]?.value
            ?.toLowerCase()
            .trim();

        console.log("GitHub ID:", githubId);
        console.log("GitHub Name:", name);
        console.log("GitHub Email:", email);

        if (!email) {
          return done(
            new Error(
              "GitHub email not available. Please allow email access."
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
            role: "user",
            isVerified: true,
            isActive: true,
            lastLoginAt: new Date(),
          });

          console.log(
            "New GitHub user created:",
            user.email
          );
        } else {
          if (!user.githubId) {
            user.githubId = githubId;
          }

          if (!user.providerId) {
            user.providerId = githubId;
          }

          user.authProvider = "github";
          user.isVerified = true;
          user.lastLoginAt = new Date();

          await user.save();

          console.log(
            "Existing GitHub account linked:",
            user.email
          );

          console.log(
            "Existing user role preserved:",
            user.role
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