"use client";

export default function HeaderTabs({
  range,
  setRange,
  customFrom,
  setCustomFrom,
  customTo,
  setCustomTo,
}) {
  // --- DATE CONSTRAINT LOGIC ---
  // Get today's date to prevent selecting future dates.
  const today = new Date();
  
  // Format today's date into "YYYY-MM-DD" format for the input's `max` attribute.
  const maxDate = today.toISOString().split("T")[0];

  // Set the earliest selectable date to January 1st of the current year.
  const minDate = new Date(today.getFullYear(), 0, 1).toISOString().split("T")[0];
  // --- END OF LOGIC ---

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

        {/* Conditionally render date pickers */}
        {range === "custom" && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900">
            <input
              type="date"
              value={customFrom}
              onChange={(e) => setCustomFrom(e.target.value)}
              className="outline-none bg-transparent text-gray-700 dark:text-gray-300"
              aria-label="From Date"
              min={minDate} // Set the minimum selectable date
              max={maxDate} // Set the maximum selectable date
            />
            <span className="text-gray-400">-</span>
            <input
              type="date"
              value={customTo}
              onChange={(e) => setCustomTo(e.target.value)}
              className="outline-none bg-transparent text-gray-700 dark:text-gray-300"
              aria-label="To Date"
              min={minDate} // Set the minimum selectable date
              max={maxDate} // Set the maximum selectable date
            />
          </div>
        )}
      </div>
    </div>
  );
}