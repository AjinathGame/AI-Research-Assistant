import { useState } from "react";

import Navbar from "../components/Home/Navbar.jsx";
import UploadHero from "../components/upload/UploadHero.jsx";
import DragDropUpload from "../components/upload/DragDropUpload.jsx";
import UploadSettings from "../components/upload/UploadSettings.jsx";
import RecentUploadsTable from "../components/upload/RecentUploadsTable.jsx";
import Footer from "../components/Home/Footer.jsx";

export default function UploadPage() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div>
        <Navbar />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:py-8">

            <UploadHero />

            <div className="mt-8">
              <DragDropUpload
                selectedFiles={selectedFiles}
                setSelectedFiles={setSelectedFiles}
              />
            </div>

            <div className="mt-8">
              <UploadSettings
                selectedFiles={selectedFiles}
                setSelectedFiles={setSelectedFiles}
              />
            </div>

            <div className="mt-8">
              <RecentUploadsTable />
            </div>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}