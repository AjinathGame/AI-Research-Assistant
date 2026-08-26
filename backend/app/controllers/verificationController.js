export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;

        const user = await User.findOne({
            verificationToken: token,
            verificationTokenExpires: {
                $gt: new Date(),
            },
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid or expired verification link",
            });
        }

        user.isVerified = true;
        user.verificationToken = null;
        user.verificationTokenExpires = null;

        await user.save();

        res.status(200).json({
            message: "Email verified successfully",
        });
    } catch (error) {
        console.error("Email verification error:", error.message);

        res.status(500).json({
            message: "Server error",
        });
    }
};

export const resendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        if (user.isVerified) {
            return res.status(400).json({
                message: "Email is already verified",
            });
        }

        // Generate new verification token
        const verificationToken = crypto
            .randomBytes(32)
            .toString("hex");

        // Token expires in 15 minutes
        const verificationTokenExpires = new Date(
            Date.now() + 15 * 60 * 1000
        );

        // Replace old token
        user.verificationToken = verificationToken;
        user.verificationTokenExpires = verificationTokenExpires;

        await user.save();

        // Send new verification email
        await sendVerificationEmail(
            user.email,
            verificationToken
        );

        return res.status(200).json({
            message: "Verification email sent successfully",
        });

    } catch (error) {
        console.error(
            "Resend verification error:",
            error.message
        );

        return res.status(500).json({
            message: "Server error",
        });
    }
};