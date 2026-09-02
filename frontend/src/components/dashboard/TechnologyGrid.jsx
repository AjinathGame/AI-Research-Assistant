import {
  Brain,
  Cpu,
  Network,
  Database,
  BarChart3,
  Calculator,
  ShieldCheck,
  Cloud,
  PencilRuler,
  Plus,
  X,
  Loader2,
  Trash2,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getTechnologies,
  createTechnology,
  deleteTechnology,
} from "../../api/technologyApi";

const technologyStyles = {
  "Artificial Intelligence": {
    icon: Brain,
    color: "bg-blue-100 text-blue-600",
  },

  // "Machine Learning": {
  //   icon: Cpu,
  //   color: "bg-green-100 text-green-600",
  // },

  // Networking: {
  //   icon: Network,
  //   color: "bg-purple-100 text-purple-600",
  // },

  Database: {
    icon: Database,
    color: "bg-orange-100 text-orange-600",
  },

  Statistics: {
    icon: BarChart3,
    color: "bg-pink-100 text-pink-600",
  },

  Probability: {
    icon: Calculator,
    color: "bg-cyan-100 text-cyan-600",
  },

  Testing: {
    icon: ShieldCheck,
    color: "bg-red-100 text-red-600",
  },

  "AWS Cloud": {
    icon: Cloud,
    color: "bg-yellow-100 text-yellow-600",
  },

  "Design Theory": {
    icon: PencilRuler,
    color: "bg-indigo-100 text-indigo-600",
  },
};

const technologiesToRemove = [
  "New Data Science",
  "marathi",
  "new Language",
  "synopsis",
];

