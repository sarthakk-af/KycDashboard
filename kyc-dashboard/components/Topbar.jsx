"use client";
import { Search, Bell, Moon, Sun, FileDown, ChevronDown, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function Topbar({ onGeneratePdf, isPdfLoading, loading }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <header className="sticky top-0 z-20 w-full bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800">
      <div className="w-full px-4 md:px-6 py-3 flex items-center justify-between gap-4">
        {/* Left Section: Title */}
        <div className="flex items-center">
          {/* MODIFICATION: Made title smaller for mobile */}
          <h1 className="text-xl md:text-2xl font-bold">Dashboard</h1>
        </div>

        {/* Center Section: Search Bar - MODIFICATION: Hidden on screens smaller than large */}
        <div className="hidden lg:flex flex-1 justify-center px-8">
          <div className="relative w-full max-w-md">
            <input
              className="w-full rounded-full border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Search Intermediaries"
            />
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        {/* Right Section: Actions & User Profile */}
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors" aria-label="Notifications">
            <Bell size={18} />
          </button>
          <button
            onClick={onGeneratePdf}
            disabled={isPdfLoading || loading}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Generate PDF"
          >
            {isPdfLoading ? <Loader2 size={18} className="animate-spin" /> : <FileDown size={18} />}
          </button>
          
          <div className="flex items-center gap-2 pl-2">
            <img
              src="https://placehold.co/40x40/E2E8F0/4A5568?text=SG"
              className="h-8 w-8 md:h-10 md:w-10 rounded-full"
              alt="avatar"
            />
            {/* MODIFICATION: Hide text on smaller screens */}
            <div className="hidden md:block text-sm">
              <div className="font-medium">Sarthak Gupta</div>
              <div className="text-xs text-gray-500">Aug 15, 2025</div>
            </div>
             <ChevronDown size={16} className="text-gray-400 cursor-pointer ml-1"/>
          </div>
        </div>
      </div>
    </header>
  );
}