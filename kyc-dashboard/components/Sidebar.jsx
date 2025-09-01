"use client";
import { useState } from "react";
import { 
  LayoutDashboard, 
  FileSpreadsheet, 
  Receipt, 
  Wallet, 
  FileText, 
  Bell,
  Image as ImageIcon // Using an icon for the logo placeholder
} from "lucide-react";
import clsx from "clsx";

// Sidebar navigation items
const items = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Applications", icon: FileSpreadsheet },
  { name: "Billing", icon: Receipt },
  { name: "Rate Card", icon: Wallet },
  { name: "Agreement Copy", icon: FileText },
  { name: "Notices", icon: Bell },
];

export default function Sidebar() {
  // To keep track of the active item. Defaulting to 'Dashboard' (index 0).
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <aside className="h-screen  sticky top-0 flex flex-col items-center bg-white dark:bg-neutral-900 border-r border-gray-200 dark:border-neutral-800 w-44 py-6">
      
      {/* Logo Section */}
      <div className="flex flex-col items-center gap-2 mb-10">
        <div className="h-12 w-12 rounded-lg bg-gray-100 dark:bg-neutral-800 flex items-center justify-center text-gray-400">
          <ImageIcon size={24} />
        </div>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Logo</span>
      </div>

      {/* Navigation Links */}
      <nav className="w-full flex flex-col items-center gap-2">
        {items.map((item, idx) => {
          const Icon = item.icon;
          const active = idx === activeIndex;

          return (
            <a
              key={item.name}
              href="#"
              onClick={() => setActiveIndex(idx)}
              className={clsx(
                "w-full flex flex-col items-center justify-center py-3 relative transition-colors duration-200",
                {
                  // Styles for the active item
                  "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400": active,
                  // Styles for inactive items
                  "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-800": !active,
                }
              )}
            >
              {/* Active item indicator bar */}
              {active && (
                <div className="absolute left-0 top-0 h-full w-1 bg-blue-600 rounded-r-full"></div>
              )}

              <Icon size={22} />
              <span className="text-xs font-medium mt-1">{item.name}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
