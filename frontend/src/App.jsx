import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./views/Dashboard.jsx";
import Uploads from "./views/Uploads.jsx";
import Ask from "./views/Ask.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/home" element = {<h1>home</h1>}></Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/uploads" element={<Uploads />} />
        <Route path="/ask" element={<Ask />} />
        <Route path="/login" element={<h1>Login Page</h1>} />
        <Route path="/register" element={<h1>Register Page</h1>} />

        
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}