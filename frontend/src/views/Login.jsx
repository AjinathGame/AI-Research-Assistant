import React, { useState } from "react";
import HeroImg from "../assets/HeroImg.png"
import {
  Layers,
  FileText,
  Bot,
  Search,
  Zap,
  ShieldCheck,
  Quote,
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

const features = [
  { icon: FileText, title: "Upload Multiple PDF Documents", desc: "Add and manage your study materials easily" },
  { icon: Bot, title: "AI-Powered Question Answering", desc: "Get accurate answers from your documents" },
  { icon: Search, title: "Semantic Search", desc: "Find relevant information in seconds" },
  { icon: Zap, title: "Fast & Accurate Responses", desc: "AI delivers reliable answers instantly" },
  { icon: ShieldCheck, title: "Secure & Private Workspace", desc: "Your data is safe and encrypted" },
];

const GoogleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.1 18.9 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.6 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.2-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2c-.4.4 6.6-4.8 6.6-14.8 0-1.3-.1-2.4-.4-3.5z" />
  </svg>
);

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign in", { email, password });
  };

  return (
    <div style={{ height: "100vh", width: "100%" }} className="flex flex-col lg:flex-row overflow-hidden bg-gray-100">
  
      <div className="hidden lg:flex lg:w-1/2 h-full p-3">
        <div
          className="relative w-full h-full rounded-2xl overflow-hidden text-white"
          style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 60%, #7c3aed 100%)" }}
        >
          <div className="relative z-10 h-full flex flex-col p-6">
           
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center">
                <Layers style={{ width: 18, height: 18 }} className="text-indigo-600" />
              </div>
              <div>
                <h2 style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.2 }}>Scholar RAG</h2>
                <p style={{ fontSize: 11, lineHeight: 1.2 }} className="text-indigo-200">
                  Retrieval Augmented Generation
                </p>
              </div>
            </div>

            {/* Heading + Image row */}
            <div className="mt-5 flex gap-3 items-start">
              <div style={{ flex: "1 1 60%" }}>
                <h1 style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.15 }}>
                  Transform Your
                  <br />
                  Research Into
                  <br />
                  <span style={{ color: "#a78bfa" }}>Instant</span> Answers
                </h1>
                <p style={{ fontSize: 12, lineHeight: 1.5, marginTop: 10 }} className="text-indigo-100 opacity-90">
                  Upload your PDFs, organize your notes, and ask questions in natural language. Scholar RAG uses AI-powered Retrieval Augmented Generation to help you learn faster and research smarter.
                </p>
              </div>
              <div style={{ flex: "0 0 35%" }} className="flex justify-center">
                <img src= {HeroImg}
                  style={{ width: "100%", maxWidth: 160, height: 160, objectFit: "cover", borderRadius: 12, opacity: 0.85 }}
                />
              </div>
            </div>

            <div className="mt-3 flex-1 flex flex-col justify-center gap-1.5">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ width: 34, height: 34, background: "rgba(255,255,255,0.1)" }}
                    >
                      <Icon style={{ width: 16, height: 16 }} className="text-white" />
                    </div>
                    <div>
                      <h3 style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.2 }}>{f.title}</h3>
                      <p style={{ fontSize: 9, lineHeight: 1.3, marginTop: 2 }} className="text-indigo-200">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            
            <div
              className="rounded-xl flex items-center gap-2 mt-4"
              style={{ background: "rgba(255,255,255,0.08)", padding: "10px 14px" }}
            >
              <Quote style={{ width: 14, height: 14 }} className="text-indigo-300 flex-shrink-0" />
              <p style={{ fontSize: 12, fontStyle: "italic"}} className="text-indigo-100">
                Smarter Research. Faster Learning. Better Results.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 h-full overflow-y-auto bg-white">
        <div className="flex justify-end px-6 pt-5">
          <button
            type="button"
            className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900"
            style={{ fontSize: 13 }}
          >
            <ArrowLeft style={{ width: 14, height: 14 }} />
            Back to Home
          </button>
        </div>

        <div className="flex items-center justify-center px-6" style={{ minHeight: "calc(100vh - 60px)" }}>
          <div className="w-full" style={{ maxWidth: 400 }}>
            <div className="flex justify-center mb-3">
              <span
                className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 text-indigo-600 font-semibold"
                style={{ fontSize: 10, padding: "5px 12px", letterSpacing: 1 }}
              >
                <span style={{ width: 5, height: 5 }} className="rounded-full bg-indigo-600" />
                WELCOME BACK
              </span>
            </div>

            <h1
              className="text-center font-bold text-gray-900"
              style={{ fontSize: 24, lineHeight: 1.2 }}
            >
              Sign in to your account
            </h1>
            <p
              className="text-center text-gray-500 mt-2"
              style={{ fontSize: 13, lineHeight: 1.5 }}
            >
              Access your research library and continue getting accurate answers.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
              <div>
                <label className="block font-semibold text-gray-800" style={{ fontSize: 12, marginBottom: 6 }}>
                  Email address
                </label>
                <div className="relative">
                  <Mail style={{ width: 14, height: 14, position: "absolute", left: 12, top: 12 }} className="text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                    style={{ fontSize: 13, padding: "10px 12px 10px 34px" }}
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-800" style={{ fontSize: 12, marginBottom: 6 }}>
                  Password
                </label>
                <div className="relative">
                  <Lock style={{ width: 14, height: 14, position: "absolute", left: 12, top: 12 }} className="text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                    style={{ fontSize: 13, padding: "10px 38px 10px 34px" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: "absolute", right: 12, top: 12 }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff style={{ width: 14, height: 14 }} />
                    ) : (
                      <Eye style={{ width: 14, height: 14 }} />
                    )}
                  </button>
                </div>
                <div className="flex justify-end mt-1.5">
                  <button
                    type="button"
                    className="font-semibold text-indigo-600 hover:text-indigo-700"
                    style={{ fontSize: 12 }}
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                style={{ fontSize: 14, padding: "11px 0" }}
              >
                Sign in
              </button>

              <div className="relative flex items-center justify-center py-0.5">
                <div className="absolute inset-x-0 top-1/2 h-px bg-gray-200" />
                <span className="relative bg-white px-2 text-gray-500" style={{ fontSize: 12 }}>
                  or continue with
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-800 font-medium"
                  style={{ fontSize: 13, padding: "10px 0" }}
                >
                  <GoogleIcon />
                  Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-800 font-medium"
                  style={{ fontSize: 13, padding: "10px 0" }}
                >
                 
                  GitHub
                </button>
              </div>

              <p className="text-center text-gray-600 pt-1" style={{ fontSize: 13 }}>
                Don't have an account?{" "}
                <button
                  type="button"
                  className="text-indigo-600 font-semibold hover:text-indigo-700"
                >
                  Create Account
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
