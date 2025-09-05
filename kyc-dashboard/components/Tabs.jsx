"use client";
import { useRef } from "react";
import { Calendar } from "lucide-react";

// Helper function to format the date string
const formatDate = (dateString) => {
  if (!dateString) return "Select a Date";
  const date = new Date(dateString + 'T00:00:00Z');
  return date.toLocaleDateString("en-GB", {
    day: 'numeric', month: 'short', year: 'numeric'
  });
};

export default function HeaderTabs({
  range,
  setRange,
  customFrom,
  setCustomFrom,
  customTo,
  setCustomTo,
  singleDate,
  setSingleDate,
}) {
  const today = new Date();
  const maxDate = today.toISOString().split("T")[0];
  const minDate = new Date(today.getFullYear(), 0, 1).toISOString().split("T")[0];

  const dateInputRef = useRef(null);

  const handleDateContainerClick = () => {
    dateInputRef.current?.showPicker();
  };

  return (
    <div className="flex flex-col md:flex-row items-start justify-between w-full gap-4">
      {/* Title */}
      <div>
        <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 dark:text-white">
          Axis MF
        </h2>
        <p className="text-gray-400 dark:text-gray-500 text-lg md:text-xl">
          Home {" > "} Dashboard
        </p>
      </div>

      {/* Buttons + Date */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full md:w-auto">
        {/* Range buttons */}
        <div className="flex items-center justify-center gap-1 p-1 rounded-full border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900">
          {["today", "month", "custom"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-2 rounded-full text-sm font-medium transition capitalize flex-1 ${
                range === r
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              {r === 'month' ? 'This Month' : r}
            </button>
          ))}
        </div>

        {/* Single Date Picker */}
        <div
          onClick={handleDateContainerClick}
          className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 cursor-pointer"
        >
          <Calendar size={16} className="text-gray-500" />
          <span className={`text-sm ${singleDate && range === 'date' ? "text-gray-800 dark:text-gray-200" : "text-gray-400"}`}>
            {formatDate(singleDate)}
          </span>
          <input
            ref={dateInputRef}
            type="date"
            value={singleDate}
            onChange={(e) => {
              setSingleDate(e.target.value);
              setRange("date");
            }}
            className="w-0 h-0 p-0 m-0 border-0"
            style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}
            aria-label="Select Date"
            min={minDate}
            max={maxDate}
          />
        </div>

        {/* MODIFICATION: Added the missing custom date range picker back in */}
        {range === "custom" && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900">
            <input
              type="date"
              value={customFrom}
              onChange={(e) => setCustomFrom(e.target.value)}
              className="outline-none bg-transparent text-gray-700 dark:text-gray-300"
              aria-label="From Date"
              min={minDate}
              max={maxDate}
            />
            <span className="text-gray-400">-</span>
            <input
              type="date"
              value={customTo}
              onChange={(e) => setCustomTo(e.target.value)}
              className="outline-none bg-transparent text-gray-700 dark:text-gray-300"
              aria-label="To Date"
              min={minDate}
              max={maxDate}
            />
          </div>
        )}
      </div>
    </div>
  );
}