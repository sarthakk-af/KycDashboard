export async function fetchDashboard({ range="today", view="individual", from="", to="" } = {}) {
  const params = new URLSearchParams({ range, view });
  if (from) params.set("from", from);
  if (to) params.set("to", to);
  const res = await fetch(`/api/dashboard?${params.toString()}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed");
  return res.json();
}
