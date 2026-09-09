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
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import bgImage from "../assets/BGimage.png";
import Footer from "../components/Home/Footer";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  const showToast = (message, type = "error") => {
    setToast({
      show: true,
      type,
      message,
    });

    setTimeout(() => {
      setToast({
        show: false,
        type: "",
        message: "",
      });
    }, 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      showToast("Email address is required", "error");
      return;
    }

    if (!password) {
      showToast("Password is required", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      showToast("Please enter a valid email address", "error");
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
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      console.log("Login Response:", data);

      if (!response.ok) {
        showToast(
          data.message || "Invalid email or password",
          "error"
        );
        return;
      }

      if (!data.token || !data.user) {
        showToast(
          "Invalid login response from server",
          "error"
        );
        return;
      }

      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      window.dispatchEvent(new Event("authChanged"));

      showToast("Login successful!", "success");

      console.log("JWT saved successfully");
      console.log("Logged-in user:", data.user);
      console.log("User role:", data.user.role);

      setTimeout(() => {
        if (data.user.role === "admin") {
          navigate("/admin/dashboard", {
            replace: true,
          });
        } else {
          navigate("/dashboard", {
            replace: true,
          });
        }
      }, 1000);
    } catch (error) {
      console.error("Login error:", error);

      showToast(
        "Unable to connect to server. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href =
      "http://localhost:5000/api/auth/google";
  };

  const handleGithubLogin = () => {
    window.location.href =
      "http://localhost:5000/api/auth/github";
  };

  return (
    <>
      {toast.show && (
        <div
          className={`fixed bottom-5 left-5 z-[9999] w-[calc(100%-40px)] max-w-sm rounded-lg px-5 py-4 text-white shadow-2xl sm:w-96 ${
            toast.type === "success"
              ? "bg-green-600"
              : "bg-red-600"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20">
              {toast.type === "success" ? (
                <CheckCircle size={22} />
              ) : (
                <AlertCircle size={22} />
              )}
            </div>

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

            <button
              type="button"
              onClick={() =>
                setToast({
                  show: false,
                  type: "",
                  message: "",
                })
              }
              className="cursor-pointer text-white/80 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      <div className="relative min-h-screen w-full overflow-x-hidden bg-gray-100 lg:bg-transparent">
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

        <div className="relative z-10 flex min-h-screen items-center justify-center px-4 sm:px-8 lg:justify-between lg:px-14">
          <div className="mt-15 ml-15 hidden w-[35%] self-start text-white lg:block">
            <h1 className="text-5xl font-bold leading-tight xl:text-5xl">
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

          <div className="relative w-full max-w-md rounded-3xl bg-white p-5 shadow-2xl sm:p-6 lg:w-[510px] lg:p-8 [@media(max-height:800px)]:p-12 [@media(max-height:700px)]:p-10">
            <Link
              to="/"
              className="absolute right-5 top-4 flex cursor-pointer items-center gap-2 text-sm hover:text-violet-600"
            >
              <ArrowLeft size={15} />
              Back to Home
            </Link>

            <h1 className="mt-7 flex items-center justify-center gap-2 text-center text-3xl font-bold sm:text-4xl lg:mt-6">
              Welcome Back
              <Sparkles
                size={28}
                className="text-violet-600"
              />
            </h1>

            <p className="mt-2 text-center text-gray-500">
              Sign in to continue
            </p>

            <form onSubmit={handleLogin}>
              <div className="mt-6 lg:mt-8">
                <label className="font-semibold">
                  Email Address
                </label>

                <div className="mt-2 flex h-12 items-center rounded-xl border px-4 sm:h-14">
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
                    className="ml-3 min-w-0 flex-1 outline-none"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="mt-5 lg:mt-6">
                <label className="font-semibold">
                  Password
                </label>

                <div className="mt-2 flex h-12 items-center rounded-xl border px-4 sm:h-14">
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
                    className="ml-3 min-w-0 flex-1 outline-none"
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
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

              <div className="mt-5 flex items-center justify-between text-sm lg:mt-6">
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
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <div className="my-6 flex items-center lg:my-8">
              <div className="h-px flex-1 bg-gray-300" />

              <span className="mx-4 whitespace-nowrap text-sm text-gray-500">
                Continue with
              </span>

              <div className="h-px flex-1 bg-gray-300" />
            </div>

            <div className="mt-2 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border transition hover:bg-gray-50"
              >
                <FcGoogle size={20} />

                <span className="text-sm font-medium">
                  Google
                </span>
              </button>

              <button
                type="button"
                onClick={handleGithubLogin}
                className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border transition hover:bg-gray-50"
              >
                <FaGithub size={20} />

                <span className="text-sm font-medium">
                  GitHub
                </span>
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-gray-500 sm:text-base lg:mt-8 [@media(max-height:800px)]:mt-5 [@media(max-height:700px)]:mt-4">
              Don't have an account?

              <Link
                to="/CreateAccount"
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