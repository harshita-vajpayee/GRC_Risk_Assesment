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

export async function exportRisksCSV() {
  const res = await fetch("http://127.0.0.1:8000/risks");
  const data = await res.json();

  const headers = ["Asset", "Threat", "Score", "Level"];
  const rows = data.map(r =>
    [r.asset, r.threat, r.score, r.level].join(",")
  );

  const csv = [headers.join(","), ...rows].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "risk_register.csv";
  a.click();
}

