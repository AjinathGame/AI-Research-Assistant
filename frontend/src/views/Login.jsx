import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Sparkles,
  CheckCircle,
  AlertCircle,
  X,
} from "lucide-react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

import bgImage from "../assets/BGimage.png";
import Footer from "../components/Home/Footer";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // Toast
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // =====================================================
  // SHOW TOAST
  // =====================================================
  const showToast = (
    message,
    type = "success"
  ) => {
    setToast({
      show: true,
      message,
      type,
    });

    setTimeout(() => {
      setToast({
        show: false,
        message: "",
        type: "success",
      });
    }, 3500);
  };

  // =====================================================
  // LOGIN
  // =====================================================
  const handleLogin = async (e) => {
    e.preventDefault();

    // Clear old toast
    setToast({
      show: false,
      message: "",
      type: "success",
    });

    // ==========================
    // Required fields
    // ==========================
    if (!email.trim()) {
      showToast(
        "Email address is required",
        "error"
      );
      return;
    }

    if (!password) {
      showToast(
        "Password is required",
        "error"
      );
      return;
    }

    // ==========================
    // Email validation
    // ==========================
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      showToast(
        "Please enter a valid email address",
        "error"
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log(
        "Login Response:",
        data
      );

      // ==========================
      // Backend Error
      // ==========================
      if (!response.ok) {
        showToast(
          data.message ||
            "Invalid email or password",
          "error"
        );

        return;
      }

      // ==========================
      // Save JWT
      // ==========================
      localStorage.setItem(
        "token",
        data.token
      );

      // ==========================
      // Save User
      // ==========================
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // ==========================
      // Notify Navbar
      // ==========================
      window.dispatchEvent(
        new Event("authChanged")
      );

      // ==========================
      // Success Toast
      // ==========================
      showToast(
        "Login successful!",
        "success"
      );

      console.log(
        "JWT saved successfully"
      );

      console.log(
        "User:",
        data.user
      );

      // ==========================
      // Redirect
      // ==========================
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      showToast(
        "Unable to connect to server. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // GOOGLE
  // =====================================================
  const handleGoogleLogin = () => {
    window.location.href =
      "http://localhost:5000/api/auth/google";
  };

  // =====================================================
  // GITHUB
  // =====================================================
  const handleGithubLogin = () => {
    window.location.href =
      "http://localhost:5000/api/auth/github";
  };

  return (
    <>
      {/* =====================================================
          TOAST
      ====================================================== */}
      {toast.show && (
        <div
          className={`
            fixed
            bottom-5
            left-5
            z-[9999]
            w-[calc(100%-40px)]
            max-w-sm
            rounded-xl
            px-5
            py-4
            text-white
            shadow-2xl
            sm:w-96
            ${
              toast.type === "success"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600"
                : "bg-gradient-to-r from-red-500 to-red-600"
            }
          `}
        >

          <div className="flex items-start gap-3">

            {/* ICON */}
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-white/20
              "
            >

              {toast.type === "success" ? (
                <CheckCircle size={22} />
              ) : (
                <AlertCircle size={22} />
              )}

            </div>

            {/* MESSAGE */}
            <div className="flex-1">

              <p className="font-semibold">
                {toast.type === "success"
                  ? "Success"
                  : "Error"}
              </p>

              <p className="mt-1 text-sm leading-5 text-white/90">
                {toast.message}
              </p>

            </div>

            {/* CLOSE */}
            <button
              type="button"
              onClick={() =>
                setToast({
                  show: false,
                  message: "",
                  type: "success",
                })
              }
              className="
                shrink-0
                cursor-pointer
                text-white/80
                transition
                hover:text-white
              "
            >
              <X size={18} />
            </button>

          </div>
        </div>
      )}

      {/* =====================================================
          MAIN
      ====================================================== */}
      <div
        className="
          relative
          min-h-screen
          w-full
          overflow-x-hidden
          bg-gray-100
          lg:bg-transparent
        "
      >

        {/* Background */}
        <div
          className="
            absolute
            inset-0
            m-auto
            hidden
            h-[96%]
            w-[96%]
            rounded-2xl
            bg-cover
            bg-center
            lg:block
          "
          style={{
            backgroundImage: `url(${bgImage})`,
          }}
        />

        <div className="absolute inset-0 hidden bg-black/10 lg:block" />

        {/* Main Container */}
        <div
          className="
            relative
            z-10
            flex
            min-h-screen
            items-center
            justify-center
            px-4
            sm:px-8
            lg:justify-between
            lg:px-14
          "
        >

          {/* Left Content */}
          <div
            className="
              mt-15
              ml-15
              hidden
              w-[35%]
              self-start
              text-white
              lg:block
            "
          >

            <h1 className="text-5xl font-bold leading-tight">
              Welcome Back to
            </h1>

            <h1 className="mt-1 text-5xl font-bold text-violet-300">
              AI Research Assistant
            </h1>

            <p className="mt-2 max-w-md text-base leading-7 text-gray-400">
              Access your research library, upload notes,
              and continue asking AI-powered questions with
              accurate source references.
            </p>

          </div>

          {/* ==========================
              Login Card
          ========================== */}

          <div className="relative w-full max-w-md rounded-3xl bg-white p-5 shadow-2xl sm:p-6 lg:w-[510px] lg:p-8">

            {/* Back Home */}

            <Link
              to="/"
              className="absolute right-5 top-4 flex cursor-pointer items-center gap-2 text-sm"
            >
              <ArrowLeft size={15} />
              Back to Home
            </Link>

            {/* Heading */}
            <h1
              className="
                mt-7
                flex
                items-center
                justify-center
                gap-2
                text-center
                text-3xl
                font-bold
                sm:text-4xl
                lg:mt-6
              "
            >
              Welcome Back

              <Sparkles
                size={28}
                className="text-violet-600"
              />
            </h1>

            <p className="mt-2 text-center text-gray-500">
              Sign in to continue
            </p>

            {/* Form */}
            <form onSubmit={handleLogin}>

              {/* Email */}
              <div className="mt-6 lg:mt-8">

                <label className="font-semibold">
                  Email Address
                </label>

                <div
                  className="
                    mt-2
                    flex
                    h-12
                    items-center
                    rounded-xl
                    border
                    px-4
                    sm:h-14
                  "
                >

                  <Mail
                    className="text-gray-500"
                    size={20}
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="Enter your email"
                    className="
                      ml-3
                      min-w-0
                      flex-1
                      outline-none
                    "
                    autoComplete="email"
                  />

                </div>
              </div>

              {/* Password */}
              <div className="mt-5 lg:mt-6">

                <label className="font-semibold">
                  Password
                </label>

                <div
                  className="
                    mt-2
                    flex
                    h-12
                    items-center
                    rounded-xl
                    border
                    px-4
                    sm:h-14
                  "
                >

                  <Lock
                    className="text-gray-500"
                    size={20}
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
                    placeholder="Enter your password"
                    className="
                      ml-3
                      min-w-0
                      flex-1
                      outline-none
                    "
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff
                        className="text-gray-500"
                        size={20}
                      />
                    ) : (
                      <Eye
                        className="text-gray-500"
                        size={20}
                      />
                    )}
                  </button>

                </div>
              </div>

              {/* Remember + Forgot */}
              <div
                className="
                  mt-5
                  flex
                  items-center
                  justify-between
                  text-sm
                  lg:mt-6
                "
              >

                <label className="flex items-center gap-2">

                  <input
                    type="checkbox"
                    defaultChecked
                    className="cursor-pointer"
                  />

                  Remember me

                </label>

                <Link
                  to="/forgot-password"
                  className="text-violet-600 hover:underline"
                >
                  Forgot Password?
                </Link>

              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="
                  mt-6
                  h-12
                  w-full
                  cursor-pointer
                  rounded-xl
                  bg-gradient-to-r
                  from-indigo-600
                  to-violet-600
                  text-lg
                  font-semibold
                  text-white
                  transition
                  hover:opacity-95
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  sm:h-14
                  lg:mt-8
                "
              >

                {loading
                  ? "Signing In..."
                  : "Sign In"}

              </button>

            </form>

            {/* Divider */}
            <div
              className="
                my-6
                flex
                items-center
                lg:my-8
              "
            >

              <div className="h-px flex-1 bg-gray-300" />

              <span className="mx-4 whitespace-nowrap text-sm text-gray-500">
                Continue with
              </span>

              <div className="h-px flex-1 bg-gray-300" />

            </div>

            {/* Social Login */}
            <div className="mt-2 grid grid-cols-2 gap-3">

              {/* Google */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="
                  flex
                  h-12
                  cursor-pointer
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  transition
                  hover:bg-gray-50
                "
              >

                <FcGoogle size={20} />

                <span className="text-sm font-medium">
                  Google
                </span>

              </button>

              {/* GitHub */}
              <button
                type="button"
                onClick={handleGithubLogin}
                className="
                  flex
                  h-12
                  cursor-pointer
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  transition
                  hover:bg-gray-50
                "
              >

                <FaGithub size={20} />

                <span className="text-sm font-medium">
                  GitHub
                </span>

              </button>

            </div>

            {/* ==========================
                Create Account
            ========================== */}

            <p className="mt-6 text-center text-sm text-gray-500 sm:text-base lg:mt-8">

              Don't have an account?

              <Link
                to="/Create-account"
                className="ml-2 cursor-pointer font-semibold text-violet-600 hover:underline"
              >
                Create Account
              </Link>
            </p>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}