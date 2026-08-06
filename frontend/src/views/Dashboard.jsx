import Sidebar from "../components/dashboard/Sidebar.jsx";
import Navbar from "../components/dashboard/Navbar.jsx";
import HeroSection from "../components/dashboard/HeroSection.jsx";
import TechnologyGrid from "../components/dashboard/TechnologyGrid.jsx";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
     
      <Sidebar />

      
      <div className="lg:ml-64 min-h-screen flex flex-col">
     
        <Navbar />

     
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <HeroSection />
          <TechnologyGrid />
        </main>
      </div>
    </div>
  );
}