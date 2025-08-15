"use client";

export default function HeaderTabs({
  range,
  setRange,
  customFrom,
  setCustomFrom,
}) {
  const Btn = ({ val, children }) => (
    <button
      onClick={() => setRange(val)}
      className={`px-4 py-2 rounded-full text-sm transition
        ${range === val
          ? "bg-blue-600 text-white"
          : "bg-white text-gray-600 border border-gray-300"
        }`}
    >
      {children}
    </button>
  );

  return (

    
    <div className="flex items-start justify-between w-full mb-6">
      <div>
        <h2 className="text-5xl font-semibold">Axis MF</h2>
        <p className="text-gray-400 text-xl">Home {'>'} Dashboard</p>
      </div>

      <div className="flex items-center gap-3">
  <div className="flex items-center gap-2 p-1 rounded-full border border-gray-300 bg-white">
    <button
      onClick={() => setRange("today")}
      className={`px-5 py-2 rounded-full text-sm font-medium transition 
        ${range === "today" ? "bg-blue-600 text-white" : "text-gray-600"}`}
    >
      Today
    </button>
    <button
      onClick={() => setRange("month")}
      className={`px-5 py-2 rounded-full text-sm font-medium transition 
        ${range === "month" ? "bg-blue-600 text-white" : "text-gray-600"}`}
    >
      This Month
    </button>
    <button
      onClick={() => setRange("custom")}
      className={`px-5 py-2 rounded-full text-sm font-medium transition 
        ${range === "custom" ? "bg-blue-600 text-white" : "text-gray-600"}`}
    >
      Custom
    </button>
  </div>

  <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 bg-white">
    <input
      type="date"
      value={customFrom}
      onChange={(e) => setCustomFrom(e.target.value)}
      className="outline-none bg-transparent"
    />
  </div>
</div>

    </div>
  );
}
