import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/auth.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        const googleId = profile.id;
        const name = profile.displayName;
        const email = profile.emails?.[0]?.value?.toLowerCase();

        console.log("Google ID:", googleId);
        console.log("Google Name:", name);
        console.log("Google Email:", email);

        if (!email) {
          return done(new Error("Google email not available"), null);
        }

        // 1. Find user by Google ID
        let user = await User.findOne({ googleId });

        // 2. If Google ID not found, find by email
        if (!user) {
          user = await User.findOne({ email });
        }

        // 3. If user does not exist, create new account
        if (!user) {
          user = await User.create({
            name,
            email,
            googleId,
            password: "GOOGLE_AUTH",
            isVerified: true,
          });

          console.log("New Google user created:", user.email);
        } else {
          // 4. Existing user
          if (!user.googleId) {
            user.googleId = googleId;
          }

          user.isVerified = true;

          await user.save();

          console.log("Existing user logged in:", user.email);
        }

        // 5. Send user to callback
        return done(null, user);
      } catch (error) {
        console.error("Google authentication error:", error);
        return done(error, null);
      }
    }
  )
);

export default passport;