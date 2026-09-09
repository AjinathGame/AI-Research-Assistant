import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";

import Dashboard from "./views/Dashboard.jsx";
import Uploads from "./views/Uploads.jsx";
import Ask from "./views/Ask.jsx";
import Home from "./views/Home.jsx";
import Login from "./views/Login.jsx";
import About from "./views/About.jsx";
import CreateAccount from "./views/CreateAccount.jsx";
import VerifyEmail from "./views/VerifyEmail.jsx";
import OAuthSuccess from "./views/OAuthSuccess.jsx";
import ForgotPassword from "./views/ForgotPassword.jsx";
import ResetPassword from "./views/ResetPassword.jsx";
import TechnologyDetails from "./components/dashboard/TechnologyDetails.jsx";

import AdminDashboard from "./views/Admin/AdminDashboard.jsx";
import AdminUserDetails from "./views/Admin/AdminUserDetails.jsx";
import AdminTechnologies from "./views/Admin/AdminTechnologies.jsx";
import AdminTechnologyDetails from "./views/Admin/AdminTechnologyDetails.jsx";
import AdminUser from "./views/Admin/AdminUser.jsx";
import AdminQuestions from "./views/Admin/AdminQuestions.jsx";
import AdminProfile from "./views/Admin/AdminProfile.jsx";
import AdminDocuments from "./views/Admin/AdminDocuments.jsx";
import AdminFolderDetails from "./views/Admin/AdminFolderDetails.jsx";

import LoginRequiredModal from "./components/auth/LoginRequiredModal.jsx";

const getStoredUser = () => {
  try {
    const user = localStorage.getItem("user");

    if (!user) {
      return null;
    }

    return JSON.parse(user);
  } catch (error) {
    console.error("Failed to read stored user:", error);
    localStorage.removeItem("user");
    return null;
  }
};

const ProtectedRoute = ({ children }) => {
  const [showModal, setShowModal] = useState(true);

  const token = localStorage.getItem("token");
  const user = getStoredUser();

  if (!token || !user) {
    return (
      <>
        <div className="min-h-screen">
          {children}
        </div>

        <LoginRequiredModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      </>
    );
  }

  if (user.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = getStoredUser();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = getStoredUser();

  if (token && user) {
    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const HomeRoute = () => {
  const token = localStorage.getItem("token");
  const user = getStoredUser();

  if (token && user?.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Home />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRoute />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/CreateAccount"
          element={
            <PublicRoute>
              <CreateAccount />
            </PublicRoute>
          }
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/verify-email/:token"
          element={<VerifyEmail />}
        />

        <Route
          path="/oauth-success"
          element={<OAuthSuccess />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/uploads"
          element={
            <ProtectedRoute>
              <Uploads />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ask"
          element={
            <ProtectedRoute>
              <Ask />
            </ProtectedRoute>
          }
        />

        <Route
          path="/technology/:technologyId"
          element={
            <ProtectedRoute>
              <TechnologyDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/userdetails"
          element={
            <AdminRoute>
              <AdminUserDetails />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/user"
          element={
            <AdminRoute>
              <AdminUser />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/users/:id"
          element={
            <AdminRoute>
              <AdminUser />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/technologies"
          element={
            <AdminRoute>
              <AdminTechnologies />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/add-technology"
          element={
            <AdminRoute>
              <AdminTechnologyDetails />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/technology-details"
          element={
            <AdminRoute>
              <AdminTechnologyDetails />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/technologies/:id"
          element={
            <AdminRoute>
              <AdminTechnologyDetails />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/folders/:id"
          element={
            <AdminRoute>
              <AdminFolderDetails />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/questions"
          element={
            <AdminRoute>
              <AdminQuestions />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/profile"
          element={
            <AdminRoute>
              <AdminProfile />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/documents"
          element={
            <AdminRoute>
              <AdminDocuments />
            </AdminRoute>
          }
        />

        <Route
          path="*"
          element={
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
              <h1 className="text-2xl font-semibold text-gray-800">
                404 - Page Not Found
              </h1>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}