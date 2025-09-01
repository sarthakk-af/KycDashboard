"use client";

import { useEffect, useState, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import CategoriesCard from "@/components/CategoriesCard";
import PanStats from "@/components/PanStats";
import Tabs from "@/components/Tabs";
import KycDashboard from "@/components/KycDashboard";
import { SkeletonCard, SkeletonChart } from "@/components/Skeletons";
import { fetchDashboard } from "@/lib/api";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


export default function Page() {
  // --- Centralized State ---
  const [range, setRange] = useState("today");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  
  const [view, setView] = useState("individual");
  const [solicitedType, setSolicitedType] = useState("solicited");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPdfLoading, setIsPdfLoading] = useState(false);

  // --- Refs for PDF Generation ---
  const kycDashboardRef = useRef(null);
  const categoriesCardRef = useRef(null);
  const panStatsRef = useRef(null);

  // --- Centralized Data Fetching ---
  useEffect(() => {
    setLoading(true);
    fetchDashboard({ range, from: customFrom, to: customTo, view, type: solicitedType })
      .then(setData)
      .finally(() => setLoading(false));
  }, [range, customFrom, customTo, view, solicitedType]);

  // --- PDF Generation Logic ---
  const handleGeneratePdf = async () => {
    setIsPdfLoading(true);
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const contentWidth = pageWidth - margin * 2;

    pdf.text("KYC Dashboard Report", margin, margin + 5);
    let yPos = margin + 15;

    const addImageToPdf = async (element, y) => {
      if (!element) return y;
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const imgHeight = (canvas.height * contentWidth) / canvas.width;
      if (y + imgHeight > pageHeight - margin) {
        pdf.addPage();
        y = margin;
      }
      pdf.addImage(imgData, "PNG", margin, y, contentWidth, imgHeight);
      return y + imgHeight + 10;
    };

    yPos = await addImageToPdf(kycDashboardRef.current, yPos);
    yPos = await addImageToPdf(categoriesCardRef.current, yPos);
    await addImageToPdf(panStatsRef.current, yPos);
    
    pdf.save(`kyc-dashboard-report-${new Date().toISOString().split('T')[0]}.pdf`);
    setIsPdfLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-black">
      <div className="flex">
        <aside
          // --- MODIFICATION: Changed width to w-44 to match the Sidebar component ---
          className={`hidden md:block sticky top-0 h-screen transition-all duration-300 w-44`}
        >
          <Sidebar />
        </aside>

        <main className="flex-1 flex flex-col min-w-0">
          <Topbar onGeneratePdf={handleGeneratePdf} isPdfLoading={isPdfLoading} loading={loading} />

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
              <section ref={kycDashboardRef} className="xl:col-span-2 space-y-6">
                <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-6">
                  {loading ? <SkeletonChart /> : <KycDashboard data={data} view={view} setView={setView} />}
                </div>
              </section>

              <aside className="space-y-6">
                <div ref={categoriesCardRef} className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-6">
                  {loading ? (
                    <SkeletonCard />
                  ) : (
                    <CategoriesCard categories={data?.categories} view={view} setView={setView} />
                  )}
                </div>

                <div ref={panStatsRef} className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-6">
                  {loading ? (
                    <div className="space-y-6">
                      <SkeletonChart />
                    </div>
                  ) : (
                    <PanStats 
                      panData={data?.panData} 
                      donutData={data?.donut}
                      totalKycs={data?.totalKycs}
                      solicitedType={solicitedType}
                      setSolicitedType={setSolicitedType}
                      personType={view}
                      setPersonType={setView}
                    />
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