export default function TechnologyGrid() {
  const navigate = useNavigate();

  const [technologies, setTechnologies] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [technologyName, setTechnologyName] =
    useState("");

  const [technologyDescription, setTechnologyDescription] =
    useState("");

  const [creating, setCreating] = useState(false);

  const [deletingId, setDeletingId] =
    useState(null);

  useEffect(() => {
    loadTechnologies();
  }, []);

  const loadTechnologies = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getTechnologies();

      const filteredTechnologies =
        (result.data || []).filter(
          (technology) =>
            !technologiesToRemove.includes(
              technology.name
            )
        );

      setTechnologies(filteredTechnologies);
    } catch (error) {
      console.error(
        "Technology API Error:",
        error
      );

      setError(
        error.message ||
          "Failed to load technologies"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleExplore = (technology) => {
    navigate(
      `/technology/${technology._id}`
    );
  };

  const openCreateModal = () => {
    setTechnologyName("");
    setTechnologyDescription("");
    setError("");
    setShowCreateModal(true);
  };

  const closeCreateModal = () => {
    if (creating) return;

    setShowCreateModal(false);
    setTechnologyName("");
    setTechnologyDescription("");
  };

  const handleCreateTechnology = async () => {
    const name = technologyName.trim();
    const description =
      technologyDescription.trim();

    if (!name) {
      setError("Technology name is required.");
      return;
    }

    try {
      setCreating(true);
      setError("");

      const result =
        await createTechnology({
          name,
          description,
        });

      const newTechnology =
        result.data;

      setTechnologies((current) => [
        ...current,
        newTechnology,
      ]);

      closeCreateModal();
    } catch (error) {
      console.error(
        "Create Technology Error:",
        error
      );

      setError(
        error.message ||
          "Failed to create technology"
      );
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteTechnology = async (
    technology
  ) => {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${technology.name}"?`
      );

    if (!confirmed) return;

    try {
      setDeletingId(
        technology._id
      );

      setError("");

      await deleteTechnology(
        technology._id
      );

      setTechnologies((current) =>
        current.filter(
          (item) =>
            item._id !==
            technology._id
        )
      );
    } catch (error) {
      console.error(
        "Delete Technology Error:",
        error
      );

      setError(
        error.message ||
          "Failed to delete technology"
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <section className="mt-8 lg:mt-12">
        <div className="mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Technologies
          </h2>

          <p className="mt-2 text-sm sm:text-base text-gray-500">
            Browse your uploaded study materials.
          </p>
        </div>

        <div className="flex items-center justify-center py-16">
          <Loader2
            size={40}
            className="animate-spin text-indigo-600"
          />
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="mt-8 lg:mt-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Technologies
            </h2>

            <p className="mt-2 text-sm sm:text-base text-gray-500">
              Browse your uploaded study materials.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition cursor-pointer"
          >
            <Plus size={19} />
            Add Technology
          </button>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {technologies.length === 0 ? (
          <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-10 text-center">
            <Brain
              size={50}
              className="mx-auto text-gray-300"
            />

            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              No technologies available
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Create your first technology.
            </p>

            <button
              onClick={openCreateModal}
              className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer"
            >
              <Plus size={17} />
              Add Technology
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {technologies.map(
              (technology) => {
                const style =
                  technologyStyles[
                    technology.name
                  ] || {
                    icon: Brain,
                    color:
                      "bg-gray-100 text-gray-600",
                  };

                const Icon =
                  style.icon;

                return (
                  <div
                    key={
                      technology._id
                    }
                    className="relative bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center ${style.color}`}
                      >
                        <Icon
                          size={28}
                        />
                      </div>

                      <button
                        onClick={() =>
                          handleDeleteTechnology(
                            technology
                          )
                        }
                        disabled={
                          deletingId ===
                          technology._id
                        }
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer disabled:opacity-50"
                        title="Delete technology"
                      >
                        {deletingId ===
                        technology._id ? (
                          <Loader2
                            size={17}
                            className="animate-spin"
                          />
                        ) : (
                          <Trash2
                            size={17}
                          />
                        )}
                      </button>
                    </div>

                    <h3 className="mt-4 text-lg font-semibold text-gray-900">
                      {technology.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500 leading-6 line-clamp-2">
                      {technology.description ||
                        "Study materials and documents."}
                    </p>

                    <button
                      onClick={() =>
                        handleExplore(
                          technology
                        )
                      }
                      className="mt-6 cursor-pointer text-indigo-600 font-semibold hover:text-indigo-700 transition"
                    >
                      Explore →
                    </button>
                  </div>
                );
              }
            )}

            <button
              onClick={
                openCreateModal
              }
              className="min-h-[220px] bg-white rounded-2xl border-2 border-dashed border-gray-300 p-5 flex flex-col items-center justify-center hover:border-indigo-400 hover:bg-indigo-50/30 transition cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center">
                <Plus
                  size={30}
                  className="text-indigo-600"
                />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Add Technology
              </h3>

              <p className="mt-1 text-sm text-gray-500 text-center">
                Create a new technology manually
              </p>
            </button>
          </div>
        )}
      </section>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Create New Technology
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Add a technology to your knowledge platform.
                </p>
              </div>

              <button
                onClick={
                  closeCreateModal
                }
                disabled={creating}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer disabled:opacity-50"
              >
                <X size={21} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technology Name
                </label>

                <input
                  type="text"
                  value={
                    technologyName
                  }
                  onChange={(e) =>
                    setTechnologyName(
                      e.target.value
                    )
                  }
                  placeholder="Enter technology name"
                  disabled={creating}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>

                <textarea
                  value={
                    technologyDescription
                  }
                  onChange={(e) =>
                    setTechnologyDescription(
                      e.target.value
                    )
                  }
                  placeholder="Enter technology description"
                  rows={4}
                  disabled={creating}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={
                  closeCreateModal
                }
                disabled={creating}
                className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={
                  handleCreateTechnology
                }
                disabled={
                  !technologyName.trim() ||
                  creating
                }
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {creating && (
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                )}

                {creating
                  ? "Creating..."
                  : "Create Technology"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}