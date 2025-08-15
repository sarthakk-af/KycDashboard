"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import CategoriesCard from "@/components/CategoriesCard";
import PanStats from "@/components/PanStats";
import Tabs from "@/components/Tabs";
import KycDashboard from "@/components/KycDashboard";
import { SkeletonCard, SkeletonChart } from "@/components/Skeletons";
import { fetchDashboard } from "@/lib/api";

export default function Page() {
  const [collapsed, setCollapsed] = useState(false);
  const [range, setRange] = useState("today");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchDashboard({ range, from: customFrom, to: customTo })
      .then(setData)
      .finally(() => setLoading(false));
  }, [range, customFrom, customTo]);

  return (
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-black">
      <div className="flex">
        <aside
          className={`hidden md:block sticky top-0 h-screen transition-all duration-300 ${
            collapsed ? "w-16" : "w-64"
          }`}
        >
          <Sidebar collapsed={collapsed} />
        </aside>

        <main className="flex-1 flex flex-col min-w-0">
          <Topbar />

          <div className="p-4 md:p-6 space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <Tabs
                range={range}
                setRange={setRange}
                customFrom={customFrom}
                setCustomFrom={setCustomFrom}
                customTo={customTo}
                setCustomTo={setCustomTo}
              />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <section className="xl:col-span-2 space-y-6">
                <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-6">
                  <KycDashboard />
                </div>
              </section>

              <aside className="space-y-6">
                <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-6">
                  {loading ? (
                    <SkeletonCard />
                  ) : (
                    <CategoriesCard categories={data?.categories} />
                  )}
                </div>

                <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-6">
                  {loading ? (
                    <div className="space-y-6">
                      <SkeletonChart />
                      <div className="flex flex-col divide-y divide-gray-200 dark:divide-neutral-800 rounded-xl">
                        <div className="py-4">
                          <SkeletonCard />
                        </div>
                        <div className="py-4">
                          <SkeletonCard />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <PanStats data={data} />
                  )}
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
