import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  tls: {
    rejectUnauthorized: false,
  },
});

console.log("EMAIL_USER =", process.env.EMAIL_USER);
console.log("EMAIL_PASS exists =", !!process.env.EMAIL_PASS);

export const sendVerificationEmail = async (email, token) => {
  const verificationLink =
    `${process.env.FRONTEND_URL}/verify-email/${token}`;

  const mailOptions = {
    from: `"AI-Search Assistant" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify Your Email",

    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">

        <h2>Verify Your Email</h2>

        <p>
          Thank you for creating an account with Scholar RAG.
        </p>

        <p>
          Please click the button below to verify your email address.
        </p>

        <a
          href="${verificationLink}"
          style="
            display: inline-block;
            padding: 12px 24px;
            background-color: #2563eb;
            color: white;
            text-decoration: none;
            border-radius: 6px;
          "
        >
          Verify Email
        </a>

        <p style="margin-top: 20px;">
          This verification link will expire in 15 minutes.
        </p>

      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};


// ========================================
// FORGOT PASSWORD EMAIL
// ========================================

export const sendResetPasswordEmail = async (email, token) => {

  const resetLink =
    `${process.env.FRONTEND_URL}/reset-password/${token}`;

  const mailOptions = {
    from: `"Scholar RAG" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Reset Your Password",

    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: auto;
        padding: 20px;
      ">

        <h2>Reset Your Password</h2>

        <p>
          We received a request to reset your Scholar RAG password.
        </p>

        <p>
          Click the button below to create a new password.
        </p>

        <a
          href="${resetLink}"
          style="
            display: inline-block;
            padding: 12px 24px;
            background-color: #2563eb;
            color: white;
            text-decoration: none;
            border-radius: 6px;
          "
        >
          Reset Password
        </a>

        <p style="margin-top: 20px;">
          This password reset link will expire in 15 minutes.
        </p>

        <p style="margin-top: 20px;">
          If you did not request a password reset,
          you can safely ignore this email.
        </p>

      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

transporter.verify((error, success) => {
  if (error) {
    console.error("EMAIL CONFIG ERROR:", error.message);
  } else {
    console.log("EMAIL SERVER READY ✅");
  }
});

