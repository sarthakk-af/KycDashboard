"use client";

import { useEffect, useState, useRef } from "react";
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Device } from '@capacitor/device';
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

  // --- Refs for PDF Generation ---
  const kycDashboardRef = useRef(null);
  const categoriesCardRef = useRef(null);
  const panStatsRef = useRef(null);

  // --- Centralized Data Fetching ---
  useEffect(() => {
    setLoading(true);
    fetchDashboard({ range, from: customFrom, to: customTo, view, type: solicitedType, date: singleDate })
      .then(setData)
      .finally(() => setLoading(false));
    // MODIFICATION: Changed `to` to `customTo` to fix the ReferenceError
  }, [range, customFrom, customTo, view, solicitedType, singleDate]);

  // --- Universal PDF Generation Logic ---
  const handleGeneratePdf = async () => {
    if (!data) return;
    setIsPdfLoading(true);

    const doc = new jsPDF();
    const fileName = `kyc-report-full-${new Date().toISOString().split("T")[0]}.pdf`;
    
    // --- Header ---
    doc.setFontSize(20);
    doc.text("KYC Dashboard Report", 15, 20);
    doc.setFontSize(10);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 15, 28);

    // --- Summary Table ---
    autoTable(doc, {
        startY: 40,
        head: [['Metric', 'Value']],
        body: [
            ['Total KYCs', data.totalKycs.toLocaleString()],
            ['New KYC', data.kpi.newKyc.count.toLocaleString()],
            ['Modified KYC', data.kpi.modifiedKyc.count.toLocaleString()],
        ],
        theme: 'striped',
        headStyles: { fillColor: '#16a085' },
    });

    // --- KYC Statuses Table ---
    autoTable(doc, {
        startY: (doc).lastAutoTable.finalY + 10,
        head: [['KYC Status', 'Count']],
        body: data.statuses.map(status => [status.label, status.count.toLocaleString()]),
        theme: 'grid',
        headStyles: { fillColor: '#2980b9' },
    });

    // --- Bar Chart Data Table ---
    autoTable(doc, {
        startY: (doc).lastAutoTable.finalY + 10,
        head: [['Period Comparison', 'Individual', 'Non-Individual']],
        body: data.bar.map(item => [item.name, item.individual.toLocaleString(), item.nonIndividual.toLocaleString()]),
        theme: 'striped',
        headStyles: { fillColor: '#2c3e50' },
    });

    // --- PAN Data Table ---
    autoTable(doc, {
        startY: (doc).lastAutoTable.finalY + 10,
        head: [['PAN Data Point', 'Value']],
        body: [
            ['Solicited (With Image)', data.panData.panSolicited.withImage.toLocaleString()],
            ['Solicited (Without Image)', data.panData.panSolicited.withoutImage.toLocaleString()],
            ['Solicited (KFin KRA)', data.panData.panSolicited.kfinKRA.toLocaleString()],
            ['Received (With Image)', data.panData.dataReceived.withImage.toLocaleString()],
            ['Received (Without Image)', data.panData.dataReceived.withoutImage.toLocaleString()],
            ['Received (KFin KRA)', data.panData.dataReceived.kfinKRA.toLocaleString()],
        ],
        theme: 'grid',
        headStyles: { fillColor: '#f39c12' },
    });

    // --- Donut Data Table ---
    autoTable(doc, {
        startY: (doc).lastAutoTable.finalY + 10,
        head: [['PAN Statistics', 'Value']],
        body: [
            ['Solicited', data.donut.solicited.toLocaleString()],
            ['Received', data.donut.received.toLocaleString()],
            ['Consumed', data.donut.consumed.toLocaleString()],
            ['Pending', data.donut.pending.toLocaleString()],
        ],
        theme: 'striped',
        headStyles: { fillColor: '#8e44ad' },
    });

    // --- Platform-specific saving logic ---
    try {
      const info = await Device.getInfo();
      if (info.platform !== 'web') {
        const pdfData = doc.output('datauristring').split(',')[1];
        await Filesystem.writeFile({
            path: fileName,
            data: pdfData,
            directory: Directory.Documents,
        });
        alert(`PDF saved to Documents folder as ${fileName}`);
      } else {
        doc.save(fileName);
      }
    } catch (e) {
      console.error("Unable to save PDF", e);
      alert("Error saving file. Attempting web download.");
      doc.save(fileName);
    }

    setIsPdfLoading(false);
  };

  // --- The rest of your component remains the same ---
  return (
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-black">
      <div className="flex">
        <aside className="hidden md:block sticky top-0 h-screen transition-all duration-300 w-44">
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
                ref={kycDashboardRef}
                className="lg:col-span-2 space-y-6"
              >
                {loading ? (
                  <SkeletonChart />
                ) : (
                  <KycDashboard data={data} view={view} setView={setView} />
                )}
              </section>
              <aside className="space-y-6">
                <div
                  ref={categoriesCardRef}
                  className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-6"
                >
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
                <div
                  ref={panStatsRef}
                  className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-6"
                >
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