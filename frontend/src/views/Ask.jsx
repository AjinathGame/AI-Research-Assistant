import { useEffect, useState } from "react";

import Footer from "../components/Home/Footer.jsx";
import Navbar from "../components/Home/Navbar.jsx";
import AskHero from "../components/ask/AskHero";
import ChatBox from "../components/ask/ChatBox";
import RecentQuestions from "../components/ask/RecentQuestions";

import { getTechnologies } from "../api/technologyApi";
import { getFoldersByTechnology } from "../api/folderApi";

export default function AskPage() {
  const [technologies, setTechnologies] = useState([]);
  const [folders, setFolders] = useState([]);

  const [technologyId, setTechnologyId] = useState("");
  const [folderId, setFolderId] = useState("");

  const [selectedChat, setSelectedChat] = useState(null);

  const [loadingTechnologies, setLoadingTechnologies] =
    useState(true);

  const [loadingFolders, setLoadingFolders] =
    useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    loadTechnologies();
  }, []);

  const loadTechnologies = async () => {
    try {
      setLoadingTechnologies(true);
      setError("");

      const result = await getTechnologies();

      setTechnologies(result.data || []);
    } catch (error) {
      console.error("Technology Load Error:", error);

      setError(
        error.message || "Failed to load technologies"
      );
    } finally {
      setLoadingTechnologies(false);
    }
  };

  const handleTechnologyChange = async (e) => {
    const selectedTechnologyId = e.target.value;

    setTechnologyId(selectedTechnologyId);
    setFolderId("");
    setFolders([]);
    setSelectedChat(null);
    setError("");

    if (!selectedTechnologyId) {
      return;
    }

    try {
      setLoadingFolders(true);

      const result = await getFoldersByTechnology(
        selectedTechnologyId
      );

      setFolders(result.data || []);
    } catch (error) {
      console.error("Folder Load Error:", error);

      setError(
        error.message || "Failed to load folders"
      );
    } finally {
      setLoadingFolders(false);
    }
  };

  const handleQuestionClick = (chat) => {
  console.log("ASK PAGE CLICK:", chat);

  setSelectedChat(chat);

  const selectedTechnologyId =
    chat?.technologyId?._id ||
    chat?.technologyId ||
    "";

  const selectedFolderId =
    chat?.folderId?._id ||
    chat?.folderId ||
    "";

  setTechnologyId(selectedTechnologyId);
  setFolderId(selectedFolderId);
};

  return (
    <div className="min-h-screen bg-slate-50">

      <div>
        <Navbar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">

          <div className="max-w-7xl mx-auto">

            <div className="mb-6 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select Technology
                  </label>

                  <select
                    value={technologyId}
                    onChange={handleTechnologyChange}
                    disabled={loadingTechnologies}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none cursor-pointer focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  >
                    <option value="">
                      {loadingTechnologies
                        ? "Loading technologies..."
                        : "Select technology"}
                    </option>

                    {technologies.map((technology) => (
                      <option
                        key={technology._id}
                        value={technology._id}
                      >
                        {technology.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select Folder
                  </label>

                  <select
                    value={folderId}
                    onChange={(e) =>
                      setFolderId(e.target.value)
                    }
                    disabled={
                      !technologyId ||
                      loadingFolders
                    }
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none cursor-pointer focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  >
                    <option value="">
                      {!technologyId
                        ? "Select technology first"
                        : loadingFolders
                        ? "Loading folders..."
                        : folders.length === 0
                        ? "No folders available"
                        : "Select folder"}
                    </option>

                    {folders.map((folder) => (
                      <option
                        key={folder._id}
                        value={folder._id}
                      >
                        {folder.name}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {error && (
                <div className="mt-4 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
                  {error}
                </div>
              )}

            </div>

            <div className="flex flex-col gap-6 xl:hidden">

              <AskHero />

              <ChatBox
                technologyId={technologyId}
                folderId={folderId}
                selectedChat={selectedChat}
               
              />

              <RecentQuestions
                onQuestionSelect={handleQuestionClick}
              />

            </div>

            <div className="hidden xl:grid xl:grid-cols-12 gap-8">

              <div className="col-span-8 space-y-6">

                <AskHero />

                <ChatBox
                  technologyId={technologyId}
                  folderId={folderId}
                  selectedChat={selectedChat}
                
                />

              </div>

              <div className="col-span-4">

                <RecentQuestions
                  onQuestionSelect={handleQuestionClick}
                />

              </div>

            </div>

          </div>

        </main>

      </div>

      <Footer />

    </div>
  );
}