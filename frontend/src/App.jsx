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
import TechnologyDetails from "./components/dashboard/TechnologyDetails.jsx";

import AdminTechnologyDetails from "./views/Admin/AdminTechnologyDetails.jsx";
import AdminQuestions from "./views/Admin/AdminQuestions.jsx"
import AdminProfile from "./views/Admin/AdminProfile.jsx"
import AdminDocuments from "./views/Admin/AdminDocuments.jsx"
import AdminSettings from "./views/Admin/AdminSettings.jsx"



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
        <Route path="/technology/:technologyId" element={<TechnologyDetails />}/>

         {/* Admin Section Routes */}

        <Route path="/admin/technology-details" element={<AdminTechnologyDetails />}/>
        <Route path="/AdminQuestions" element={<AdminQuestions/>}/>
        <Route path="/AdminProfile" element={<AdminProfile/>}/>
        <Route path="/AdminDocuments" element={<AdminDocuments/>}/>
        <Route path="/AdminSettings" element={<AdminSettings/>}/>
        
        
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}