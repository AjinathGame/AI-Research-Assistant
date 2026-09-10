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

import ConfirmModal from "../common/ConfirmModal";

const technologyStyles = {
  "Artificial Intelligence": {
    icon: Brain,
    color: "bg-blue-100 text-blue-600",
  },

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

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    technology: null,
  });

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

      setShowCreateModal(false);
      setTechnologyName("");
      setTechnologyDescription("");
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

  const openDeleteModal = (technology) => {
    if (!technology?._id) {
      setError(
        "Technology ID is not available."
      );
      return;
    }

    setError("");

    setConfirmModal({
      isOpen: true,
      technology,
    });
  };

  const closeConfirmModal = () => {
    if (deletingId) return;

    setConfirmModal({
      isOpen: false,
      technology: null,
    });
  };

  const handleConfirmDelete = async () => {
    const technology =
      confirmModal.technology;

    if (!technology?._id) {
      setError(
        "Technology ID is not available."
      );

      setConfirmModal({
        isOpen: false,
        technology: null,
      });

      return;
    }

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

      setConfirmModal({
        isOpen: false,
        technology: null,
      });
    } catch (error) {
      console.error(
        "Delete Technology Error:",
        error
      );

      setError(
        error.message ||
          "Failed to delete technology"
      );

      setConfirmModal({
        isOpen: false,
        technology: null,
      });
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <section className="mt-8 lg:mt-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 lg:text-3xl">
            Technologies
          </h2>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
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
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 lg:text-3xl">
              Technologies
            </h2>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Browse your uploaded study materials.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            <Plus size={19} />
            Add Technology
          </button>
        </div>

        {error && (
          <div className="mb-6 flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
              className="cursor-pointer rounded-lg p-1 text-red-400 transition hover:bg-red-100 hover:text-red-600"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {technologies.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
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
              type="button"
              onClick={openCreateModal}
              className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
            >
              <Plus size={17} />
              Add Technology
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                    className="relative rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-xl ${style.color}`}
                      >
                        <Icon size={28} />
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          openDeleteModal(
                            technology
                          )
                        }
                        disabled={
                          deletingId ===
                          technology._id
                        }
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
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

                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-gray-500">
                      {technology.description ||
                        "Study materials and documents."}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        handleExplore(
                          technology
                        )
                      }
                      className="mt-6 cursor-pointer font-semibold text-indigo-600 transition hover:text-indigo-700"
                    >
                      Explore →
                    </button>
                  </div>
                );
              }
            )}

            <button
              type="button"
              onClick={
                openCreateModal
              }
              className="min-h-[220px] cursor-pointer flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white p-5 transition hover:border-indigo-400 hover:bg-indigo-50/30"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-50">
                <Plus
                  size={30}
                  className="text-indigo-600"
                />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Add Technology
              </h3>

              <p className="mt-1 text-center text-sm text-gray-500">
                Create a new technology manually
              </p>
            </button>
          </div>
        )}
      </section>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Create New Technology
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Add a technology to your knowledge platform.
                </p>
              </div>

              <button
                type="button"
                onClick={
                  closeCreateModal
                }
                disabled={creating}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={21} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
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
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
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
                  className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={
                  closeCreateModal
                }
                disabled={creating}
                className="cursor-pointer rounded-xl border border-gray-300 px-4 py-2.5 font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  handleCreateTechnology
                }
                disabled={
                  !technologyName.trim() ||
                  creating
                }
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
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

      <ConfirmModal
        isOpen={
          confirmModal.isOpen
        }
        onClose={
          closeConfirmModal
        }
        onConfirm={
          handleConfirmDelete
        }
        title="Delete Technology"
        message={`Are you sure you want to permanently delete "${
          confirmModal.technology
            ?.name || "this technology"
        }"? This action cannot be undone.`}
        confirmText="Delete Technology"
        cancelText="Cancel"
        type="danger"
        loading={
          deletingId !== null
        }
        itemName={
          confirmModal.technology
            ?.name || ""
        }
      />
    </>
  );
}