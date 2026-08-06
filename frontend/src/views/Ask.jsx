import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";

import AskHero from "../components/ask/AskHero";
import ChatBox from "../components/ask/ChatBox";
import RecentQuestions from "../components/ask/RecentQuestions";


export default function AskPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      
      <Sidebar />

      <div className="lg:ml-64 min-h-screen flex flex-col">
       
        <Navbar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">

            <div className="flex flex-col gap-6 xl:hidden">
              <AskHero />

              <ChatBox />

              <RecentQuestions />

              
            </div>

            <div className="hidden xl:grid xl:grid-cols-12 gap-8">

              <div className="col-span-8 space-y-6">
                <AskHero />

                <ChatBox />

              </div>

              <div className="col-span-4">
                <RecentQuestions />
              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}