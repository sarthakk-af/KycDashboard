"use client";
import { Search, Bell, CalendarDays, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function Topbar({ onToggleSidebar }) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-20 bg-white/80 dark:bg-neutral-900/80 backdrop-blur border-b border-gray-200 dark:border-neutral-800">
      <div className="mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>

        <div className="w-full pr-5 flex justify-end">
          <div className="relative w-full max-w-sm">
            <input
              className="w-full rounded-full border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 pl-10 pr-4 py-2 text-sm"
              placeholder="Search Intermediaries"
            />
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60"
            />
          </div>
        </div>

        <div className="flex items-center pr-10 gap-3">
          <button
            className="btn"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button className="btn" aria-label="Notifications">
            <Bell size={16} />
          </button>
          <div className="flex items-center gap-2">
            <img
              src="https://tse4.mm.bing.net/th/id/OIP.vSuRGgrtiIEx228wtcp_dgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
              className="h-9 w-9 rounded-full"
              alt="avatar"
            />
            <div className="text-sm">
              <div className="font-medium">Sarthak Gupta</div>
              <div className="text-xs opacity-60">Aug 15, 2025</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
