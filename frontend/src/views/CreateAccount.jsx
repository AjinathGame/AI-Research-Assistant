import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle,
  X,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import heroImage from "../assets/newimg.jpeg";

const CreateAccount = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [agree, setAgree] = useState(false);

  const [loading, setLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  // =========================
  // Input Change
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSuccessMessage("");
    setErrorMessage("");
  };

  // =========================
  // Register
  // =========================

  const handleRegister = async (e) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    // Required fields
    if (!formData.name || !formData.email || !formData.password) {
      setErrorMessage("Please fill all required fields.");
      return;
    }

    // Password
    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    // Terms
    if (!agree) {
      setErrorMessage(
        "Please agree to the Terms of Service and Privacy Policy."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      console.log("Register Response:", data);

      if (!response.ok) {
        setErrorMessage(
          data.message || "Registration failed."
        );
        return;
      }

      // =========================
      // Registration Successful
      // =========================

      setSuccessMessage(
        "Registration successful! 🎉 Please check your email to verify your account."
      );

      // Clear form
      setFormData({
        name: "",
        email: "",
        password: "",
      });

      setAgree(false);

    } catch (error) {
      console.error("Registration error:", error);

      setErrorMessage(
        "Unable to connect to server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Google Login
  // =========================

  const handleGoogleLogin = () => {
    window.location.href =
      "http://localhost:5000/api/auth/google";
  };

  // =========================
  // GitHub Login
  // =========================

  const handleGithubLogin = () => {
    window.location.href =
      "http://localhost:5000/api/auth/github";
  };

  return (
    <>
      {/* =========================
          Account Created Success Toast
      ========================= */}

      {successMessage && (
        <div className="fixed bottom-5 left-5 z-[9999] w-[calc(100%-40px)] max-w-sm rounded-lg bg-green-600 px-5 py-4 text-white shadow-2xl sm:w-96">

          <div className="flex items-start gap-3">

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20">
              <CheckCircle size={22} />
            </div>

            <div className="flex-1">

              <p className="font-semibold">
                Account created successfully
              </p>

              <p className="mt-1 text-sm leading-5 text-white/90">
                Please check your email to verify your account.
              </p>

            </div>

            <button
              type="button"
              onClick={() => setSuccessMessage("")}
              className="shrink-0 text-white/80 transition hover:text-white"
            >
              <X size={18} />
            </button>

          </div>

        </div>
      )}

      <div className="min-h-screen bg-[#eeeeee] p-0 sm:p-4 lg:p-3">

      <div className="relative min-h-screen overflow-hidden bg-white sm:min-h-[calc(100vh-32px)] sm:rounded-2xl lg:min-h-[calc(100vh-24px)]">

        {/* =========================
            Background Image
        ========================= */}

        <div
          className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat lg:block"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        />

        <div className="absolute inset-0 hidden bg-black/5 lg:block" />

        {/* =========================
            Left Side Text
        ========================= */}

        <div className="absolute left-8 top-9 z-10 hidden lg:left-16 lg:block xl:left-20">

          <h1 className="text-4xl font-bold leading-tight text-white xl:text-5xl">
            Welcome Back to 👋
          </h1>

          <h1 className="text-4xl font-bold leading-tight text-[#b397ff] xl:text-5xl">
            AI-Search Assistent
          </h1>

          <p className="mt-4 max-w-[470px] text-[17px] leading-7 text-white/90">
            Create your free account and organize
            <br />
            your study material with AI-Powered
            <br />
            Retrieval Augmented Generation
          </p>

        </div>

        {/* =========================
            Right Side
        ========================= */}

        <div className="relative z-10 flex min-h-screen items-center justify-center p-4 sm:p-6 lg:justify-end lg:p-6 lg:pr-10 xl:pr-16">

          <div className="relative w-full max-w-[450px] rounded-[12px] bg-white p-6 shadow-xl sm:p-8 lg:p-6">

            {/* Home */}

            <div className="flex justify-end">

              <Link
                to="/"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 transition hover:text-purple-600"
              >
                <ArrowLeft size={15} />
                Home
              </Link>

            </div>

            {/* =========================
                Heading
            ========================= */}

            <div className="mt-2 text-center">

              <h1 className="text-3xl font-bold text-gray-900">
                Create Account ✨
              </h1>

              <p className="mt-2 text-gray-500">
                Let's get started
              </p>

            </div>

            {/* =========================
                Form
            ========================= */}

            <form
              onSubmit={handleRegister}
              className="mt-4"
            >

              {/* Full Name */}

              <div className="flex flex-col gap-2">

                <label className="text-sm font-semibold text-gray-900">
                  Full Name
                </label>

                <div className="relative">

                  <User
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="h-[50px] w-full rounded-md border border-gray-300 pl-12 pr-4 text-gray-900 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                  />

                </div>

              </div>

              {/* Email */}

              <div className="mt-4 flex flex-col gap-2">

                <label className="text-sm font-semibold text-gray-900">
                  Email Address
                </label>

                <div className="relative">

                  <Mail
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="h-[50px] w-full rounded-md border border-gray-300 pl-12 pr-4 text-gray-900 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                  />

                </div>

              </div>

              {/* Password */}

              <div className="mt-4 flex flex-col gap-2">

                <label className="text-sm font-semibold text-gray-900">
                  Password
                </label>

                <div className="relative">

                  <Lock
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="h-[50px] w-full rounded-md border border-gray-300 pl-12 pr-12 text-gray-900 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>

                </div>

              </div>

              {/* Terms */}

              <div className="mt-4 flex items-start gap-2">

                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) =>
                    setAgree(e.target.checked)
                  }
                  className="mt-1 h-4 w-4 cursor-pointer accent-purple-600"
                />

                <p className="text-[14px] leading-5 text-gray-600">

                  I agree to the{" "}

                  <span className="cursor-pointer font-medium text-purple-600 hover:underline">
                    Terms of Service
                  </span>

                  {" "}and{" "}

                  <span className="cursor-pointer font-medium text-purple-600 hover:underline">
                    Privacy Policy
                  </span>

                </p>

              </div>

              {/* Create Account Button */}

              <button
                type="submit"
                disabled={loading}
                className="mt-4 h-[50px] w-full cursor-pointer rounded-md bg-gradient-to-r from-[#5637f5] to-[#8124f5] text-[17px] font-semibold text-white shadow-lg transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading
                  ? "Creating Account..."
                  : "Create Account"}

              </button>

            </form>

            {/* =========================
                Social Login
            ========================= */}

            <div className="my-5 flex items-center gap-3">

              <div className="h-px flex-1 bg-gray-300" />

              <span className="whitespace-nowrap text-sm text-gray-500">
                Continue with
              </span>

              <div className="h-px flex-1 bg-gray-300" />

            </div>

            <div className="grid grid-cols-2 gap-3">

              {/* Google */}

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex h-[48px] cursor-pointer items-center justify-center gap-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >

                <FcGoogle size={21} />

                Google

              </button>

              {/* GitHub */}

              <button
                type="button"
                onClick={handleGithubLogin}
                className="flex h-[48px] cursor-pointer items-center justify-center gap-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >

                <FaGithub size={20} />

                GitHub

              </button>

            </div>

            {/* =========================
                ERROR MESSAGE
            ========================= */}

            {errorMessage && (
              <div className="relative mt-4 rounded-lg border border-red-300 bg-red-50 p-3">

                <button
                  type="button"
                  onClick={() =>
                    setErrorMessage("")
                  }
                  className="absolute right-3 top-3 text-red-700 hover:text-red-900"
                >
                  <X size={18} />
                </button>

                <p className="pr-6 text-sm font-medium text-red-700">
                  {errorMessage}
                </p>

              </div>
            )}

            {/* =========================
                Login
            ========================= */}

            <p className="mt-4 text-center text-[14px] text-gray-500">

              Already have an account?{" "}

              <Link to="/Login">

                <span className="cursor-pointer font-semibold text-purple-600 transition hover:text-purple-800">
                  Sign In
                </span>

              </Link>

            </p>

          </div>

        </div>

      </div>

      </div>
    </>
  );
};

export default CreateAccount;