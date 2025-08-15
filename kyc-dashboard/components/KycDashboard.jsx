"use client";
import { useState } from "react";
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

export default function KycDashboard() {
  const kpiData = {
    total: 3456,
    newKyc: { count: 3000, changePct: 12, breakup: { myKRA: 400, interop: 0 } },
    modifiedKyc: {
      count: 456,
      changePct: -10,
      breakup: { myKRA: 400, interop: 56 },
    },
  };

  const chartData = {
    individual: [
      { name: "Individual", today: 360, yesterday: 300 },
      { name: "Non Individual", today: 300, yesterday: 250 },
    ],
    nonIndividual: [
      { name: "Individual", today: 200, yesterday: 180 },
      { name: "Non Individual", today: 150, yesterday: 100 },
    ],
  };

  const statusData = {
    today: {
      individual: [
        { label: "KYC Initiated", count: 234 },
        { label: "Under Process", count: 45 },
        { label: "Registered", count: 350 },
        { label: "Validated", count: 654 },
        { label: "Hold", count: 269 },
        { label: "Docs Pending", count: 100 },
      ],
      nonIndividual: [
        { label: "KYC Initiated", count: 150 },
        { label: "Under Process", count: 30 },
        { label: "Registered", count: 200 },
        { label: "Validated", count: 300 },
        { label: "Hold", count: 100 },
        { label: "Docs Pending", count: 50 },
      ],
    },
    yesterday: {
      individual: [
        { label: "KYC Initiated", count: 200 },
        { label: "Under Process", count: 40 },
        { label: "Registered", count: 300 },
        { label: "Validated", count: 600 },
        { label: "Hold", count: 250 },
        { label: "Docs Pending", count: 90 },
      ],
      nonIndividual: [
        { label: "KYC Initiated", count: 100 },
        { label: "Under Process", count: 25 },
        { label: "Registered", count: 150 },
        { label: "Validated", count: 250 },
        { label: "Hold", count: 80 },
        { label: "Docs Pending", count: 40 },
      ],
    },
  };

  const [timeFilter, setTimeFilter] = useState("today");
  const [typeFilter, setTypeFilter] = useState("individual");
  const [viewMode, setViewMode] = useState("chart");

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
    <div className="flex-1 rounded-[20px] border border-[#E7E7E7] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.05)] p-6 flex items-center gap-6">
      <div className="h-12 w-12 rounded-full flex items-center justify-center" style={{ background: "#2F63F6" }}>
        <Icon size={20} className="text-white" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 font-medium">{title}</span>
          <Badge positive={positive} value={Math.abs(change)} />
        </div>
        <div className="mt-1 text-3xl font-bold">{count.toLocaleString()}</div>
        <div className="mt-1 text-xs text-gray-500 flex gap-4">
          <span><strong>{breakup.myKRA}</strong> My KRA</span>
          <span><strong>{breakup.interop}</strong> Interop</span>
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
    <div className="bg-[#F6F7F8] rounded-[20px] p-4 flex justify-between">
      {items.map((it) => {
        const { icon: Icon, color } = ICONS[it.label] || {};
        return (
          <div key={it.label} className="flex flex-col items-center flex-1">
            <Icon size={22} style={{ color }} />
            <span className="text-xs text-gray-500 mt-2">{it.label}</span>
            <span className="text-xl font-semibold mt-1">{it.count}</span>
          </div>
        );
      })}
    </div>
  );

  const BarComparison = ({ data }) => (
    <div className="rounded-[20px] border border-[#E7E7E7] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.05)] p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-1 justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ background: "#2F63F6" }}></span>
            <span>Today</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ background: "#8CB4FF" }}></span>
            <span>Yesterday</span>
          </div>
        </div>

        <div className="flex items-center rounded-full px-1 py-1 bg-[#F6F7F8] gap-1">
          <button
            onClick={() => setViewMode("chart")}
            className={`h-8 w-8 rounded-full flex items-center justify-center ${ viewMode === "chart" ? "bg-white" : "" }`}
          >
            <BarChart3 size={16} className="text-gray-600" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`h-8 w-8 rounded-full flex items-center justify-center ${ viewMode === "list" ? "bg-white" : "" }`}
          >
            <List size={16} className="text-gray-600" />
          </button>
        </div>
      </div>

      {viewMode === "chart" ? (
        <div className="h-[380px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={0}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip cursor={{ fill: "rgba(0,0,0,0.05)" }} />
              <Bar dataKey="today" fill="#2F63F6" radius={[4, 4, 0, 0]} barSize={50} />
              <Bar dataKey="yesterday" fill="#8CB4FF" radius={[4, 4, 0, 0]} barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="divide-y text-sm">
          {data.map((row) => (
            <div key={row.name} className="flex justify-between py-3">
              <span>{row.name}</span>
              <span className="font-semibold text-[#2F63F6]">{row.today}</span>
              <span className="font-semibold text-[#8CB4FF]">{row.yesterday}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="rounded-[20px] border border-[#E7E7E7] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.05)] p-6 space-y-8 font-['Inter',sans-serif]">
      <div>
        <div className="text-sm text-gray-600">Total KYCs</div>
        <div className="text-4xl font-bold mt-1">{kpiData.total.toLocaleString()}</div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <KpiMini title="New KYC" count={kpiData.newKyc.count} change={kpiData.newKyc.changePct} positive={true} breakup={kpiData.newKyc.breakup} Icon={CheckCircle2} />
          <KpiMini title="Modified KYC" count={kpiData.modifiedKyc.count} change={kpiData.modifiedKyc.changePct} positive={false} breakup={kpiData.modifiedKyc.breakup} Icon={RefreshCcw} />
        </div>
      </div>

      <BarComparison data={chartData[typeFilter]} />

      <div className="flex justify-between items-center">
        {/* Updated Time Filter */}
        <div className="bg-gray-100 rounded-full p-1 flex">
          <button
            onClick={() => setTimeFilter("today")}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition ${
              timeFilter === "today" ? "bg-white shadow-sm" : ""
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setTimeFilter("yesterday")}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition ${
              timeFilter === "yesterday" ? "bg-white shadow-sm" : ""
            }`}
          >
            Yesterday
          </button>
        </div>

        <div className="flex bg-gray-100 rounded-full p-1">
          <button
            onClick={() => setTypeFilter("individual")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              typeFilter === "individual" ? "bg-white shadow-sm" : ""
            }`}
          >
            Individual
          </button>
          <button
            onClick={() => setTypeFilter("nonIndividual")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              typeFilter === "nonIndividual" ? "bg-white shadow-sm" : ""
            }`}
          >
            Non Individual
          </button>
        </div>
      </div>

      <StatusCards items={statusData[timeFilter][typeFilter]} />
    </div>
  );
}