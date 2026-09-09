import { LockKeyhole, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoginRequiredModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) {
    return null;
  }

  const handleLogin = () => {
    onClose();
    navigate("/login");
  };

  const handleCreateAccount = () => {
    onClose();
    navigate("/CreateAccount");
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 cursor-pointer rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <LockKeyhole className="h-8 w-8" />
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900 sm:text-2xl">
            Login Required
          </h2>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
            Please login or create an account to access this page and use the
            features of AI Search Assistant.
          </p>

          <div className="mt-7 flex flex-col gap-3">
            <button
              type="button"
              onClick={handleLogin}
              className="w-full cursor-pointer rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Login
            </button>

            <button
              type="button"
              onClick={handleCreateAccount}
              className="w-full cursor-pointer rounded-xl border border-blue-600 bg-white px-5 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              Create Account
            </button>
          </div>

          
        </div>
      </div>
    </div>
  );
}