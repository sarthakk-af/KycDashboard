export async function fetchDashboard({ range="today", view="individual", from="", to="", type="solicited", date="" } = {}) {
  const params = new URLSearchParams({ range, view, type });
  if (from) params.set("from", from);
  if (to) params.set("to", to);
  if (date) params.set("date", date); // Add this line to send the date
  const res = await fetch(`/api/dashboard?${params.toString()}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed");
  return res.json();
}