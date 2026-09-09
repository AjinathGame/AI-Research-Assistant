import React, { useState } from "react";
import LoginRequiredModal from "./LoginRequiredModal";

const RequireAuth = ({ children }) => {
  const [showModal, setShowModal] = useState(true);

  const token = localStorage.getItem("token");

  if (token) {
    return children;
  }

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
};

export default RequireAuth;