import { Mail, Lock, Eye, ArrowLeft, Sparkles,User } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import registerImage from "../assets/BGimage.png";
// import {Link} from "react-router-dom"
import { useState } from "react"
export default function CreateAccount() {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gray-100 lg:bg-transparent">

      {/* Desktop Background */}
      <div
        className="hidden h-[96%] w-[96%] m-auto rounded-2xl lg:block absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${registerImage})` }}
      />

      {/* Overlay */}
      <div className="hidden lg:block absolute inset-0 bg-black/10"></div>

      {/* Main Content */}
      <div
        className="
          relative z-10
          min-h-screen
          flex
          items-center
          justify-center
          lg:justify-between
          px-4
          sm:px-8
          lg:px-14
        "
      >

        {/* LEFT SIDE (Desktop Only) */}
        <div
          className="
           hidden
          
           mt-0
            lg:block
            w-[30%]
            text-white
            self-start
             mt-20
             ml-15
          "
        >
          <h1 className="text-5xl mt-1 xl:text-5xl font-bold leading-tight">
            Welcome Back to
          </h1>

          <h1 className="text-5xl mt-1 xl:text-5xl font-bold text-violet-300 mt-1">
            Scholar RAG
          </h1>

          <p className="mt-2 text-base text-gray-400 max-w-md leading-7 ">
            Access your research library, upload notes, and continue asking
            AI-powered questions with accurate source references.
          </p>
        </div>

 
        {/* =====================================================
            CREATE ACCOUNT CARD
        ===================================================== */}

        <div
          className="
            relative
            w-full
            h-[93vh]
            max-w-md
            lg:w-[490px]
            
            bg-white
            rounded-3xl
            shadow-2xl
            p-6
            sm:p-8
            lg:p-9
          "
        >


          {/* =================================================
              BACK TO HOME
          ================================================= */}

          <span
            
            className="
              absolute
              top-4
              right-5
              flex
              items-center
              gap-2
              text-sm
              text-gray-600
              hover:text-violet-600
              transition
            "
          >
            <ArrowLeft size={15} />

            Back to Home
          </span>


          {/* =================================================
              HEADING
          ================================================= */}

          <h1
            className="
              text-3xl
              sm:text-4xl
              font-bold
              text-center
              mt-8
              lg:mt-6
              flex
              justify-center
              items-center
              gap-2
              text-indigo-950
            "
          >
            Create Account

            <Sparkles
              size={28}
              className="text-violet-600"
            />
          </h1>


          <p className="text-center text-gray-500 mt-2">
            Let's get started
          </p>


          {/* =================================================
              FORM
          ================================================= */}

          <form className="mt-2 space-y-5">


            {/* =================================================
                FULL NAME
            ================================================= */}

            <div>

              <label className="block font-semibold text-indigo-950">
                Full Name
              </label>

              <div
                className="
                  flex
                  items-center
                  border
                  border-gray-200
                  rounded-xl
                  h-12
                  sm:h-12
                  px-4
                  mt-2
                  focus-within:border-violet-500
                  focus-within:ring-2
                  focus-within:ring-violet-100
                "
              >

                <User
                  className="text-gray-500"
                  size={18}
                />

                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="
                    ml-3
                    flex-1
                    outline-none
                    text-gray-800
                  "
                />

              </div>

            </div>


            {/* =================================================
                EMAIL
            ================================================= */}

            <div>

              <label className="block font-semibold text-indigo-950">
                Email Address
              </label>

              <div
                className="
                  flex
                  items-center
                  border
                  border-gray-200
                  rounded-xl
                  h-12
                  sm:h-12
                  px-4
                  mt-1
                  focus-within:border-violet-500
                  focus-within:ring-2
                  focus-within:ring-violet-100
                "
              >

                <Mail
                  className="text-gray-500"
                  size={18}
                />

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="
                    ml-3
                    flex-1
                    outline-none
                    text-gray-800
                  "
                />

              </div>

            </div>


            {/* =================================================
                PASSWORD
            ================================================= */}

            <div>

              <label className="block font-semibold text-indigo-950">
                Password
              </label>

              <div
                className="
                  flex
                  items-center
                  border
                  border-gray-200
                  rounded-xl
                  h-12
                  sm:h-12
                  px-4
                  mt-1
                  focus-within:border-violet-500
                  focus-within:ring-2
                  focus-within:ring-violet-100
                "
              >

                <Lock
                  className="text-gray-500"
                  size={18}
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Create a password"
                  className="
                    ml-3
                    flex-1
                    outline-none
                    text-gray-800
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="
                    text-gray-500
                    hover:text-violet-600
                    cursor-pointer
                  "
                >
                  <Eye size={18} />
                </button>

              </div>

            </div>


            {/* =================================================
                CONFIRM PASSWORD
            ================================================= */}

            <div>

              <label className="block font-semibold text-indigo-950">
                Confirm Password
              </label>

              <div
                className="
                  flex
                  items-center
                  border
                  border-gray-200
                  rounded-xl
                  h-12
                  sm:h-12
                  px-4
                  mt-1
                  focus-within:border-violet-500
                  focus-within:ring-2
                  focus-within:ring-violet-100
                "
              >

                <Lock
                  className="text-gray-500"
                  size={18}
                />

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm your password"
                  className="
                    ml-3
                    flex-1
                    outline-none
                    text-gray-800
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="
                    text-gray-500
                    hover:text-violet-600
                    cursor-pointer
                  "
                >
                  <Eye size={18} />
                </button>

              </div>

            </div>


            {/* =================================================
                TERMS
            ================================================= */}

            <div className="flex items-center gap-2">

              <input
                type="checkbox"
                className="
                  w-4
                  h-4
                  accent-violet-600
                  cursor-pointer
                "
              />

              <p className="text-sm text-gray-600">

                I agree to{" "}

                <span
                  className="
                    text-violet-600
                    font-semibold
                    cursor-pointer
                    hover:underline
                  "
                >
                  Terms & Privacy Policy
                </span>

              </p>

            </div>


            {/* =================================================
                CREATE ACCOUNT BUTTON
            ================================================= */}

            <button
              type="submit"
              className="
                w-full
                h-12
                sm:h-14
                rounded-xl
                bg-gradient-to-r
                from-indigo-600
                to-violet-600
                text-white
                text-lg
                font-semibold
                hover:opacity-95
                transition
                cursor-pointer
                shadow-md
              "
            >
              Create Account
            </button>

          </form>


          {/* =================================================
              DIVIDER
          ================================================= */}

          <div className="flex items-center my-3">

            <div className="flex-1 h-px bg-gray-300"></div>

            <span className="mx-4 text-gray-500 text-sm">
              Continue with
            </span>

            <div className="flex-1 h-px bg-gray-300"></div>

          </div>


          {/* =================================================
              SOCIAL BUTTONS
          ================================================= */}

          <div className="grid grid-cols-2 gap-3">

            {/* GOOGLE */}

            <button
              type="button"
              className="
                h-12
                border
                border-gray-200
                rounded-xl
                flex
                justify-center
                items-center
                gap-2
                hover:bg-gray-50
                transition
                cursor-pointer
              "
            >

              <FcGoogle size={20} />

              <span className="text-sm font-medium">
                Google
              </span>

            </button>


            {/* GITHUB */}

            <button
              type="button"
              className="
                h-12
                border
                border-gray-200
                rounded-xl
                flex
                justify-center
                items-center
                gap-2
                hover:bg-gray-50
                transition
                cursor-pointer
              "
            >

              <FaGithub size={20} />

              <span className="text-sm font-medium">
                GitHub
              </span>

            </button>

          </div>


          {/* =================================================
              SIGN IN
          ================================================= */}

          <p
            className="
              text-center
              mt-3
              text-gray-500
              text-sm
              sm:text-base
            "
          >
            Already have an account?
            <span    
              className="
                text-violet-600
                font-semibold
                ml-2
                cursor-pointer
                hover:underline
              "
            >
              Sign In
            </span>

          </p>

        </div>
        {/* END CREATE ACCOUNT CARD */}
      </div> 
    </div>
  );
}