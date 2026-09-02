import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MailCheck,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // VERIFY EMAIL
  // ==========================================
  const handleVerifyEmail = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess(false);

      console.log("Verification Token:", token);

      const response = await fetch(
        `http://localhost:5000/api/auth/verify-email/${token}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      console.log("Verification Response:", data);

      if (!response.ok) {
        setError(
          data.message || "Email verification failed."
        );
        return;
      }

      setSuccess(true);

    } catch (error) {
      console.error(
        "Email verification error:",
        error
      );

      setError(
        "Unable to connect to server. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#eeeeee] px-4">

      <div className="w-full max-w-[480px] rounded-2xl bg-white p-8 text-center shadow-xl">

        {/* =====================================
            BEFORE VERIFICATION
        ====================================== */}

        {!success && !error && (
          <>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-purple-100">
              <MailCheck
                size={42}
                className="text-purple-600"
              />
            </div>

            <h1 className="mt-6 text-3xl font-bold text-gray-900">
              Verify Your Email
            </h1>

            <p className="mt-3 leading-6 text-gray-500">
              Your account has been created successfully.
              Please verify your email address to continue.
            </p>

            <button
              onClick={handleVerifyEmail}
              disabled={loading}
              className="mt-7 flex h-[50px] w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#5637f5] to-[#8124f5] text-[17px] font-semibold text-white shadow-lg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2
                    size={20}
                    className="animate-spin"
                  />

                  Verifying...
                </>
              ) : (
                "Verify Email"
              )}
            </button>
          </>
        )}

        {/* =====================================
            SUCCESS
        ====================================== */}

        {success && (
          <>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle
                size={45}
                className="text-green-600"
              />
            </div>

            <h1 className="mt-6 text-3xl font-bold text-green-600">
              Email Verified!
            </h1>

            <p className="mt-3 leading-6 text-gray-600">
              Your email has been successfully verified.
              You can now login to your account.
            </p>

            <button
              onClick={() => navigate("/Login")}
              className="mt-7 h-[50px] w-full cursor-pointer rounded-md bg-gradient-to-r from-[#5637f5] to-[#8124f5] text-[17px] font-semibold text-white shadow-lg transition hover:opacity-90"
            >
              Go to Login
            </button>
          </>
        )}

        {/* =====================================
            ERROR
        ====================================== */}

        {error && (
          <>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <XCircle
                size={45}
                className="text-red-600"
              />
            </div>

            <h1 className="mt-6 text-3xl font-bold text-red-600">
              Verification Failed
            </h1>

            <p className="mt-3 leading-6 text-gray-600">
              {error}
            </p>

            <button
              onClick={() => navigate("/Create-account")}
              className="mt-7 h-[50px] w-full cursor-pointer rounded-md border border-gray-300 bg-white text-[17px] font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Back to Create Account
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default VerifyEmail;