import { useEffect, useState } from "react";
import RiskForm from "../components/RiskForm";
import RiskTable from "../components/RiskTable";
import { assessRisk, getRisks } from "../api/riskApi";

function Dashboard() {
  const [risks, setRisks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  async function loadRisks(level = "All") {
    setLoading(true);
    const data = await getRisks(level !== "All" ? level : null);
    setRisks(data);
    setLoading(false);
  }

  useEffect(() => {
    loadRisks();
  }, []);

  async function handleSubmit(data) {
    await assessRisk(data);
    loadRisks(filter);
  }

  function exportCSV() {
    if (risks.length === 0) return;

    const headers = ["ID","Asset","Threat","Likelihood","Impact","Score","Level"];
    const rows = risks.map(r =>
      [r.id, r.asset, r.threat, r.likelihood, r.impact, r.score, r.level].join(",")
    );

    const csv = [headers.join(","), ...rows].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "risks.csv";
    a.click();
  }

  return (
    <div className="container-fluid mt-3">
      <div className="row">

        {/* LEFT COLUMN – Risk Form */}
        <div className="col-md-4">
          <div className="sticky-top" style={{ top: "80px" }}>
            <RiskForm onSubmit={handleSubmit} />
          </div>
        </div>

        {/* RIGHT COLUMN – Risk Register */}
        <div className="col-md-8">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h4>Risk Register</h4>
            <button
              className="btn btn-secondary btn-sm"
              onClick={exportCSV}
            >
              Export CSV
            </button>
          </div>

          <RiskTable
            risks={risks}
            filter={filter}
            loading={loading}
            onFilterChange={(level) => {
              setFilter(level);
              loadRisks(level);
            }}
          />
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
