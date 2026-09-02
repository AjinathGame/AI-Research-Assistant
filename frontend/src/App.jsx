import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./views/Dashboard.jsx";
import Uploads from "./views/Uploads.jsx";
import Ask from "./views/Ask.jsx";
import Home from "./views/Home.jsx";
import Login from "./views/Login.jsx";
import About from "./views/About.jsx";
import CreateAccount from "./views/CreateAccount.jsx";
import TechnologyDetails from "./components/dashboard/TechnologyDetails.jsx";

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
        <Route path="/technology/:technologyId"element={<TechnologyDetails />}/>

        
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}