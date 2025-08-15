"use client";
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Image, ImageOff } from "lucide-react";

const CHART_COLORS = ["#005B66", "#0D3B66", "#2EA3B7", "#FF6B6B"];
const LABELS = ["No Of PANs Solicited", "Received", "Consumed", "Pending"];

const StatRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-2 text-sm">
    {icon}
    {label}
    <span className="ml-auto font-semibold">{value}</span>
  </div>
);

export default function PanStats() {
  // Dummy data for all combinations
  const [view, setView] = useState("individual");

  const data = {
    solicited: {
      individual: {
        totalKycs: 1200,
        donut: { solicited: 500, received: 400, consumed: 300, pending: 200 },
        panData: {
          panSolicited: { kfinKRA: 200, withImage: 150, withoutImage: 50 },
          dataReceived: { kfinKRA: 180, withImage: 140, withoutImage: 40 },
        },
      },
      "non individual": {
        totalKycs: 900,
        donut: { solicited: 300, received: 250, consumed: 200, pending: 150 },
        panData: {
          panSolicited: { kfinKRA: 120, withImage: 80, withoutImage: 40 },
          dataReceived: { kfinKRA: 100, withImage: 70, withoutImage: 30 },
        },
      },
    },
    unsolicited: {
      individual: {
        totalKycs: 800,
        donut: { solicited: 200, received: 150, consumed: 100, pending: 50 },
        panData: {
          panSolicited: { kfinKRA: 90, withImage: 60, withoutImage: 30 },
          dataReceived: { kfinKRA: 80, withImage: 55, withoutImage: 25 },
        },
      },
      "non individual": {
        totalKycs: 600,
        donut: { solicited: 150, received: 120, consumed: 90, pending: 60 },
        panData: {
          panSolicited: { kfinKRA: 70, withImage: 50, withoutImage: 20 },
          dataReceived: { kfinKRA: 65, withImage: 45, withoutImage: 20 },
        },
      },
    },
  };

  const [solicitedType, setSolicitedType] = useState("Solicited");
  const [personType, setPersonType] = useState("Individual");

  const activeData =
    data[solicitedType.toLowerCase()][personType.toLowerCase()] || {};

  const chartValues = [
    activeData?.donut?.solicited || 0,
    activeData?.donut?.received || 0,
    activeData?.donut?.consumed || 0,
    activeData?.donut?.pending || 0,
  ];
  const total = activeData?.totalKycs || 0;

  const chartData = chartValues.map((val, i) => [
    { name: LABELS[i], value: val },
    { name: "Remaining", value: Math.max(total - val, 0) },
  ]);

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="flex items-center justify-between mb-4">
        {/* Left tabs */}
        <div className="flex gap-4">
          {["Solicited", "Unsolicited"].map((t) => (
            <button
              key={t}
              onClick={() => setSolicitedType(t)}
              className={`pb-1 border-b-2 text-sm ${
                solicitedType === t
                  ? "border-black font-semibold"
                  : "border-transparent text-gray-500"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        {/* Right pills */}

        <div className="flex bg-gray-100 rounded-full p-1">
          {["Individual", "Non Individual"].map((t) => (
            <button
              key={t}
              onClick={() => setPersonType(t)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                personType === t ? "bg-white shadow-sm" : ""
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="relative h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              {chartData.map((ring, idx) => (
                <Pie
                  key={idx}
                  data={ring}
                  dataKey="value"
                  innerRadius={70 + idx * 15}
                  outerRadius={80 + idx * 15}
                  startAngle={90}
                  endAngle={-270}
                >
                  {ring.map((entry, i) => (
                    <Cell
                      key={i}
                      fill={
                        entry.name === "Remaining"
                          ? "#F3F4F6"
                          : CHART_COLORS[idx]
                      }
                    />
                  ))}
                </Pie>
              ))}
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="text-xs opacity-70">Total</div>
              <div className="text-2xl font-bold">{total.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {LABELS.map((label, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: CHART_COLORS[idx] }}
              ></div>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 divide-y">
        <div className="py-4">
          <div className="flex items-center justify-between font-medium">
            No. of PANs Solicited
            <span className="text-lg font-bold">
              {(
                (activeData?.panData?.panSolicited?.withImage || 0) +
                (activeData?.panData?.panSolicited?.withoutImage || 0)
              ).toLocaleString()}
            </span>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-3 text-sm">
            <StatRow
              icon={<span className="text-xs font-bold">📄</span>}
              label="KFin KRA"
              value={activeData?.panData?.panSolicited?.kfinKRA || 0}
            />
            <StatRow
              icon={<Image size={16} />}
              label="With Image"
              value={activeData?.panData?.panSolicited?.withImage || 0}
            />
            <StatRow
              icon={<ImageOff size={16} />}
              label="Without Image"
              value={activeData?.panData?.panSolicited?.withoutImage || 0}
            />
          </div>
        </div>

        <div className="py-4">
          <div className="flex items-center justify-between font-medium">
            Data Received
            <span className="text-lg font-bold">
              {(
                (activeData?.panData?.dataReceived?.withImage || 0) +
                (activeData?.panData?.dataReceived?.withoutImage || 0)
              ).toLocaleString()}
            </span>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-3 text-sm">
            <StatRow
              icon={<span className="text-xs font-bold">📄</span>}
              label="KFin KRA"
              value={activeData?.panData?.dataReceived?.kfinKRA || 0}
            />
            <StatRow
              icon={<Image size={16} />}
              label="With Image"
              value={activeData?.panData?.dataReceived?.withImage || 0}
            />
            <StatRow
              icon={<ImageOff size={16} />}
              label="Without Image"
              value={activeData?.panData?.dataReceived?.withoutImage || 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
