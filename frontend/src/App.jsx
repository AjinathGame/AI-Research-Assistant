import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./views/Dashboard.jsx";
import Uploads from "./views/Uploads.jsx";
import Ask from "./views/Ask.jsx";
import Home from "./views/Home.jsx";
import Login from "./views/Login.jsx";
import About from "./views/About.jsx";
import CreateAccount from "./views/CreateAccount.jsx";
import VerifyEmail from "./views/VerifyEmail";
import OAuthSuccess from "./views/OAuthSuccess";
import ForgotPassword from "./views/ForgotPassword";
import ResetPassword from "./views/ResetPassword";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route path="/" element = {<Home/>}></Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element ={<About/>} />
        <Route path="/uploads" element={<Uploads />} />
        <Route path="/ask" element={<Ask />} />
        <Route path="/login" element={<Login />} />
        <Route path="/CreateAccount" element={<CreateAccount />} />
        <Route path="/verify-email/:token"element={<VerifyEmail />}/>
        <Route path="/oauth-success"element={<OAuthSuccess />}/>
        <Route path="/forgot-password"element={<ForgotPassword />}/>
        <Route path="/reset-password/:token"element={<ResetPassword />}/>
        
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}