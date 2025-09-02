import { generateRealisticData } from './mockApi';

export async function fetchDashboard({ range="today", from="", to="" } = {}) {
  // This function now simulates the API call by generating data directly.

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

  // Simulate a short network delay so the loading skeletons appear
  await new Promise(resolve => setTimeout(resolve, 500));

  const payload = generateRealisticData(mult);
  return payload;
}