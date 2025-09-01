// Helper function to generate a random number within a given range
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Function to create a dynamic data object based on multipliers and randomness
function generateRealisticData(mult = 1) {
  const statuses = ["KYC Initiated", "Under Process", "Registered", "Validated", "Hold", "Docs Pending"];

  // Base values for today's bar chart
  const barTodayIndividual = random(330, 380);
  const barTodayNonIndividual = random(210, 250);

  return {
    totalKycs: random(3200, 3600) * mult,
    kpi: {
      newKyc: {
        count: random(2800, 3200) * mult,
        changePct: random(-15, 15),
        breakup: { myKRA: random(350, 450) * mult, interop: random(0, 50) * mult }
      },
      modifiedKyc: {
        count: random(400, 500) * mult,
        changePct: random(-15, 15),
        breakup: { myKRA: random(350, 450) * mult, interop: random(20, 80) * mult }
      }
    },
    bar: [
      { name: "Yesterday", individual: random(280, 320) * mult, nonIndividual: random(180, 220) * mult },
      { name: "Today", individual: barTodayIndividual * mult, nonIndividual: barTodayNonIndividual * mult }
    ],
    statuses: statuses.map(label => ({ label, count: random(50, 700) * mult })),
    categories: {
      individual: { RI: random(60, 75), NRI: 100 - random(60, 75) },
      nonIndividual: { RI: random(55, 70), NRI: 100 - random(55, 70) }
    },
    donut: {
      solicited: random(900, 1000) * mult,
      received: random(650, 750) * mult,
      consumed: random(500, 600) * mult,
      pending: random(200, 250) * mult,
    },
    panData: {
      panSolicited: { withImage: random(230, 270) * mult, withoutImage: random(230, 270) * mult, kfinKRA: random(380, 420) * mult },
      dataReceived: { withImage: random(80, 120) * mult, withoutImage: random(10, 30) * mult, kfinKRA: random(280, 320) * mult }
    },
    profile: { name: "Sarthak Gupta", date: new Date().toISOString() }
  };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const range = searchParams.get("range") || "today";
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  let mult = 1;
  if (range === "month") {
    mult = 20; // Simulate 20 days of data for a month
  }
  if (range === "custom" && from && to) {
    const df = new Date(from);
    const dt = new Date(to);
    // Calculate the number of days in the custom range
    const days = Math.max(1, Math.round((dt - df) / (1000 * 60 * 60 * 24)) + 1);
    mult = days;
  }

  // Generate a fresh, random payload for every request
  const payload = generateRealisticData(mult);

  return new Response(JSON.stringify(payload), {
    headers: { "content-type": "application/json" }
  });
}