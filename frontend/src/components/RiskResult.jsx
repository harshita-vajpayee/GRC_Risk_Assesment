function RiskResult({ risk }) {
  if (!risk) return null;

  const badgeColor =
    risk.level === "Low" ? "success" :
    risk.level === "Medium" ? "warning" :
    risk.level === "High" ? "danger" :
    "dark";

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Latest Risk Added</h5>

        <p><strong>Asset:</strong> {risk.asset}</p>
        <p><strong>Threat:</strong> {risk.threat}</p>
        <p><strong>Score:</strong> {risk.score}</p>

        <span className={`badge bg-${badgeColor}`}>
          {risk.level}
        </span>
      </div>
    </div>
  );
}

export default RiskResult;
