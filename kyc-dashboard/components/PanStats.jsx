"use client";
import { useTheme } from "next-themes"; // <-- IMPORT THE THEME HOOK
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Image, ImageOff } from "lucide-react";

const CHART_COLORS = ["#005B66", "#0D3B66", "#2EA3B7", "#FF6B6B"];
const LABELS = ["No Of PANs Solicited", "Received", "Consumed", "Pending"];

const StatRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
    {icon}
    {label}
    <span className="ml-auto font-semibold">{value}</span>
  </div>
);

export default function PanStats({ panData, donutData, totalKycs, solicitedType, setSolicitedType, personType, setPersonType }) {
  const { theme } = useTheme(); // <-- GET THE CURRENT THEME

  const chartValues = [
    donutData?.solicited || 0,
    donutData?.received || 0,
    donutData?.consumed || 0,
    donutData?.pending || 0,
  ];
  const total = totalKycs || 0;

  const chartData = chartValues.map((val, i) => [
    { name: LABELS[i], value: val },
    { name: "Remaining", value: Math.max(total - val, 0) },
  ]);

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow p-4 transition-colors duration-300">
      {/* Header with responsive layout */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
        {/* Left tabs */}
        <div className="flex gap-4">
          {["solicited", "unsolicited"].map((t) => (
            <button
              key={t}
              onClick={() => setSolicitedType(t)}
              className={`pb-1 border-b-2 text-sm transition-colors capitalize ${
                solicitedType === t
                  ? "border-black dark:border-white font-semibold text-gray-900 dark:text-gray-100"
                  : "border-transparent text-gray-500 dark:text-gray-400"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Right pills */}
        <div className="flex bg-gray-100 dark:bg-neutral-700 rounded-full p-1">
          {["individual", "non-individual"].map((t) => (
            <button
              key={t}
              onClick={() => setPersonType(t)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition capitalize ${
                personType === t
                  ? "bg-white dark:bg-neutral-600 shadow-sm text-gray-900 dark:text-gray-100"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              {t.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Chart and Legend with responsive layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="relative h-60 md:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              {chartData.map((ring, idx) => (
                <Pie
                  key={idx}
                  data={ring}
                  dataKey="value"
                  innerRadius={50 + idx * 18}
                  outerRadius={65 + idx * 18}
                  startAngle={90}
                  endAngle={-270}
                  paddingAngle={2}
                >
                  {ring.map((entry, i) => (
                    <Cell
                      key={`cell-${i}`}
                      fill={
                        entry.name === "Remaining"
                          ? "#E5E7EB"
                          : CHART_COLORS[idx]
                      }
                      stroke={theme === 'dark' ? '#171717' : '#fff'}
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
              ))}
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="text-xs opacity-70 text-gray-600 dark:text-gray-400">
                Total
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {total.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {LABELS.map((label, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 text-gray-800 dark:text-gray-200"
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: CHART_COLORS[idx] }}
              ></div>
              <span>{label}</span>
              <span className="ml-auto font-semibold">{chartValues[idx].toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 divide-y divide-gray-200 dark:divide-gray-700">
        {/* PANs Solicited - Responsive grid */}
        <div className="py-4">
          <div className="flex items-center justify-between font-medium text-gray-900 dark:text-gray-100">
            No. of PANs Solicited
            <span className="text-lg font-bold">
              {(
                (panData?.panSolicited?.withImage || 0) +
                (panData?.panSolicited?.withoutImage || 0)
              ).toLocaleString()}
            </span>
          </div>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <StatRow
              icon={<span className="text-xs font-bold">📄</span>}
              label="KFin KRA"
              value={panData?.panSolicited?.kfinKRA || 0}
            />
            <StatRow
              icon={<Image size={16} />}
              label="With Image"
              value={panData?.panSolicited?.withImage || 0}
            />
            <StatRow
              icon={<ImageOff size={16} />}
              label="Without Image"
              value={panData?.panSolicited?.withoutImage || 0}
            />
          </div>
        </div>

        {/* Data Received - Responsive grid */}
        <div className="py-4">
          <div className="flex items-center justify-between font-medium text-gray-900 dark:text-gray-100">
            Data Received
            <span className="text-lg font-bold">
              {(
                (panData?.dataReceived?.withImage || 0) +
                (panData?.dataReceived?.withoutImage || 0)
              ).toLocaleString()}
            </span>
          </div>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <StatRow
              icon={<span className="text-xs font-bold">📄</span>}
              label="KFin KRA"
              value={panData?.dataReceived?.kfinKRA || 0}
            />
            <StatRow
              icon={<Image size={16} />}
              label="With Image"
              value={panData?.dataReceived?.withImage || 0}
            />
            <StatRow
              icon={<ImageOff size={16} />}
              label="Without Image"
              value={panData?.dataReceived?.withoutImage || 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

