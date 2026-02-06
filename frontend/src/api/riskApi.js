import { API_BASE_URL } from "../config";

export async function assessRisk(riskData) {
  const response = await fetch(`${API_BASE_URL}/assess-risk`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(riskData),
  });

  if (!response.ok) {
    throw new Error("Failed to assess risk");
  }

  return response.json();
}

export async function getRisks() {
  const response = await fetch(`${API_BASE_URL}/risks`);
  return response.json();
}
