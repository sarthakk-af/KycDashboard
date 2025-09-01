"use client";
import { useState } from "react";
import { useTheme } from "next-themes";
import {
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  RefreshCcw,
  ClipboardList,
  Loader2,
  ShieldCheck,
  PauseCircle,
  FileWarning,
  BarChart3,
  List,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function KycDashboard({ data, view, setView }) {
  const { theme } = useTheme();
  const [viewMode, setViewMode] = useState("chart");
  const [timeFilter, setTimeFilter] = useState("today");

  const { totalKycs, kpi, bar, statuses } = data;

  const Badge = ({ positive, value }) => (
    <span
      className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium ${
        positive ? "bg-[#E9F9ED] text-[#3AC27C]" : "bg-[#FEEBEE] text-[#F75B5B]"
      }`}
    >
      {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
      {value}%
    </span>
  );

  const KpiMini = ({ title, count, change, positive, breakup, Icon }) => (
    <div className="flex-1 rounded-[20px] border border-[#E7E7E7] dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-md p-6 flex items-center gap-6">
      <div
        className="h-12 w-12 rounded-full flex items-center justify-center"
        style={{ background: "#2F63F6" }}
      >
        <Icon size={20} className="text-white" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
            {title}
          </span>
          <Badge positive={positive} value={Math.abs(change)} />
        </div>
        <div className="mt-1 text-3xl font-bold">{count.toLocaleString()}</div>
        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex gap-4">
          <span>
            <strong>{breakup.myKRA}</strong> My KRA
          </span>
          <span>
            <strong>{breakup.interop}</strong> Interop
          </span>
        </div>
      </div>
    </div>
  );

  const ICONS = {
    "KYC Initiated": { icon: ClipboardList, color: "#2F63F6" },
    "Under Process": { icon: Loader2, color: "#FF9800" },
    Registered: { icon: CheckCircle2, color: "#00BCD4" },
    Validated: { icon: ShieldCheck, color: "#4CAF50" },
    Hold: { icon: PauseCircle, color: "#03A9F4" },
    "Docs Pending": { icon: FileWarning, color: "#F44336" },
  };

  const StatusCards = ({ items }) => (
    <div className="bg-[#F6F7F8] dark:bg-neutral-800 rounded-[20px] p-4 grid grid-cols-2 sm:grid-cols-3 lg:flex lg:justify-between gap-4">
      {items.map((it) => {
        const { icon: Icon, color } = ICONS[it.label] || {};
        return (
          <div key={it.label} className="flex flex-col items-center flex-1">
            <Icon size={22} style={{ color }} />
            <span className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
              {it.label}
            </span>
            <span className="text-xl font-semibold mt-1">{it.count}</span>
          </div>
        );
      })}
    </div>
  );

  const BarComparison = ({ data }) => (
     <div className="rounded-[20px] border border-[#E7E7E7] dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-1 justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#2F63F6]"></span>
            <span>Today</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#8CB4FF]"></span>
            <span>Yesterday</span>
          </div>
        </div>

        <div className="flex items-center rounded-full px-1 py-1 bg-gray-100 dark:bg-neutral-700 gap-1">
          <button
            onClick={() => setViewMode("chart")}
            className={`h-8 w-8 rounded-full flex items-center justify-center ${
              viewMode === "chart" ? "bg-white dark:bg-neutral-900" : ""
            }`}
          >
            <BarChart3 size={16} className="text-gray-600 dark:text-gray-300" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`h-8 w-8 rounded-full flex items-center justify-center ${
              viewMode === "list" ? "bg-white dark:bg-neutral-900" : ""
            }`}
          >
            <List size={16} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {viewMode === "chart" ? (
        // --- MODIFICATION START ---
        // Removed the fixed-height wrapper div and applied a height directly to the ResponsiveContainer
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} barGap={0}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip cursor={{ fill: "rgba(0,0,0,0.05)" }} />
            <Bar
              dataKey="individual"
              fill="#2F63F6"
              radius={[4, 4, 0, 0]}
              barSize={50}
              name="Individual"
            />
            <Bar
              dataKey="nonIndividual"
              fill="#8CB4FF"
              radius={[4, 4, 0, 0]}
              barSize={50}
              name="Non Individual"
            />
          </BarChart>
        </ResponsiveContainer>
        // --- MODIFICATION END ---
      ) : (
        <div className="divide-y text-sm">
          {data.map((row) => (
            <div key={row.name} className="flex justify-between py-3">
              <span>{row.name}</span>
              <span className="font-semibold text-[#2F63F6]">{row.individual}</span>
              <span className="font-semibold text-[#8CB4FF]">
                {row.nonIndividual}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* KPIs */}
      <div>
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Total KYCs
        </div>
        <div className="text-4xl font-bold mt-1">
          {totalKycs.toLocaleString()}
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <KpiMini
            title="New KYC"
            count={kpi.newKyc.count}
            change={kpi.newKyc.changePct}
            positive={kpi.newKyc.changePct >= 0}
            breakup={kpi.newKyc.breakup}
            Icon={CheckCircle2}
          />
          <KpiMini
            title="Modified KYC"
            count={kpi.modifiedKyc.count}
            change={kpi.modifiedKyc.changePct}
            positive={kpi.modifiedKyc.changePct >= 0}
            breakup={kpi.modifiedKyc.breakup}
            Icon={RefreshCcw}
          />
        </div>
      </div>

      <BarComparison data={bar} />

      {/* Responsive Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="bg-gray-100 dark:bg-neutral-700 rounded-full p-1 flex">
          <button
            onClick={() => setTimeFilter("today")}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition ${
              timeFilter === "today"
                ? "bg-white dark:bg-neutral-900 shadow-sm"
                : ""
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setTimeFilter("yesterday")}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition ${
              timeFilter === "yesterday"
                ? "bg-white dark:bg-neutral-900 shadow-sm"
                : ""
            }`}
          >
            Yesterday
          </button>
        </div>

        <div className="flex bg-gray-100 dark:bg-neutral-700 rounded-full p-1">
          <button
            onClick={() => setView("individual")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              view === "individual"
                ? "bg-white dark:bg-neutral-900 shadow-sm"
                : ""
            }`}
          >
            Individual
          </button>
          <button
            onClick={() => setView("non-individual")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              view === "non-individual"
                ? "bg-white dark:bg-neutral-900 shadow-sm"
                : ""
            }`}
          >
            Non Individual
          </button>
        </div>
      </div>

      <StatusCards items={statuses} />
    </div>
  );
}
