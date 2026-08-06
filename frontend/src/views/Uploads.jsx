import Navbar from "../components/Home/Navbar.jsx";


import UploadHero from "../components/upload/UploadHero.jsx";
import DragDropUpload from "../components/upload/DragDropUpload.jsx";
import UploadSettings from "../components/upload/UploadSettings.jsx";
import RecentUploadsTable from "../components/upload/RecentUploadsTable.jsx";
import Footer from "../components/Home/Footer.jsx";

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">


     
      <div className="">
       
        <Navbar />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
            <UploadHero />

            <div className="mt-8">
              <DragDropUpload />
            </div>

            <div className="mt-8">
              <UploadSettings />
            </div>

            <div className="mt-8">
              <RecentUploadsTable />
            </div>
            <div className="">
              
            </div>
          </div>
        </main>
      </div>
      <Footer/>
    </div>
  );
}