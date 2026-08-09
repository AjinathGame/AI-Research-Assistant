import { Mail, Lock, Eye, ArrowLeft, Sparkles } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import bgImage from "../assets/BGimage.png";
import { Link } from "react-router-dom";
import { useState } from "react";

import Footer from "../components/Home/Footer";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      
      <div className="relative min-h-screen w-full overflow-x-hidden bg-gray-100 lg:bg-transparent">

    
        <div
          className="
            hidden
            lg:block
            absolute
            inset-0
            w-[96%]
            h-[96%]
            m-auto
            rounded-2xl
            bg-cover
            bg-center
          "
          style={{ backgroundImage: `url(${bgImage})` }}
        />

        
        <div className="hidden lg:block absolute inset-0 bg-black/10" />

        
        <div
          className="
            relative
            z-10
            min-h-screen

            flex
            items-center
            justify-center

            lg:justify-between

            px-4
            sm:px-8
            lg:px-14

            [@media(max-height:800px)]:py-3
            [@media(max-height:700px)]:py-2
          "
        >

         
          <div
            className="
              hidden
              lg:block

              w-[35%]

              text-white
              self-start

              mt-15
              ml-15

              [@media(max-height:800px)]:mt-10
              [@media(max-height:700px)]:mt-7
            "
          >

            <h1
              className="
                text-5xl
                xl:text-5xl
                font-bold
                leading-tight

                [@media(max-height:800px)]:text-4xl
              "
            >
              Welcome Back to
            </h1>

            <h1
              className="
                text-5xl
                xl:text-5xl
                font-bold
                text-violet-300
                mt-1

                [@media(max-height:800px)]:text-4xl
              "
            >
              AI Research Assistant
            </h1>

            <p
              className="
                mt-2
                text-base
                text-gray-400
                max-w-md
                leading-7

                [@media(max-height:800px)]:text-sm
                [@media(max-height:800px)]:leading-6
              "
            >
              Access your research library, upload notes, and continue asking
              AI-powered questions with accurate source references.
            </p>

          </div>

          
          <div
            className="
              relative

              w-full
              max-w-md

              lg:w-[510px]

              bg-white
              rounded-3xl
              shadow-2xl

              p-5
              sm:p-6
              lg:p-8

              [@media(max-height:800px)]:p-12
              [@media(max-height:700px)]:p-10
            "
          >

          
            <Link
              to="/"
              className="
                absolute
                top-4
                right-5

                flex
                items-center
                gap-2

                text-sm
                cursor-pointer
              "
            >
              <ArrowLeft size={15} />
              Back to Home
            </Link>

            
            <h1
              className="
                text-3xl
                sm:text-4xl

                font-bold
                text-center

                mt-7
                lg:mt-6

                flex
                justify-center
                items-center
                gap-2

                [@media(max-height:800px)]:text-3xl
                [@media(max-height:800px)]:mt-6
              "
            >
              Welcome Back

              <Sparkles
                size={28}
                className="text-violet-600"
              />
            </h1>

            <p
              className="
                text-center
                text-gray-500
                mt-2

                [@media(max-height:700px)]:mt-1
              "
            >
              Sign in to continue
            </p>

            
            <div
              className="
                mt-6
                lg:mt-8

                [@media(max-height:800px)]:mt-5
                [@media(max-height:700px)]:mt-4
              "
            >
              <label className="font-semibold">
                Email Address
              </label>

              <div
                className="
                  flex
                  items-center
                  border
                  rounded-xl

                  h-12
                  sm:h-14

                  px-4
                  mt-2

                  [@media(max-height:800px)]:h-12
                "
              >
                <Mail
                  className="text-gray-500"
                  size={20}
                />

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="
                    ml-3
                    flex-1
                    outline-none
                    min-w-0
                  "
                />
              </div>
            </div>

            {/* =================================================
                PASSWORD
            ================================================= */}
            <div
              className="
                mt-5
                lg:mt-6

                [@media(max-height:800px)]:mt-4
                [@media(max-height:700px)]:mt-3
              "
            >
              <label className="font-semibold">
                Password
              </label>

              <div
                className="
                  flex
                  items-center
                  border
                  rounded-xl

                  h-12
                  sm:h-14

                  px-4
                  mt-2

                  [@media(max-height:800px)]:h-12
                "
              >
                <Lock
                  className="text-gray-500"
                  size={20}
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="
                    ml-3
                    flex-1
                    outline-none
                    min-w-0
                  "
                />

                <Eye
                  className="
                    text-gray-500
                    cursor-pointer
                    shrink-0
                  "
                  size={20}
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                />
              </div>
            </div>

            <div
              className="
                flex
                justify-between
                items-center

                mt-5
                lg:mt-6

                text-sm

                [@media(max-height:800px)]:mt-4
                [@media(max-height:700px)]:mt-3
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

              <a
                href="#"
                className="
                  text-violet-600
                  hover:underline
                "
              >
                Forgot Password?
              </a>
            </div>

            <button
              className="
                w-full

                h-12
                sm:h-14

                rounded-xl

                mt-6
                lg:mt-8

                bg-gradient-to-r
                from-indigo-600
                to-violet-600

                text-white
                text-lg
                font-semibold

                hover:opacity-95
                transition
                cursor-pointer

                [@media(max-height:800px)]:h-12
                [@media(max-height:800px)]:mt-5
                [@media(max-height:700px)]:mt-4
              "
            >
              Sign In
            </button>

            
            <div
              className="
                flex
                items-center

                my-6
                lg:my-8

                [@media(max-height:800px)]:my-5
                [@media(max-height:700px)]:my-4
              "
            >
              <div className="flex-1 h-px bg-gray-300" />

              <span
                className="
                  mx-4
                  text-gray-500
                  text-sm
                  whitespace-nowrap
                "
              >
                Continue with
              </span>

              <div className="flex-1 h-px bg-gray-300" />
            </div>

           
            <div
              className="
                grid
                grid-cols-2
                gap-3
                mt-2
              "
            >

              <button
                type="button"
                className="
                  h-12

                  border
                  rounded-xl

                  flex
                  justify-center
                  items-center
                  gap-2

                  hover:bg-gray-50
                  transition
                  cursor-pointer

                  [@media(max-height:800px)]:h-11
                "
              >
                <FcGoogle size={20} />

                <span className="text-sm font-medium">
                  Google
                </span>
              </button>

              
              <button
                type="button"
                className="
                  h-12

                  border
                  rounded-xl

                  flex
                  justify-center
                  items-center
                  gap-2

                  hover:bg-gray-50
                  transition
                  cursor-pointer

                  [@media(max-height:800px)]:h-11
                "
              >
                <FaGithub size={20} />

                <span className="text-sm font-medium">
                  GitHub
                </span>
              </button>

            </div>

            
            <p
              className="
                text-center

                mt-6
                lg:mt-8

                text-gray-500
                text-sm
                sm:text-base

                [@media(max-height:800px)]:mt-5
                [@media(max-height:700px)]:mt-4
              "
            >
              Don't have an account?

              <span
                className="
                  text-violet-600
                  font-semibold
                  ml-2

                  cursor-pointer
                  hover:underline
                "
              >
                Create Account
              </span>
            </p>

          </div>

        </div>

      </div>

      
      <Footer />
    </>
  );
}
