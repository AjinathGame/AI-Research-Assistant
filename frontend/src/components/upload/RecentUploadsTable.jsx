import {
  Eye,
  Trash2,
  FileText,
  CheckCircle2,
} from "lucide-react";

const uploads = [
  {
    id: 1,
    name: "Artificial Intelligence.pdf",
    category: "AI",
    pages: 182,
    size: "14.8 MB",
    date: "Today",
    status: "Completed",
  },
  {
    id: 2,
    name: "Machine Learning Notes.pdf",
    category: "ML",
    pages: 245,
    size: "18.4 MB",
    date: "Yesterday",
    status: "Completed",
  },
  {
    id: 3,
    name: "Networking.pdf",
    category: "Networking",
    pages: 124,
    size: "8.5 MB",
    date: "30 Jul",
    status: "Completed",
  },
  {
    id: 4,
    name: "AWS Cloud.pdf",
    category: "AWS",
    pages: 210,
    size: "16.1 MB",
    date: "29 Jul",
    status: "Completed",
  },
];
export default function RecentUploadsTable() {
  return (
    <section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5 sm:p-6 lg:p-8">

      <div className="flex justify-between items-center mb-1">

        <div>

          <h2 className="text-2xl font-bold text-gray-900">
            Recent Uploads
          </h2>

          <p className="text-gray-500 mt-1">
            Your recently uploaded research documents.
          </p>

        </div>

      </div>

      {/* Desktop */}

      <div className="hidden lg:block overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-4">Document</th>
              <th className="text-left py-4">Technology</th>
              <th className="text-left py-4">Pages</th>
              <th className="text-left py-4">Size</th>
              <th className="text-left py-4">Uploaded</th>
              <th className="text-left py-4">Status</th>
              <th className="text-right py-4">Action</th>

            </tr>

          </thead>

          <tbody>

            {uploads.map((item) => (

              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 transition"
              >

                <td className="py-3">

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">

                      <FileText
                        className="text-red-600"
                        size={22}
                      />

                    </div>

                    <div>

                      <h4 className="font-semibold">
                        {item.name}
                      </h4>

                      <p className="text-sm text-gray-500">
                        PDF Document
                      </p>

                    </div>

                  </div>

                </td>

                <td>

                  <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">
                    {item.category}
                  </span>

                </td>

                <td>{item.pages}</td>

                <td>{item.size}</td>

                <td>{item.date}</td>

                <td>

                  <span className="inline-flex items-center gap-2 text-green-600">

                    <CheckCircle2 size={18} />

                    {item.status}

                  </span>

                </td>

                <td>

                  <div className="flex justify-end gap-3">

                    <button className="w-10 h-10 cursor-pointer rounded-lg hover:bg-indigo-100 flex items-center justify-center">

                      <Eye
                        size={18}
                        className="text-indigo-600 cursor-pointer" 
                      />

                    </button>

                    <button className="w-10 h-10 cursor-pointer rounded-lg hover:bg-red-100 flex items-center justify-center">

                      <Trash2
                        size={18}
                        className="text-red-500 cursor-pointer"
                      />

                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile */}

      <div className="lg:hidden space-y-5">

        {uploads.map((item) => (

          <div
            key={item.id}
            className="border rounded-2xl p-5"
          >

            <div className="flex justify-between">

              <div className="flex gap-4">

                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">

                  <FileText
                    className="text-red-600"
                    size={22}
                  />

                </div>

                <div>

                  <h4 className="font-semibold">
                    {item.name}
                  </h4>

                  <p className="text-gray-500 text-sm">
                    {item.size}
                  </p>

                </div>

              </div>

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                Done
              </span>

            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 text-sm">

              <div>

                <p className="text-gray-500">
                  Technology
                </p>

                <p className="font-medium">
                  {item.category}
                </p>

              </div>

              <div>

                <p className="text-gray-500">
                  Pages
                </p>

                <p className="font-medium">
                  {item.pages}
                </p>

              </div>

              <div>

                <p className="text-gray-500">
                  Uploaded
                </p>

                <p className="font-medium">
                  {item.date}
                </p>

              </div>

              <div>

                <p className="text-gray-500">
                  Status
                </p>

                <p className="text-green-600 font-medium">
                  Completed
                </p>

              </div>

            </div>

            <div className="flex gap-3 mt-6">

              <button className="flex-1 rounded-xl border py-3 hover:bg-gray-100">
                View
              </button>

              <button className="flex-1 rounded-xl bg-red-500 text-white hover:bg-red-600">
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}