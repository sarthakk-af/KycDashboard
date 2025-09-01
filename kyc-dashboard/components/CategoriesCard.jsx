import { useState } from "react";

export default function CategoriesCard() {
  const [view, setView] = useState("individual");

  // Sample data
  const dummyData = {
    individual: {
      RI: { solicited: 90, unsolicited: 75 },
      NRI: { solicited: 55, unsolicited: 45 },
    },
    nonIndividual: {
      RI: { solicited: 65, unsolicited: 50 },
      NRI: { solicited: 40, unsolicited: 30 },
    },
  };

  const data = dummyData[view];

  const Bar = ({ value, color }) => (
    <div className="h-1.5 w-full bg-blue-50 dark:bg-neutral-700 rounded-full overflow-hidden">
      <div
        className={`${color} h-full rounded-full`}
        style={{ width: `${value}%` }}
      />
    </div>
  );

  return (
    <div className="bg-white dark:bg-neutral-800 p-5 rounded-2xl shadow-sm transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="font-semibold text-lg text-gray-900 dark:text-gray-100">
          Categories
        </div>
        <div className="flex bg-gray-100 dark:bg-neutral-700 rounded-full p-1">
          <button
            onClick={() => setView("individual")}
            className={`px-3 py-1 rounded-full text-sm font-medium transition ${
              view === "individual"
                ? "bg-white dark:bg-neutral-600 shadow-sm"
                : ""
            }`}
          >
            Individual
          </button>
          <button
            onClick={() => setView("nonIndividual")}
            className={`px-3 py-1 rounded-full text-sm font-medium transition ${
              view === "nonIndividual"
                ? "bg-white dark:bg-neutral-600 shadow-sm"
                : ""
            }`}
          >
            Non Individual
          </button>
        </div>
      </div>

      {/* RI */}
      <div className="mb-6">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">RI</div>
        <div className="space-y-2">
          <Bar value={data.RI.solicited} color="bg-blue-800" />
          <Bar value={data.RI.unsolicited} color="bg-blue-400" />
        </div>
      </div>

      {/* NRI */}
      <div>
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">NRI</div>
        <div className="space-y-2">
          <Bar value={data.NRI.solicited} color="bg-blue-800" />
          <Bar value={data.NRI.unsolicited} color="bg-blue-400" />
        </div>
      </div>
    </div>
  );
}
