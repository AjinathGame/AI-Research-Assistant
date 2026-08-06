import { useState } from "react";
import {
    Cpu,
    Image,
    Table,
    ScanText,
    Sigma,
    FolderOpen,
} from "lucide-react";

export default function UploadSettings() {
    const [category, setCategory] = useState("Artificial Intelligence");
    const [visibility, setVisibility] = useState("Private");

    const [options, setOptions] = useState({
        images: true,
        tables: true,
        ocr: true,
        formulas: true,
    });

    const toggle = (key) => {
        setOptions((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <section className="mt-5 bg-white rounded-2xl lg:rounded-3xl border border-gray-200 shadow-sm p-4 sm:p-6 lg:p-7">
          
            <div className="flex items-center gap-3 mb-5">
                <FolderOpen className="text-indigo-600 w-6 h-6" />

                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Upload Settings
                </h2>
            </div>

            <div className="grid grid-cols-1  md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm  cursor-pointer font-semibold text-gray-700 mb-2">
                        Technology Category
                    </label>

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full rounded-xl border cursor-pointer border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                        <option>Artificial Intelligence</option>
                        <option>Machine Learning</option>
                        <option>Networking</option>
                        <option>AWS Cloud</option>
                        <option>Database</option>
                        <option>Statistics</option>
                        <option>Probability</option>
                        <option>Testing</option>
                        <option>Design Theory</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm cursor-pointer font-semibold text-gray-700 mb-2">
                        Document Visibility
                    </label>

                    <select
                        value={visibility}
                        onChange={(e) => setVisibility(e.target.value)}
                        className="w-full rounded-xl border cursor-pointer border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                        <option value="Private">🔒 Private</option>
                        <option value="Public">🌍 Public</option>
                        <option value="Team">👥 Team</option>
                    </select>

                    <p className="mt-2 text-sm text-gray-500">
                        Control who can access this uploaded document.
                    </p>
                </div>
            </div>

            

           
            <div className="mt-10 flex flex-col-reverse sm:flex-row justify-end gap-4">
                <button className="w-full cursor-pointer sm:w-auto px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition">
                    Cancel
                </button>

                <button className="w-full cursor-pointer sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-md">
                    <Cpu size={18} />
                    Upload & Process
                </button>
            </div>
        </section>
    );
}

function OptionCard({ icon, title, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`w-full rounded-2xl border p-5 sm:p-6 text-left transition-all duration-300 ${active
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-gray-200 hover:border-indigo-400 hover:bg-gray-50"
                }`}
        >
            <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${active
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
            >
                {icon}
            </div>

            <h4 className="font-semibold text-gray-900 text-base sm:text-lg">
                {title}
            </h4>

            <p className="text-sm text-gray-500 mt-2">
                {active ? "Enabled" : "Disabled"}
            </p>
        </button>
    );
}