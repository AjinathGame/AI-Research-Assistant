import React, { useEffect, useState } from "react";
import { Home,LayoutDashboard,MessageSquare,Upload,Info,LogIn,UserPlus,Menu,X,LogOut,CheckCircle,AlertCircle,} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/main_logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);


  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const navigate = useNavigate();

  // =====================================================
  // TOAST
  // =====================================================

  const showToast = (message, type = "success") => {
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
    }, 3000);
  };

  // =====================================================
  // LOAD USER
  // =====================================================

  useEffect(() => {
    const getUser = () => {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setUser(null);
        return;
      }

      try {
        const parsedUser = JSON.parse(storedUser);

        const updatedUser = {
          id: parsedUser.id || parsedUser._id || "",
          name:
            typeof parsedUser.name === "string"
              ? parsedUser.name.trim()
              : "",
          email:
            typeof parsedUser.email === "string"
              ? parsedUser.email.trim()
              : "",
        };

        setUser(updatedUser);
      } catch (error) {
        console.error("Invalid user data:", error);

        localStorage.removeItem("user");
        setUser(null);
      }
    };

    getUser();

    window.addEventListener("storage", getUser);
    window.addEventListener("authChanged", getUser);

    return () => {
      window.removeEventListener("storage", getUser);
      window.removeEventListener("authChanged", getUser);
    };
  }, []);

  // =====================================================
  // AUTH TOAST MESSAGE
  // =====================================================

  useEffect(() => {
    const checkAuthToast = () => {
      const authToast = localStorage.getItem("authToast");

      if (authToast) {
        showToast(authToast, "success");
        localStorage.removeItem("authToast");
      }
    };

    checkAuthToast();

    window.addEventListener("authChanged", checkAuthToast);

    return () => {
      window.removeEventListener("authChanged", checkAuthToast);
    };
  }, []);

  // =====================================================
  // CLOSE PROFILE WHEN CLICKING OUTSIDE
  // =====================================================

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!profileOpen) return;

      const clickedInsideProfile =
        event.target.closest("[data-profile-area]");

      if (!clickedInsideProfile) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [profileOpen]);

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setProfileOpen(false);
    setOpen(false);

    window.dispatchEvent(new Event("authChanged"));

    showToast("Logout successful", "success");

    setTimeout(() => {
      navigate("/Login", { replace: true });
    }, 1000);
  };

  // =====================================================
  // USER NAME
  // =====================================================

  const getName = () => {
    if (user?.name && user.name.trim()) {
      return user.name.trim();
    }

    return "User";
  };

  // =====================================================
  // INITIAL
  // =====================================================

  const getInitial = () => {
    const name = getName();

    if (!name || name === "User") {
      return "D";
    }

    return name.charAt(0).toUpperCase();
  };

  // =====================================================
  // FIRST NAME
  // =====================================================

  const getFirstName = () => {
    const name = getName();

    if (!name || name === "User") {
      return "USER";
    }

    return name.split(/\s+/)[0].toUpperCase();
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      {/* ================================================= */}
      {/* NAVBAR */}
      {/* ================================================= */}

      <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-8xl mx-auto h-[80px] flex items-center justify-between px-5 lg:px-10">

          {/* ================================================= */}
          {/* LOGO */}
          {/* ================================================= */}

          <div className="flex items-center gap-4 cursor-pointer">

            <div className="w-16 h-12 rounded-xl flex items-center justify-center">
              <img
                src={Logo}
                alt="AI Search Assistant"
                className="w-full"
              />
            </div>

            <div>
              <Link to="/">
                <h2 className="text-[22px] font-bold text-gray-900">
                  AI Search Assistant
                </h2>

                <p className="text-sm font-serif text-black">
                  Ask. Learn. Discover.
                </p>
              </Link>
            </div>

          </div>

          {/* ================================================= */}
          {/* DESKTOP MENU */}
          {/* ================================================= */}

          <div className="hidden lg:flex items-center gap-10">

            <Link
              to="/"
              className="flex items-center gap-2 font-semibold hover:text-indigo-600 transition"
            >
              <Home size={18} />
              Home
            </Link>

            <Link
              to="/Dashboard"
              className="flex items-center gap-2 font-semibold hover:text-indigo-600 transition"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>

            <Link
              to="/Ask"
              className="flex items-center gap-2 font-semibold hover:text-indigo-600 transition"
            >
              <MessageSquare size={18} />
              Ask
            </Link>

            <Link
              to="/Uploads"
              className="flex items-center gap-2 font-semibold hover:text-indigo-600 transition"
            >
              <Upload size={18} />
              Upload
            </Link>

            <Link
              to="/About"
              className="flex items-center gap-2 font-semibold hover:text-indigo-600 transition"
            >
              <Info size={18} />
              About US
            </Link>

          </div>

          {/* ================================================= */}
          {/* AUTH SECTION */}
          {/* ================================================= */}

          <div className="hidden lg:flex items-center gap-4">

            {!user ? (
              <>
                {/* SIGN IN */}

                <Link to="/Login">
                  <button
                    className="
                    px-4 py-2
                    flex items-center gap-2
                    rounded-md
                    border border-gray-300
                    shadow
                    bg-white
                    font-bold
                    hover:bg-gradient-to-r
                    hover:from-blue-600
                    hover:to-indigo-600
                    hover:text-white
                    transition
                    cursor-pointer
                    "
                  >
                    <LogIn size={17} />
                    Sign In
                  </button>
                </Link>

                {/* CREATE ACCOUNT */}

                <Link to="/CreateAccount">
                  <button
                    className="
                    px-4 py-2
                    flex items-center gap-2
                    rounded-md
                    bg-gradient-to-r
                    from-blue-600
                    to-indigo-600
                    text-white
                    font-semibold
                    hover:opacity-90
                    transition
                    cursor-pointer
                    "
                  >
                    <UserPlus size={18} />
                    Create Account
                  </button>
                </Link>
              </>
            ) : (

              /* ================================================= */
              /* LOGGED IN USER */
              /* ================================================= */

              <div
                className="relative flex items-center gap-3"
                data-profile-area
              >

                {/* USER NAME */}

                <span className="text-gray-800 font-semibold text-lg whitespace-nowrap">
                  {getName()}
                </span>

                {/* PROFILE BUTTON */}

                <button
                  onClick={() =>
                    setProfileOpen(!profileOpen)
                  }
                  className="
                  w-12 h-12
                  rounded-full
                  bg-gradient-to-br
                  from-blue-600
                  to-purple-600
                  text-white
                  text-xl
                  font-bold
                  flex
                  items-center
                  justify-center
                  hover:scale-105
                  transition-all
                  duration-200
                  cursor-pointer
                  shadow-md
                  "
                >
                  {getInitial()}
                </button>

                {/* ================================================= */}
                {/* UNIQUE DESKTOP PROFILE POPUP */}
                {/* ================================================= */}

                {profileOpen && (
                  <div
                    data-profile-area
                    className="
                    absolute
                    right-0
                    top-[64px]
                    w-[360px]
                    overflow-hidden
                    rounded-2xl
                    bg-white
                    border
                    border-gray-200
                    shadow-[0_20px_60px_rgba(0,0,0,0.18)]
                    z-[100]
                    animate-[profilePopup_0.25s_ease-out]
                    "
                  >

                    {/* TOP HEADER */}

                    <div
                      className="
                      relative
                      bg-gradient-to-br
                      from-blue-600
                      via-indigo-600
                      to-purple-700
                      px-6
                      pt-7
                      pb-8
                      "
                    >

                      {/* DECORATION */}

                      <div
                        className="
                        absolute
                        -top-10
                        -right-10
                        w-28
                        h-28
                        rounded-full
                        bg-white/10
                        "
                      />

                      <div
                        className="
                        absolute
                        -bottom-12
                        -left-8
                        w-32
                        h-32
                        rounded-full
                        bg-white/10
                        "
                      />

                      {/* CLOSE BUTTON */}

                      <button
                        onClick={() =>
                          setProfileOpen(false)
                        }
                        className="
                        absolute
                        right-4
                        top-4
                        w-8
                        h-8
                        rounded-full
                        bg-white/10
                        hover:bg-white/20
                        text-white
                        flex
                        items-center
                        justify-center
                        transition
                        cursor-pointer
                        "
                      >
                        <X size={17} />
                      </button>

                      {/* AVATAR */}

                      <div className="relative flex flex-col items-center">

                        <div
                          className="
                          w-[76px]
                          h-[76px]
                          rounded-full
                          bg-white
                          flex
                          items-center
                          justify-center
                          shadow-xl
                          border-4
                          border-white/30
                          "
                        >
                          <span
                            className="
                            text-3xl
                            font-bold
                            bg-gradient-to-r
                            from-blue-600
                            to-purple-600
                            bg-clip-text
                            text-transparent
                            "
                          >
                            {getInitial()}
                          </span>
                        </div>

                        <h2
                          className="
                          mt-3
                          text-xl
                          font-bold
                          text-white
                          "
                        >
                          HEY {getFirstName()} 👋
                        </h2>

                        <p
                          className="
                          text-sm
                          text-blue-100
                          mt-1
                          "
                        >
                          Welcome back!
                        </p>

                      </div>
                    </div>

                    {/* ================================================= */}
                    {/* USER INFORMATION */}
                    {/* ================================================= */}

                    <div className="px-6 py-5">

                      <div className="space-y-3">

                        {/* NAME */}

                        <div
                          className="
                          flex
                          items-center
                          gap-4
                          p-3
                          rounded-xl
                          bg-gray-50
                          border
                          border-gray-100
                          "
                        >

                          <div
                            className="
                            w-10
                            h-10
                            rounded-xl
                            bg-indigo-100
                            text-indigo-600
                            flex
                            items-center
                            justify-center
                            font-bold
                            "
                          >
                            {getInitial()}
                          </div>

                          <div className="min-w-0">

                            <p
                              className="
                              text-xs
                              text-gray-400
                              font-semibold
                              uppercase
                              tracking-wider
                              "
                            >
                              Full Name
                            </p>

                            <p
                              className="
                              text-sm
                              text-gray-800
                              font-bold
                              truncate
                              "
                            >
                              {getName()}
                            </p>

                          </div>

                        </div>

                        {/* EMAIL */}

                        <div
                          className="
                          flex
                          items-center
                          gap-4
                          p-3
                          rounded-xl
                          bg-gray-50
                          border
                          border-gray-100
                          "
                        >

                          <div
                            className="
                            w-10
                            h-10
                            rounded-xl
                            bg-blue-100
                            text-blue-600
                            flex
                            items-center
                            justify-center
                            font-bold
                            "
                          >
                            @
                          </div>

                          <div className="min-w-0">

                            <p
                              className="
                              text-xs
                              text-gray-400
                              font-semibold
                              uppercase
                              tracking-wider
                              "
                            >
                              Email Address
                            </p>

                            <p
                              className="
                              text-sm
                              text-gray-800
                              font-semibold
                              truncate
                              "
                            >
                              {user?.email || "No email"}
                            </p>

                          </div>

                        </div>

                      </div>

                      {/* ================================================= */}
                      {/* ACTION BUTTONS */}
                      {/* ================================================= */}

                      <div
                        className="
                        mt-5
                        pt-4
                        border-t
                        border-gray-100
                        flex
                        gap-3
                        "
                      >
{/* LOGOUT */}

                        <button
                          onClick={handleLogout}
                          className="
                          flex-1
                          py-3
                          rounded-xl
                          bg-gradient-to-r
                          from-blue-600
                          to-indigo-600
                          text-white
                          font-bold
                          flex
                          items-center
                          justify-center
                          gap-2
                          hover:from-blue-700
                          hover:to-indigo-700
                          transition
                          cursor-pointer
                          shadow-md
                          shadow-indigo-200
                          "
                        >
                          <LogOut size={18} />
                          Logout
                        </button>

                      </div>

                    </div>
                  </div>
                )}

              </div>
            )}

          </div>

          {/* ================================================= */}
          {/* MOBILE MENU BUTTON */}
          {/* ================================================= */}

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden cursor-pointer"
          >
            {open ? (
              <X size={30} />
            ) : (
              <Menu size={30} />
            )}
          </button>

        </div>

        {/* ================================================= */}
        {/* MOBILE MENU */}
        {/* ================================================= */}

        {open && (
          <div className="lg:hidden bg-white border-t shadow-md">

            <div className="flex flex-col px-6 py-5 gap-5">

              <Link
                to="/"
                onClick={() => {
                  setOpen(false);
                  setProfileOpen(false);
                }}
                className="flex items-center gap-3 font-semibold"
              >
                <Home size={18} />
                Home
              </Link>

              <Link
                to="/Dashboard"
                onClick={() => {
                  setOpen(false);
                  setProfileOpen(false);
                }}
                className="flex items-center gap-3 font-semibold"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>

              <Link
                to="/Ask"
                onClick={() => {
                  setOpen(false);
                  setProfileOpen(false);
                }}
                className="flex items-center gap-3 font-semibold"
              >
                <MessageSquare size={18} />
                Ask
              </Link>

              <Link
                to="/Uploads"
                onClick={() => {
                  setOpen(false);
                  setProfileOpen(false);
                }}
                className="flex items-center gap-3 font-semibold"
              >
                <Upload size={18} />
                Upload
              </Link>

              <Link
                to="/About"
                onClick={() => {
                  setOpen(false);
                  setProfileOpen(false);
                }}
                className="flex items-center gap-3 font-semibold"
              >
                <Info size={18} />
                About Us
              </Link>

              {/* ================================================= */}
              {/* MOBILE AUTH */}
              {/* ================================================= */}

              {!user ? (
                <>

                  <Link
                    to="/Login"
                    onClick={() => setOpen(false)}
                  >
                    <button
                      className="
                      mt-3
                      w-full
                      px-4
                      py-3
                      rounded-lg
                      border
                      border-gray-300
                      font-bold
                      flex
                      items-center
                      justify-center
                      gap-2
                      "
                    >
                      <LogIn size={18} />
                      Sign In
                    </button>
                  </Link>

                  <Link
                    to="/CreateAccount"
                    onClick={() => setOpen(false)}
                  >
                    <button
                      className="
                      w-full
                      px-4
                      py-3
                      rounded-lg
                      bg-gradient-to-r
                      from-blue-600
                      to-indigo-600
                      text-white
                      font-bold
                      flex
                      items-center
                      justify-center
                      gap-2
                      "
                    >
                      <UserPlus size={18} />
                      Create Account
                    </button>
                  </Link>

                </>
              ) : (

                <div className="border-t pt-5">

                  {/* MOBILE USER */}

                  <button
                    data-profile-area
                    onClick={() =>
                      setProfileOpen(!profileOpen)
                    }
                    className="w-full flex items-center gap-4"
                  >

                    <div
                      className="
                      w-12
                      h-12
                      rounded-full
                      bg-gradient-to-br
                      from-blue-600
                      to-purple-600
                      text-white
                      text-xl
                      font-bold
                      flex
                      items-center
                      justify-center
                      shadow-md
                      "
                    >
                      {getInitial()}
                    </div>

                    <div className="text-left">

                      <p className="font-bold text-gray-900">
                        {getName()}
                      </p>

                      <p className="text-sm text-gray-500">
                        {user?.email || "No email"}
                      </p>

                    </div>

                  </button>

                  {/* ================================================= */}
                  {/* UNIQUE MOBILE PROFILE */}
                  {/* ================================================= */}

                  {profileOpen && (
                    <div
                      data-profile-area
                      className="
                      mt-4
                      overflow-hidden
                      rounded-2xl
                      bg-white
                      border
                      border-gray-200
                      shadow-xl
                      animate-[profilePopup_0.25s_ease-out]
                      "
                    >

                      {/* MOBILE HEADER */}

                      <div
                        className="
                        relative
                        bg-gradient-to-br
                        from-blue-600
                        via-indigo-600
                        to-purple-700
                        px-5
                        pt-6
                        pb-7
                        "
                      >

                        <button
                          onClick={() =>
                            setProfileOpen(false)
                          }
                          className="
                          absolute
                          right-3
                          top-3
                          w-8
                          h-8
                          rounded-full
                          bg-white/10
                          hover:bg-white/20
                          text-white
                          flex
                          items-center
                          justify-center
                          transition
                          cursor-pointer
                          "
                        >
                          <X size={17} />
                        </button>

                        <div className="flex flex-col items-center">

                          <div
                            className="
                            w-[68px]
                            h-[68px]
                            rounded-full
                            bg-white
                            flex
                            items-center
                            justify-center
                            shadow-lg
                            border-4
                            border-white/30
                            "
                          >
                            <span
                              className="
                              text-2xl
                              font-bold
                              bg-gradient-to-r
                              from-blue-600
                              to-purple-600
                              bg-clip-text
                              text-transparent
                              "
                            >
                              {getInitial()}
                            </span>
                          </div>

                          <h2 className="mt-3 text-lg font-bold text-white">
                            HEY {getFirstName()} 👋
                          </h2>

                          <p className="text-sm text-blue-100 mt-1">
                            Welcome back!
                          </p>

                        </div>

                      </div>

                      {/* MOBILE USER INFO */}

                      <div className="p-5">

                        <div className="space-y-3">

                          {/* NAME */}

                          <div
                            className="
                            flex
                            items-center
                            gap-3
                            p-3
                            rounded-xl
                            bg-gray-50
                            border
                            border-gray-100
                            "
                          >

                            <div
                              className="
                              w-9
                              h-9
                              rounded-lg
                              bg-indigo-100
                              text-indigo-600
                              flex
                              items-center
                              justify-center
                              font-bold
                              "
                            >
                              {getInitial()}
                            </div>

                            <div className="min-w-0">

                              <p className="text-[11px] text-gray-400 font-bold uppercase">
                                Full Name
                              </p>

                              <p className="text-sm font-bold text-gray-800 truncate">
                                {getName()}
                              </p>

                            </div>

                          </div>

                          {/* EMAIL */}

                          <div
                            className="
                            flex
                            items-center
                            gap-3
                            p-3
                            rounded-xl
                            bg-gray-50
                            border
                            border-gray-100
                            "
                          >

                            <div
                              className="
                              w-9
                              h-9
                              rounded-lg
                              bg-blue-100
                              text-blue-600
                              flex
                              items-center
                              justify-center
                              font-bold
                              "
                            >
                              @
                            </div>

                            <div className="min-w-0">

                              <p className="text-[11px] text-gray-400 font-bold uppercase">
                                Email Address
                              </p>

                              <p className="text-sm font-semibold text-gray-800 truncate">
                                {user?.email || "No email"}
                              </p>

                            </div>

                          </div>

                        </div>

                        {/* MOBILE BUTTONS */}

                        <div className="mt-5 pt-4 border-t border-gray-100 flex gap-2">
<button
                            onClick={handleLogout}
                            className="
                            flex-1
                            py-3
                            rounded-xl
                            bg-gradient-to-r
                            from-blue-600
                            to-indigo-600
                            text-white
                            font-bold
                            flex
                            items-center
                            justify-center
                            gap-2
                            hover:from-blue-700
                            hover:to-indigo-700
                            transition
                            cursor-pointer
                            "
                          >
                            <LogOut size={17} />
                            Logout
                          </button>

                        </div>

                      </div>

                    </div>
                  )}

                </div>
              )}

            </div>
          </div>
        )}

      </nav>

      {/* ================================================= */}
      {/* TOAST POPUP */}
      {/* ================================================= */}

      {toast.show && (
        <div
          className={`
          fixed
          bottom-6
          left-6
          z-[9999]
          min-w-[320px]
          max-w-[420px]
          px-5
          py-4
          rounded-xl
          shadow-2xl
          text-white
          flex
          items-center
          gap-3
          border
          animate-[slideIn_0.3s_ease-out]
          ${
            toast.type === "error"
              ? "bg-red-500 border-red-400"
              : "bg-indigo-600 border-indigo-400"
          }
          `}
        >

          {toast.type === "error" ? (
            <AlertCircle
              size={25}
              className="shrink-0"
            />
          ) : (
            <CheckCircle
              size={25}
              className="shrink-0"
            />
          )}

          <div className="flex flex-col">

            <span className="font-bold text-base">
              {toast.type === "error"
                ? "Error"
                : "Success"}
            </span>

            <span className="text-sm text-white/90">
              {toast.message}
            </span>

          </div>

        </div>
      )}

    </>
  );
};

export default Navbar;