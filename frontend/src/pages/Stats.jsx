import { useEffect, useState, useMemo } from "react";
import RiskTable from "../components/RiskTable";
import StatsCards from "../components/StatsCards";
import { getRisks } from "../api/riskApi";

function Stats() {
  const [risks, setRisks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState(null);

  // 🔄 Load risks once
  useEffect(() => {
    async function load() {
      try {
        const data = await getRisks();
        setRisks(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load risks", err);
        setRisks([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // 📊 Stats calculation
  const stats = useMemo(() => ({
    total: risks.length,
    critical: risks.filter(r => r.level === "Critical").length,
    high: risks.filter(r => r.level === "High").length,
    medium: risks.filter(r => r.level === "Medium").length,
    low: risks.filter(r => r.level === "Low").length
  }), [risks]);

  // 🔍 Filtered list
  const filteredRisks = useMemo(() => {
    if (!selectedLevel) return risks;
    return risks.filter(r => r.level === selectedLevel);
  }, [risks, selectedLevel]);

  if (loading) {
    return <div className="text-center mt-5">Loading statistics...</div>;
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Risk Statistics</h3>

      {/* STAT CARDS */}
      <StatsCards
        stats={stats}
        selectedLevel={selectedLevel}
        onCardClick={setSelectedLevel}
      />

      {/* FILTERED TABLE */}
      {selectedLevel && (
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5>{selectedLevel} Risk List</h5>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => setSelectedLevel(null)}
          >
            Clear
          </button>
        </div>
      )}

      <RiskTable
        risks={filteredRisks}
        loading={loading}
        filter={selectedLevel || "All"}
        onFilterChange={() => {}}
      />
    </div>
  );
}

export default Stats;
