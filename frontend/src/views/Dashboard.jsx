
import Navbar from "../components/Home/Navbar.jsx";
import HeroSection from "../components/dashboard/HeroSection.jsx";
import TechnologyGrid from "../components/dashboard/TechnologyGrid.jsx";
import Footer from "../components/Home/Footer.jsx";
export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div>
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 lg:pl-28 lg:pr-28">
          <HeroSection />
          <TechnologyGrid />
        </main>
        <Footer />
      </div>
    </div>
  );
}