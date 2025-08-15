"use client";
import { useState } from "react";
import { LayoutDashboard, FileSpreadsheet, Receipt, Wallet, FileText, Bell } from "lucide-react";
import clsx from "clsx";

const items = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Applications", icon: FileSpreadsheet },
  { name: "Billing", icon: Receipt },
  { name: "Rate Card", icon: Wallet },
  { name: "Agreement Copy", icon: FileText },
  { name: "Notices", icon: Bell }
];

export default function Sidebar({ collapsed=false }) {
  return (
    <aside className={clsx("h-screen sticky top-0 p-3 bg-white dark:bg-neutral-900 border-r border-gray-200 dark:border-neutral-800 transition-all", collapsed ? "w-16" : "w-64")}>
      <div className="flex items-center gap-2 px-2 py-3">
        <div className="h-10 w-10 rounded-xl bg-gray-100 dark:bg-neutral-800 flex items-center justify-center text-sm font-bold">K</div>
        {!collapsed && <span className="text-lg font-semibold">KYC Suite</span>}
      </div>
      <nav className="mt-2 space-y-1">
        {items.map((it, idx) => {
          const Icon = it.icon;
          const active = idx===0;
          return (
            <a key={it.name} className={clsx("flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer", active && "bg-gray-100 dark:bg-neutral-800 font-medium")} >
              <Icon size={18} />
              {!collapsed && <span>{it.name}</span>}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
