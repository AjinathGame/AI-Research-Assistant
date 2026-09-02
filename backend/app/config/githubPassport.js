import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import User from "../models/auth.js";

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ["user:email"],
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("========== GITHUB AUTH ==========");

        const githubId = profile.id;
        const username = profile.username;

        console.log("GitHub ID:", githubId);
        console.log("GitHub Username:", username);

        const email = profile.emails?.[0]?.value?.toLowerCase();

        console.log("GitHub Email:", email);

        if (!email) {
          return done(
            new Error(
              "GitHub email not available. Please allow email access."
            ),
            null
          );
        }

        // Find user by GitHub ID
        let user = await User.findOne({
          githubId: githubId,
        });

        // Find user by email
        if (!user) {
          user = await User.findOne({
            email: email,
          });
        }

        // Create new GitHub user
        if (!user) {
          user = await User.create({
            name: username,
            email: email,
            githubId: githubId,
            password: null,
            authProvider: "github",
            providerId: githubId,
            isVerified: true,
          });

          console.log(
            "New GitHub user created:",
            user.email
          );
        }

        // Existing user
        else {
          if (!user.githubId) {
            user.githubId = githubId;
          }

          user.authProvider = "github";
          user.providerId = githubId;
          user.isVerified = true;

          await user.save();

          console.log(
            "Existing GitHub user logged in:",
            user.email
          );
        }

        console.log("GitHub authentication successful");

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