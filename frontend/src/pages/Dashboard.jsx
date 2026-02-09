import { useEffect, useState, useMemo } from "react";
import RiskForm from "../components/RiskForm";
import RiskTable from "../components/RiskTable";
import RiskHeatMap from "../components/RiskHeatMap";
import { assessRisk, getRisks } from "../api/riskApi";

function Dashboard() {
  const [risks, setRisks] = useState([]);
  const [filter, setFilter] = useState("All"); // Level filter
  const [heatFilter, setHeatFilter] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load ALL risks
  async function loadRisks() {
    setLoading(true);
    try {
      const data = await getRisks(); 
      setRisks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setRisks([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRisks();
  }, []);

  // Add new risk
  async function handleSubmit(data) {
    try {
      await assessRisk(data);
      alert("Risk added successfully!");
      loadRisks();
    } catch (err) {
      if (err.response?.data?.detail) {
        const msg = err.response.data.detail
          .map(e => e.msg)
          .join(", ");
        alert(`Validation Error: ${msg}`);
      } else {
        alert("Failed to add risk. Please check input values.");
      }
    }
  }

  // APPLY ALL FILTERS
  const filteredRisks = useMemo(() => {
    let data = [...risks];

    // Level filter
    if (filter !== "All") {
      data = data.filter(r => r.level === filter);
    }

    // Heatmap filter
    if (heatFilter) {
      data = data.filter(
        r =>
          r.likelihood === heatFilter.likelihood &&
          r.impact === heatFilter.impact
      );
    }

    return data;
  }, [risks, filter, heatFilter]);

  // Export CSV
  function exportCSV() {
    if (!filteredRisks.length) return;

    const headers = [
      "ID",
      "Asset",
      "Threat",
      "Likelihood",
      "Impact",
      "Score",
      "Level"
    ];

    const rows = filteredRisks.map(r =>
      [
        r.id,
        r.asset,
        r.threat,
        r.likelihood,
        r.impact,
        r.score,
        r.level
      ].join(",")
    );

    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "risks.csv";
    a.click();
  }

  return (
    <div className="container-fluid mt-3">
      <div className="row">

        {/* LEFT */}
        <div className="col-md-4">
          <div className="sticky-top" style={{ top: "80px" }}>
            <RiskForm onSubmit={handleSubmit} />
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-md-8">
          <RiskHeatMap
            risks={risks} 
            onCellClick={(l, i) =>
              setHeatFilter({ likelihood: l, impact: i })
            }
          />

          <div className="d-flex justify-content-between align-items-center mt-3 mb-2">
            <h4>
              Risk Register
              {heatFilter && (
                <small className="text-muted ms-2">
                  (L={heatFilter.likelihood}, I={heatFilter.impact})
                </small>
              )}
            </h4>

            <div className="d-flex gap-2">
              {heatFilter && (
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => setHeatFilter(null)}
                >
                  Clear Heat Filter
                </button>
              )}

              <button
                className="btn btn-secondary btn-sm"
                onClick={exportCSV}
              >
                Export CSV
              </button>
            </div>
          </div>

          <RiskTable
            risks={filteredRisks}
            loading={loading}
            filter={filter}
            onFilterChange={(level) => {
              setFilter(level);
              setHeatFilter(null); // reset heatmap on level change
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
