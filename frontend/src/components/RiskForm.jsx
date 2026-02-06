import { useState } from "react";

function RiskForm({ onSubmit }) {
  const [asset, setAsset] = useState("");
  const [threat, setThreat] = useState("");
  const [likelihood, setLikelihood] = useState(3);
  const [impact, setImpact] = useState(3);

  const score = likelihood * impact;

  const level =
    score <= 5 ? "Low" :
    score <= 12 ? "Medium" :
    score <= 18 ? "High" : "Critical";

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ asset, threat, likelihood, impact });
    setAsset("");
    setThreat("");
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="card-title">Add New Risk</h5>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Asset</label>
            <input
              className="form-control"
              value={asset}
              onChange={(e) => setAsset(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Threat</label>
            <input
              className="form-control"
              value={threat}
              onChange={(e) => setThreat(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Likelihood: <strong>{likelihood}</strong>
            </label>
            <input
              type="range"
              className="form-range"
              min="1"
              max="5"
              value={likelihood}
              onChange={(e) => setLikelihood(Number(e.target.value))}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Impact: <strong>{impact}</strong>
            </label>
            <input
              type="range"
              className="form-range"
              min="1"
              max="5"
              value={impact}
              onChange={(e) => setImpact(Number(e.target.value))}
            />
          </div>

          <div className="alert alert-info">
            Preview → <strong>Score:</strong> {score} | <strong>Level:</strong> {level}
          </div>

          <button className="btn btn-primary w-100">
            Submit Risk
          </button>
        </form>
      </div>
    </div>
  );
}

export default RiskForm;
