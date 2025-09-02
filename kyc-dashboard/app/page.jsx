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
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'; 

export default function Page() {
  // --- Centralized State ---
  const [range, setRange] = useState("today");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [singleDate, setSingleDate] = useState("");

  const [view, setView] = useState("individual");
  const [solicitedType, setSolicitedType] = useState("solicited");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPdfLoading, setIsPdfLoading] = useState(false);

  // --- Data Fetching ---
  useEffect(() => {
    setLoading(true);
    fetchDashboard({ range, from: customFrom, to: customTo, view, type: solicitedType, date: singleDate })
      .then(setData)
      .finally(() => setLoading(false));
  }, [range, customFrom, customTo, view, solicitedType, singleDate]);

  // --- PDF Generation Logic ---
  const handleGeneratePdf = () => {
    if (!data) return;
    setIsPdfLoading(true);

    const doc = new jsPDF();
    const pageTitle = "KYC Dashboard Report";
    const reportDate = `Date: ${new Date().toLocaleDateString()}`;
    const selectedRange = `Range: ${range === 'month' ? 'This Month' : range}`;

    // --- Header ---
    doc.setFontSize(20);
    doc.text(pageTitle, 15, 20);
    doc.setFontSize(10);
    doc.text(reportDate, 15, 28);
    doc.text(selectedRange, 15, 34);

    // --- Summary Table ---
    // MODIFICATION 2: Call autoTable as a function, passing `doc` as the first argument
    autoTable(doc, {
        startY: 45,
        head: [['Metric', 'Value']],
        body: [
            ['Total KYCs', data.totalKycs.toLocaleString()],
            ['New KYC', data.kpi.newKyc.count.toLocaleString()],
            ['Modified KYC', data.kpi.modifiedKyc.count.toLocaleString()],
        ],
        theme: 'striped',
        headStyles: { fillColor: [22, 160, 133] },
    });

    // --- KYC Statuses Table ---
    autoTable(doc, {
        // MODIFICATION 3: Use `doc.lastAutoTable.finalY` to correctly position the next table
        startY: (doc).lastAutoTable.finalY + 15,
        head: [['KYC Status', 'Count']],
        body: data.statuses.map(status => [status.label, status.count.toLocaleString()]),
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185] },
    });

    // --- PAN Data Table ---
    autoTable(doc, {
        startY: (doc).lastAutoTable.finalY + 15,
        head: [['PAN Data Point', 'Value']],
        body: [
            ['PANs Solicited (With Image)', data.panData.panSolicited.withImage.toLocaleString()],
            ['PANs Solicited (Without Image)', data.panData.panSolicited.withoutImage.toLocaleString()],
            ['PANs Solicited (KFin KRA)', data.panData.panSolicited.kfinKRA.toLocaleString()],
            ['Data Received (With Image)', data.panData.dataReceived.withImage.toLocaleString()],
            ['Data Received (Without Image)', data.panData.dataReceived.withoutImage.toLocaleString()],
            ['Data Received (KFin KRA)', data.panData.dataReceived.kfinKRA.toLocaleString()],
        ],
        theme: 'striped',
        headStyles: { fillColor: [243, 156, 18] },
    });
    
    // --- Footer ---
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 25, doc.internal.pageSize.height - 10);
    }
    
    doc.save(`kyc-report-${new Date().toISOString().split("T")[0]}.pdf`);
    setIsPdfLoading(false);
  };


  // --- The rest of your component remains the same ---
  return (
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-black">
      <div className="flex">
        <aside
          className={`hidden md:block sticky top-0 h-screen transition-all duration-300 w-44`}
        >
          <Sidebar />
        </aside>

        <main className="flex-1 flex flex-col min-w-0">
          <Topbar
            onGeneratePdf={handleGeneratePdf}
            isPdfLoading={isPdfLoading}
            loading={loading}
          />

          <div className="p-4 md:p-6 space-y-6">
            <Tabs
              range={range}
              setRange={setRange}
              customFrom={customFrom}
              setCustomFrom={setCustomFrom}
              customTo={customTo}
              setCustomTo={setCustomTo}
              singleDate={singleDate}
              setSingleDate={setSingleDate}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <section
                className="lg:col-span-2 space-y-6"
              >
                {loading ? (
                  <SkeletonChart />
                ) : (
                  <KycDashboard data={data} view={view} setView={setView} />
                )}
              </section>

              <aside className="space-y-6">
                <div>
                  {loading ? (
                    <SkeletonCard />
                  ) : (
                    <CategoriesCard
                      categories={data?.categories}
                      view={view}
                      setView={setView}
                    />
                  )}
                </div>

                <div>
                  {loading ? (
                    <SkeletonChart />
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