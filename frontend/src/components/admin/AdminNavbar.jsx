import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  Layers3,
  FileText,
  CircleHelp,
  UserRound,
  Bell,
  ChevronDown,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import Logo from "../../assets/main_logo.png";
import { Link, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const loadUser = () => {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to load admin user:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();

    const handleAuthChanged = () => {
      loadUser();
    };

    window.addEventListener("authChanged", handleAuthChanged);

    return () => {
      window.removeEventListener(
        "authChanged",
        handleAuthChanged
      );
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!profileOpen) return;

      const clickedInsideProfile =
        event.target.closest("[data-admin-profile-area]");

      if (!clickedInsideProfile) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, [profileOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("authChanged"));

    setProfileOpen(false);
    setMobileMenu(false);
    setUser(null);

    navigate("/login", {
      replace: true,
    });
  };

  const adminName = user?.name?.trim() || "Admin";

  const adminEmail =
    user?.email?.trim() || "No email";

  const adminInitial =
    adminName.charAt(0).toUpperCase() || "A";

  const getFirstName = () => {
    if (!adminName || adminName === "Admin") {
      return "ADMIN";
    }

    return adminName
      .split(/\s+/)[0]
      .toUpperCase();
  };

  return (
    <>
      <header className="sticky top-0 z-50 h-[82px] border-b border-gray-200 bg-white">
        <div className="flex h-full items-center justify-between px-5 sm:px-8 lg:px-10">

          <div className="flex items-center gap-3">

            <button
              type="button"
              onClick={() => {
                setMobileMenu(!mobileMenu);
                setProfileOpen(false);
              }}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
            >
              {mobileMenu ? (
                <X size={22} />
              ) : (
                <Menu size={22} />
              )}
            </button>

            <Link
              to="/admin/dashboard"
              className="flex cursor-pointer items-center gap-3"
            >
              <div className="flex h-12 w-16 items-center justify-center rounded-xl">
                <img
                  src={Logo}
                  alt="AI Search Assistant"
                  className="w-full"
                />
              </div>

              <div>
                <h2 className="text-[22px] font-bold text-gray-900">
                  AI Search Assistant
                </h2>

                <p className="font-serif text-sm text-black">
                  Ask. Learn. Discover.
                </p>
              </div>
            </Link>
          </div>

          <nav className="hidden h-full items-center lg:flex">

            <Link
              to="/admin/dashboard"
              className="flex h-full cursor-pointer items-center gap-2 px-5 text-[15px] font-medium text-[#172033] transition hover:text-blue-600"
            >
              <LayoutDashboard
                size={21}
                strokeWidth={1.8}
              />
              Dashboard
            </Link>

            <Link
              to="/admin/userdetails"
              className="flex h-full cursor-pointer items-center gap-2 px-5 text-[15px] font-medium text-[#172033] transition hover:text-blue-600"
            >
              <Users
                size={21}
                strokeWidth={1.8}
              />
              Users
            </Link>

            <Link
              to="/admin/technologies"
              className="flex h-full cursor-pointer items-center gap-2 px-5 text-[15px] font-medium text-[#172033] transition hover:text-blue-600"
            >
              <Layers3
                size={21}
                strokeWidth={1.8}
              />
              Technologies
            </Link>

            <Link
              to="/admin/documents"
              className="flex h-full cursor-pointer items-center gap-2 px-5 text-[15px] font-medium text-[#172033] transition hover:text-blue-600"
            >
              <FileText
                size={21}
                strokeWidth={1.8}
              />
              Documents
            </Link>

            <Link
              to="/admin/questions"
              className="flex h-full cursor-pointer items-center gap-2 px-5 text-[15px] font-medium text-[#172033] transition hover:text-blue-600"
            >
              <CircleHelp
                size={21}
                strokeWidth={1.8}
              />
              Questions
            </Link>

            <Link
              to="/admin/profile"
              className="flex h-full cursor-pointer items-center gap-2 px-5 text-[15px] font-medium text-[#172033] transition hover:text-blue-600"
            >
              <UserRound
                size={21}
                strokeWidth={1.8}
              />
              Profile
            </Link>
          </nav>

          <div className="flex items-center gap-5">

           
            <div
              className="relative hidden sm:block"
              data-admin-profile-area
            >
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex cursor-pointer items-center gap-3"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#183a61] text-white">
                  <span className="text-lg font-medium">
                    {adminInitial}
                  </span>
                </div>

                <div className="hidden text-left md:block">
                  <p className="text-[15px] font-semibold text-[#172033]">
                    {adminName}
                  </p>

                  <p className="text-xs text-gray-500">
                    Super Admin
                  </p>
                </div>

                <ChevronDown
                  size={18}
                  className={`text-gray-600 transition ${
                    profileOpen
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {profileOpen && (
                <div
                  data-admin-profile-area
                  className="
                    absolute
                    right-0
                    top-[64px]
                    w-[360px]
                    overflow-hidden
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    shadow-[0_20px_60px_rgba(0,0,0,0.18)]
                    z-[100]
                    animate-[profilePopup_0.25s_ease-out]
                  "
                >

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

                    <div
                      className="
                        absolute
                        -top-10
                        -right-10
                        h-28
                        w-28
                        rounded-full
                        bg-white/10
                      "
                    />

                    <div
                      className="
                        absolute
                        -bottom-12
                        -left-8
                        h-32
                        w-32
                        rounded-full
                        bg-white/10
                      "
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setProfileOpen(false)
                      }
                      className="
                        absolute
                        right-4
                        top-4
                        flex
                        h-8
                        w-8
                        cursor-pointer
                        items-center
                        justify-center
                        rounded-full
                        bg-white/10
                        text-white
                        transition
                        hover:bg-white/20
                      "
                    >
                      <X size={17} />
                    </button>

                    <div className="relative flex flex-col items-center">

                      <div
                        className="
                          flex
                          h-[76px]
                          w-[76px]
                          items-center
                          justify-center
                          rounded-full
                          border-4
                          border-white/30
                          bg-white
                          shadow-xl
                        "
                      >
                        <span
                          className="
                            bg-gradient-to-r
                            from-blue-600
                            to-purple-600
                            bg-clip-text
                            text-3xl
                            font-bold
                            text-transparent
                          "
                        >
                          {adminInitial}
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
                          mt-1
                          text-sm
                          text-blue-100
                        "
                      >
                        Welcome back!
                      </p>
                    </div>
                  </div>

                  <div className="px-6 py-5">

                    <div className="space-y-3">

                      <div
                        className="
                          flex
                          items-center
                          gap-4
                          rounded-xl
                          border
                          border-gray-100
                          bg-gray-50
                          p-3
                        "
                      >
                        <div
                          className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            bg-indigo-100
                            font-bold
                            text-indigo-600
                          "
                        >
                          {adminInitial}
                        </div>

                        <div className="min-w-0">

                          <p
                            className="
                              text-xs
                              font-semibold
                              uppercase
                              tracking-wider
                              text-gray-400
                            "
                          >
                            Full Name
                          </p>

                          <p
                            className="
                              truncate
                              text-sm
                              font-bold
                              text-gray-800
                            "
                          >
                            {adminName}
                          </p>

                        </div>
                      </div>

                      <div
                        className="
                          flex
                          items-center
                          gap-4
                          rounded-xl
                          border
                          border-gray-100
                          bg-gray-50
                          p-3
                        "
                      >
                        <div
                          className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            bg-blue-100
                            font-bold
                            text-blue-600
                          "
                        >
                          @
                        </div>

                        <div className="min-w-0">

                          <p
                            className="
                              text-xs
                              font-semibold
                              uppercase
                              tracking-wider
                              text-gray-400
                            "
                          >
                            Email Address
                          </p>

                          <p
                            className="
                              truncate
                              text-sm
                              font-semibold
                              text-gray-800
                            "
                          >
                            {adminEmail}
                          </p>

                        </div>
                      </div>

                    </div>

                    <div
                      className="
                        mt-5
                        flex
                        gap-3
                        border-t
                        border-gray-100
                        pt-4
                      "
                    >

                      <Link
                        to="/admin/profile"
                        onClick={() =>
                          setProfileOpen(false)
                        }
                        className="
                          flex
                          flex-1
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          border
                          border-indigo-600
                          bg-white
                          py-3
                          font-bold
                          text-indigo-600
                          transition
                          hover:bg-indigo-50
                        "
                      >
                        <UserRound size={18} />
                        Profile
                      </Link>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="
                          flex
                          flex-1
                          cursor-pointer
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          bg-gradient-to-r
                          from-blue-600
                          to-indigo-600
                          py-3
                          font-bold
                          text-white
                          shadow-md
                          shadow-indigo-200
                          transition
                          hover:from-blue-700
                          hover:to-indigo-700
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
          </div>
        </div>
      </header>

      {mobileMenu && (
        <div className="fixed inset-x-0 top-[82px] z-40 border-b border-gray-200 bg-white shadow-lg lg:hidden">

          <nav className="flex flex-col p-4">

            <Link
              to="/admin/dashboard"
              onClick={() => setMobileMenu(false)}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <LayoutDashboard size={20} />
              Dashboard
            </Link>

            <Link
              to="/admin/userdetails"
              onClick={() => setMobileMenu(false)}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Users size={20} />
              Users
            </Link>

            <Link
              to="/admin/technologies"
              onClick={() => setMobileMenu(false)}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Layers3 size={20} />
              Technologies
            </Link>

            <Link
              to="/admin/documents"
              onClick={() => setMobileMenu(false)}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <FileText size={20} />
              Documents
            </Link>

            <Link
              to="/admin/questions"
              onClick={() => setMobileMenu(false)}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <CircleHelp size={20} />
              Questions
            </Link>

            <Link
              to="/admin/profile"
              onClick={() => setMobileMenu(false)}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <UserRound size={20} />
              Profile
            </Link>

            {user && (
              <div
                className="mt-3 border-t pt-4"
                data-admin-profile-area
              >
                <button
                  type="button"
                  onClick={() =>
                    setProfileOpen(!profileOpen)
                  }
                  className="flex w-full cursor-pointer items-center gap-4"
                >
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      bg-gradient-to-br
                      from-blue-600
                      to-purple-600
                      text-xl
                      font-bold
                      text-white
                      shadow-md
                    "
                  >
                    {adminInitial}
                  </div>

                  <div className="min-w-0 text-left">

                    <p className="truncate font-bold text-gray-900">
                      {adminName}
                    </p>

                    <p className="truncate text-sm text-gray-500">
                      {adminEmail}
                    </p>

                  </div>

                  <ChevronDown
                    size={18}
                    className={`ml-auto text-gray-600 transition ${
                      profileOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                {profileOpen && (
                  <div
                    data-admin-profile-area
                    className="
                      mt-4
                      overflow-hidden
                      rounded-2xl
                      border
                      border-gray-200
                      bg-white
                      shadow-xl
                      animate-[profilePopup_0.25s_ease-out]
                    "
                  >

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
                        type="button"
                        onClick={() =>
                          setProfileOpen(false)
                        }
                        className="
                          absolute
                          right-3
                          top-3
                          flex
                          h-8
                          w-8
                          cursor-pointer
                          items-center
                          justify-center
                          rounded-full
                          bg-white/10
                          text-white
                          transition
                          hover:bg-white/20
                        "
                      >
                        <X size={17} />
                      </button>

                      <div className="flex flex-col items-center">

                        <div
                          className="
                            flex
                            h-[68px]
                            w-[68px]
                            items-center
                            justify-center
                            rounded-full
                            border-4
                            border-white/30
                            bg-white
                            shadow-lg
                          "
                        >
                          <span
                            className="
                              bg-gradient-to-r
                              from-blue-600
                              to-purple-600
                              bg-clip-text
                              text-2xl
                              font-bold
                              text-transparent
                            "
                          >
                            {adminInitial}
                          </span>
                        </div>

                        <h2 className="mt-3 text-lg font-bold text-white">
                          HEY {getFirstName()} 👋
                        </h2>

                        <p className="mt-1 text-sm text-blue-100">
                          Welcome back!
                        </p>

                      </div>
                    </div>

                    <div className="p-5">

                      <div className="space-y-3">

                        <div
                          className="
                            flex
                            items-center
                            gap-3
                            rounded-xl
                            border
                            border-gray-100
                            bg-gray-50
                            p-3
                          "
                        >
                          <div
                            className="
                              flex
                              h-9
                              w-9
                              items-center
                              justify-center
                              rounded-lg
                              bg-indigo-100
                              font-bold
                              text-indigo-600
                            "
                          >
                            {adminInitial}
                          </div>

                          <div className="min-w-0">

                            <p className="text-[11px] font-bold uppercase text-gray-400">
                              Full Name
                            </p>

                            <p className="truncate text-sm font-bold text-gray-800">
                              {adminName}
                            </p>

                          </div>
                        </div>

                        <div
                          className="
                            flex
                            items-center
                            gap-3
                            rounded-xl
                            border
                            border-gray-100
                            bg-gray-50
                            p-3
                          "
                        >
                          <div
                            className="
                              flex
                              h-9
                              w-9
                              items-center
                              justify-center
                              rounded-lg
                              bg-blue-100
                              font-bold
                              text-blue-600
                            "
                          >
                            @
                          </div>

                          <div className="min-w-0">

                            <p className="text-[11px] font-bold uppercase text-gray-400">
                              Email Address
                            </p>

                            <p className="truncate text-sm font-semibold text-gray-800">
                              {adminEmail}
                            </p>

                          </div>
                        </div>

                      </div>

                      <div className="mt-5 flex gap-2 border-t border-gray-100 pt-4">

                        <Link
                          to="/admin/profile"
                          onClick={() =>
                            setProfileOpen(false)
                          }
                          className="
                            flex
                            flex-1
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            border
                            border-indigo-600
                            bg-white
                            py-3
                            font-bold
                            text-indigo-600
                            transition
                            hover:bg-indigo-50
                          "
                        >
                          <UserRound size={17} />
                          Profile
                        </Link>

                        <button
                          type="button"
                          onClick={handleLogout}
                          className="
                            flex
                            flex-1
                            cursor-pointer
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-gradient-to-r
                            from-blue-600
                            to-indigo-600
                            py-3
                            font-bold
                            text-white
                            transition
                            hover:from-blue-700
                            hover:to-indigo-700
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
          </nav>
        </div>
      )}
    </>
  );
};

export default AdminNavbar;