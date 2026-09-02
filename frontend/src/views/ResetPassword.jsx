import React, { useState } from "react";
import { Lock, Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    // Password validation
    if (!password || !confirmPassword) {
      setError("Please enter both passwords.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
          }),
        }
      );

      const data = await response.json();

      console.log("Reset Password Response:", data);

      if (!response.ok) {
        setError(
          data.message || "Password reset failed."
        );
        return;
      }

      setSuccess(
        data.message ||
          "Password reset successfully."
      );

      setPassword("");
      setConfirmPassword("");

      // Login page वर redirect
      setTimeout(() => {
        navigate("/Login");
      }, 2000);

    } catch (error) {
      console.error(
        "Reset password error:",
        error
      );

      setError(
        "Unable to connect to server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#eeeeee] px-4">

      <div className="w-full max-w-[450px] rounded-2xl bg-white p-8 shadow-xl">

        {/* Header */}

        <div className="text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-purple-100">
            <Lock
              size={40}
              className="text-purple-600"
            />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Reset Password
          </h1>

          <p className="mt-3 text-gray-500">
            Create a new password for your account.
          </p>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="mt-8"
        >

          {/* New Password */}

          <label className="text-sm font-semibold text-gray-900">
            New Password
          </label>

          <div className="relative mt-2">

            <Lock
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter new password"
              className="h-[52px] w-full rounded-xl border border-gray-300 pl-12 pr-12 text-gray-900 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

          {/* Confirm Password */}

          <label className="mt-5 block text-sm font-semibold text-gray-900">
            Confirm Password
          </label>

          <div className="relative mt-2">

            <Lock
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              placeholder="Confirm new password"
              className="h-[52px] w-full rounded-xl border border-gray-300 pl-12 pr-12 text-gray-900 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
            >
              {showConfirmPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

          {/* Error */}

          {error && (
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              <XCircle size={18} />
              {error}
            </div>
          )}

          {/* Success */}

          {success && (
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-600">
              <CheckCircle size={18} />
              {success}
            </div>
          )}

          {/* Button */}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 h-[52px] w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-[17px] font-semibold text-white shadow-lg transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Updating Password..."
              : "Reset Password"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default ResetPassword;