function mitigationHint(level) {
  switch (level) {
    case "Low": return "Monitor";
    case "Medium": return "Plan mitigation";
    case "High": return "Prioritize action per NIST";
    case "Critical": return "Immediate response";
    default: return "";
  }
}

function RiskTable({ risks, filter, onFilterChange, loading }) {
  return (
    <div className="card shadow-sm mt-4">
      <div className="card-body">
        <div className="d-flex justify-content-between mb-3">
          <h5>Risk Register</h5>

          <select
            className="form-select w-auto"
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
          >
            <option>All</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
        </div>

        {loading ? (
          <p>Loading risks…</p>
        ) : risks.length === 0 ? (
          <p>No risks yet</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-sm">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Asset</th>
                  <th>Threat</th>
                  <th>L</th>
                  <th>I</th>
                  <th>Score</th>
                  <th>Level</th>
                  <th>Mitigation</th>
                </tr>
              </thead>
              <tbody>
                {risks.map(r => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.asset}</td>
                    <td>{r.threat}</td>
                    <td>{r.likelihood}</td>
                    <td>{r.impact}</td>
                    <td>{r.score}</td>
                    <td>{r.level}</td>
                    <td>{mitigationHint(r.level)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default RiskTable;
