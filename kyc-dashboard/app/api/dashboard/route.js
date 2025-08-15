function mk(base, mult) {
  const round = (n) => Math.round(n * mult);
  const statuses = ["KYC Initiated","Under Process","Registered","Validated","Hold","Docs Pending"];
  return {
    totalKycs: round(base.total),
    kpi: {
      newKyc: { count: round(base.newKyc), changePct: 12, breakup: base.newKycBreakup },
      modifiedKyc: { count: round(base.modifiedKyc), changePct: -10, breakup: base.modifiedKycBreakup }
    },
    bar: [
      { name: "Yesterday", individual: base.barYesterday.individual, nonIndividual: base.barYesterday.nonIndividual },
      { name: "Today", individual: base.barToday.individual, nonIndividual: base.barToday.nonIndividual }
    ],
    statuses: statuses.map((label, i) => ({ label, count: round(base.statuses[i]) })),
    categories: {
      individual: base.categories.individual,
      nonIndividual: base.categories.nonIndividual
    },
    donut: base.donut,
    panData: base.panData,
    profile: { name: "Sarthak Gupta", date: new Date().toISOString() }
  };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const range = searchParams.get("range") || "today";
  const view = searchParams.get("view") || "individual";
  const type = searchParams.get("type") || "solicited"; // NEW param
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  let mult = 1;
  if (range === "month") mult = 20;
  if (range === "custom" && from && to) {
    const df = new Date(from);
    const dt = new Date(to);
    const days = Math.max(1, Math.round((dt - df) / (1000 * 60 * 60 * 24)) + 1);
    mult = days;
  }

  // --- Base datasets ---
  const bases = {
    solicited: {
      individual: {
        total: 3456,
        newKyc: 3000,
        newKycBreakup: { myKRA: 400, interop: 0 },
        modifiedKyc: 456,
        modifiedKycBreakup: { myKRA: 400, interop: 56 },
        barYesterday: { individual: 300, nonIndividual: 200 },
        barToday: { individual: 360, nonIndividual: 220 },
        statuses: [234, 45, 350, 654, 269, 100],
        categories: {
          individual: { RI: 68, NRI: 32 },
          nonIndividual: { RI: 61, NRI: 39 }
        },
        donut: { solicited: 956, received: 700, consumed: 540, pending: 216 },
        panData: {
          panSolicited: { withImage: 250, withoutImage: 256, kfinKRA: 400 },
          dataReceived: { withImage: 100, withoutImage: 20, kfinKRA: 300 }
        }
      },
      "non-individual": {
        total: 1680,
        newKyc: 820,
        newKycBreakup: { myKRA: 200, interop: 0 },
        modifiedKyc: 210,
        modifiedKycBreakup: { myKRA: 180, interop: 30 },
        barYesterday: { individual: 120, nonIndividual: 180 },
        barToday: { individual: 140, nonIndividual: 240 },
        statuses: [120, 34, 180, 260, 90, 60],
        categories: {
          individual: { RI: 61, NRI: 39 },
          nonIndividual: { RI: 58, NRI: 42 }
        },
        donut: { solicited: 540, received: 420, consumed: 360, pending: 120 },
        panData: {
          panSolicited: { withImage: 180, withoutImage: 90, kfinKRA: 220 },
          dataReceived: { withImage: 160, withoutImage: 70, kfinKRA: 200 }
        }
      }
    },
    unsolicited: {
      individual: {
        total: 2450,
        newKyc: 2000,
        newKycBreakup: { myKRA: 250, interop: 0 },
        modifiedKyc: 320,
        modifiedKycBreakup: { myKRA: 300, interop: 20 },
        barYesterday: { individual: 180, nonIndividual: 120 },
        barToday: { individual: 200, nonIndividual: 150 },
        statuses: [150, 30, 240, 400, 180, 70],
        categories: {
          individual: { RI: 65, NRI: 35 },
          nonIndividual: { RI: 60, NRI: 40 }
        },
        donut: { solicited: 640, received: 500, consumed: 380, pending: 150 },
        panData: {
          panSolicited: { withImage: 150, withoutImage: 190, kfinKRA: 250 },
          dataReceived: { withImage: 80, withoutImage: 30, kfinKRA: 200 }
        }
      },
      "non-individual": {
        total: 1200,
        newKyc: 600,
        newKycBreakup: { myKRA: 150, interop: 0 },
        modifiedKyc: 150,
        modifiedKycBreakup: { myKRA: 140, interop: 10 },
        barYesterday: { individual: 90, nonIndividual: 110 },
        barToday: { individual: 100, nonIndividual: 130 },
        statuses: [90, 20, 120, 200, 70, 40],
        categories: {
          individual: { RI: 58, NRI: 42 },
          nonIndividual: { RI: 55, NRI: 45 }
        },
        donut: { solicited: 400, received: 300, consumed: 250, pending: 80 },
        panData: {
          panSolicited: { withImage: 120, withoutImage: 60, kfinKRA: 160 },
          dataReceived: { withImage: 100, withoutImage: 50, kfinKRA: 130 }
        }
      }
    }
  };

  const baseData =
    bases[type.toLowerCase()]?.[view.toLowerCase()] ||
    bases.solicited.individual;

  const payload = mk(baseData, mult);

  return new Response(JSON.stringify(payload), {
    headers: { "content-type": "application/json" }
  });
}

