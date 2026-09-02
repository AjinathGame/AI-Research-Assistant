import React, { useState } from "react";
import { Mail, ArrowLeft, Send } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong.");
        return;
      }

      setMessage(
        data.message ||
          "Password reset link has been sent to your email."
      );

      setEmail("");
    } catch (error) {
      console.error("Forgot password error:", error);
      setError("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#eeeeee] px-4">

      <div className="w-full max-w-[450px] rounded-2xl bg-white p-8 shadow-xl">

        {/* Back to Login */}

        <Link
          to="/Login"
          className="flex w-fit items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-purple-600"
        >
          <ArrowLeft size={16} />
          Back to Login
        </Link>

        {/* Header */}

        <div className="mt-8 text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-purple-100">
            <Mail
              size={40}
              className="text-purple-600"
            />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Forgot Password?
          </h1>

          <p className="mt-3 leading-6 text-gray-500">
            Enter your registered email address and
            we&apos;ll send you a password reset link.
          </p>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="mt-8"
        >

          <label className="text-sm font-semibold text-gray-900">
            Email Address
          </label>

          <div className="relative mt-2">

            <Mail
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
              className="h-[52px] w-full rounded-xl border border-gray-300 pl-12 pr-4 text-gray-900 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
            />

          </div>

          {/* Error */}

          {error && (
            <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Success */}

          {message && (
            <div className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-600">
              {message}
            </div>
          )}

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-[17px] font-semibold text-white shadow-lg transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >

            <Send size={19} />

            {loading
              ? "Sending..."
              : "Send Reset Link"}

          </button>

        </form>

        {/* Login */}

        <p className="mt-6 text-center text-sm text-gray-500">

          Remember your password?

          <Link
            to="/Login"
            className="ml-2 font-semibold text-violet-600 hover:underline"
          >
            Sign In
          </Link>

        </p>

      </div>

    </div>
  );
};

export default ForgotPassword;