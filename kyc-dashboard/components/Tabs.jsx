"use client";

export default function HeaderTabs({
  range,
  setRange,
  customFrom,
  setCustomFrom,
}) {
  return (
    <div className="flex items-start justify-between w-full mb-6">
      {/* Title */}
      <div>
        <h2 className="text-5xl font-semibold text-gray-900 dark:text-white">
          Axis MF
        </h2>
        <p className="text-gray-400 dark:text-gray-500 text-xl">
          Home {" > "} Dashboard
        </p>
      </div>

      {/* Buttons + Date */}
      <div className="flex items-center gap-3">
        {/* Range buttons */}
        <div className="flex items-center gap-2 p-1 rounded-full border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900">
          <button
            onClick={() => setRange("today")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition 
              ${
                range === "today"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 dark:text-gray-300"
              }`}
          >
            Today
          </button>
          <button
            onClick={() => setRange("month")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition 
              ${
                range === "month"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 dark:text-gray-300"
              }`}
          >
            This Month
          </button>
          <button
            onClick={() => setRange("custom")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition 
              ${
                range === "custom"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 dark:text-gray-300"
              }`}
          >
            Custom
          </button>
        </div>

        {/* Date Picker */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900">
          <input
            type="date"
            value={customFrom}
            onChange={(e) => setCustomFrom(e.target.value)}
            className="outline-none bg-transparent text-gray-700 dark:text-gray-300"
          />
        </div>
      </div>
    </div>
  );
}
