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
} from "lucide-react";

const technologies = [
  {
    title: "Artificial Intelligence",
    description: "Research papers, notes and AI concepts.",
    icon: Brain,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Machine Learning",
    description: "Models, algorithms and datasets.",
    icon: Cpu,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Networking",
    description: "Protocols, routing and security.",
    icon: Network,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Database",
    description: "SQL, MongoDB and NoSQL concepts.",
    icon: Database,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Statistics",
    description: "Probability, distributions and analysis.",
    icon: BarChart3,
    color: "bg-pink-100 text-pink-600",
  },
  {
    title: "Probability",
    description: "Random variables and Bayes theorem.",
    icon: Calculator,
    color: "bg-cyan-100 text-cyan-600",
  },
  {
    title: "Testing",
    description: "Software testing and quality assurance.",
    icon: ShieldCheck,
    color: "bg-red-100 text-red-600",
  },
  {
    title: "AWS Cloud",
    description: "Cloud computing, EC2, S3, Lambda and cloud services.",
    icon: Cloud,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Design Theory",
    description: "Software design principles, architecture and design patterns.",
    icon: PencilRuler,
    color: "bg-indigo-100 text-indigo-600",
  },
];

export default function TechnologyGrid() {
  return (
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

      </div>

   
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

        {technologies.map((tech) => {
          const Icon = tech.icon;

          return (
            <div
              key={tech.title}
              className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center ${tech.color}`}
              >
                <Icon size={28} />
              </div>

              <h3 className="mt-2 text-lg font-semibold text-gray-900">
                {tech.title}
              </h3>

              <p className="mt-1 text-sm text-gray-500 leading-6">
                {tech.description}
              </p>

              <button className="mt-6 cursor-pointer text-indigo-600 font-semibold hover:text-indigo-700 transition">
                Explore →
              </button>
            </div>
          );
        })}

      </div>

    </section>
  );
}