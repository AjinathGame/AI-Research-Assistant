import React, { useEffect, useState } from "react";
import {
  Home,
  LayoutDashboard,
  MessageSquare,
  Upload,
  Info,
  LogIn,
  UserPlus,
  Menu,
  X,
  LogOut,
  Trash2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/main_logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = () => {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error("Invalid user data:", error);
          setUser(null);
        }
      } else {
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setProfileOpen(false);
    setOpen(false);

    window.dispatchEvent(new Event("authChanged"));

    navigate("/Login");
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?\n\nThis action cannot be undone."
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeleting(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("You are not logged in.");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/auth/delete-account",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("Delete Account Response:", data);

      if (!response.ok) {
        alert(data.message || "Failed to delete account.");
        return;
      }

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setUser(null);
      setProfileOpen(false);
      setOpen(false);

      window.dispatchEvent(new Event("authChanged"));

      alert("Account deleted successfully.");

      navigate("/Login");
    } catch (error) {
      console.error("Delete account error:", error);
      alert("Unable to connect to server.");
    } finally {
      setDeleting(false);
    }
  };

  const getInitial = () => {
    if (!user?.name) return "D";

    return user.name.trim().charAt(0).toUpperCase();
  };

  const getFirstName = () => {
    if (!user?.name) return "USER";

    return user.name.trim().split(" ")[0].toUpperCase();
  };

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-8xl mx-auto h-[80px] flex items-center justify-between px-5 lg:px-10">
        <div className="flex items-center gap-4 cursor-pointer">
          <div className="w-16 h-12 rounded-xl flex items-center justify-center text-white text-xl font-bold">
            <img
              src={Logo}
              alt="Hero"
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

        <div className="hidden lg:flex items-center gap-4 mr-10 lg:mr-0">
          {!user ? (
            <>
              <Link to="/Login">
                <button className="px-4 py-2 flex items-center gap-2 rounded-md border border-gray-300 shadow bg-white font-bold hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white transition cursor-pointer">
                  <LogIn size={17} />
                  Sign In
                </button>
              </Link>

              <Link to="/CreateAccount">
                <button className="px-4 py-2 flex items-center gap-2 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition cursor-pointer">
                  <UserPlus size={18} />
                  Create Account
                </button>
              </Link>
            </>
          ) : (
            <div className="relative flex items-center gap-3">
              <span className="text-gray-800 font-semibold text-lg whitespace-nowrap">
                {user?.name || "User"}
              </span>

              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-12 h-12 rounded-full bg-indigo-500 text-white text-xl font-semibold flex items-center justify-center hover:bg-indigo-600 transition cursor-pointer"
              >
                {getInitial()}
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-16 w-[350px] bg-slate-800 rounded-lg shadow-xl p-5 z-50">
                  <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold text-white">
                      HEY {getFirstName()}
                    </h2>

                    <p className="text-gray-400 text-base mt-1">
                      {user?.name || "User"}
                    </p>
                  </div>

                  <div className="space-y-3 mb-5">
                    <p className="text-gray-300 text-lg font-semibold">
                      {user?.name || "User"}
                    </p>

                    <p className="text-gray-300 text-lg font-semibold break-all">
                      {user?.email || "No email"}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleDeleteAccount}
                      disabled={deleting}
                      className="flex-1 py-3 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold rounded-sm flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deleting ? "Deleting..." : "Delete"}
                      <Trash2 size={20} />
                    </button>

                    <button
                      onClick={handleLogout}
                      className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-sm flex items-center justify-center gap-2 transition"
                    >
                      Logout
                      <LogOut size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden cursor-pointer"
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t shadow-md">
          <div className="flex flex-col px-6 py-5 gap-5">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 font-semibold"
            >
              <Home size={18} />
              Home
            </Link>

            <Link
              to="/Dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 font-semibold"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>

            <Link
              to="/Ask"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 font-semibold"
            >
              <MessageSquare size={18} />
              Ask
            </Link>

            <Link
              to="/Uploads"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 font-semibold"
            >
              <Upload size={18} />
              Upload
            </Link>

            <Link
              to="/About"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 font-semibold"
            >
              <Info size={18} />
              About Us
            </Link>

            {!user ? (
              <>
                <Link
                  to="/Login"
                  onClick={() => setOpen(false)}
                >
                  <button className="mt-3 w-full px-4 py-3 rounded-lg border border-gray-300 font-bold flex items-center justify-center gap-2">
                    <LogIn size={18} />
                    Sign In
                  </button>
                </Link>

                <Link
                  to="/CreateAccount"
                  onClick={() => setOpen(false)}
                >
                  <button className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center gap-2">
                    <UserPlus size={18} />
                    Create Account
                  </button>
                </Link>
              </>
            ) : (
              <div className="border-t pt-5">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="w-full flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-indigo-500 text-white text-xl font-semibold flex items-center justify-center">
                    {getInitial()}
                  </div>

                  <div className="text-left">
                    <p className="font-bold text-gray-900">
                      {user?.name || "User"}
                    </p>

                    <p className="text-sm text-gray-500">
                      {user?.email || "No email"}
                    </p>
                  </div>
                </button>

                {profileOpen && (
                  <div className="mt-4 bg-slate-800 rounded-lg p-5">
                    <div className="text-center mb-4">
                      <h2 className="text-xl font-bold text-white">
                        HEY {getFirstName()}
                      </h2>

                      <p className="text-gray-400">
                        {user?.name || "User"}
                      </p>
                    </div>

                    <div className="space-y-3 mb-5">
                      <p className="text-gray-300 font-semibold">
                        {user?.name || "User"}
                      </p>

                      <p className="text-gray-300 font-semibold break-all">
                        {user?.email || "No email"}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={handleDeleteAccount}
                        disabled={deleting}
                        className="flex-1 py-3 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold rounded-sm flex items-center justify-center gap-2 transition disabled:opacity-50"
                      >
                        {deleting ? "Deleting..." : "Delete"}
                        <Trash2 size={19} />
                      </button>

                      <button
                        onClick={handleLogout}
                        className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-sm flex items-center justify-center gap-2"
                      >
                        Logout
                        <LogOut size={19} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;