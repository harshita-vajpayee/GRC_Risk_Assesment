import { useEffect, useState } from "react";

function RiskForm({ onSubmit }) {
  const [asset, setAsset] = useState("");
  const [threat, setThreat] = useState("");
  const [likelihood, setLikelihood] = useState(3);
  const [impact, setImpact] = useState(3);

  const [preview, setPreview] = useState({
    score: null,
    level: null,
  });
  useEffect(() => {
  console.log("API URL:", process.env.REACT_APP_API_URL);
}, []);
  // Live API preview
  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/preview-risk", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            likelihood,
            impact,
          }),
        });

        const data = await res.json();
        setPreview(data);
      } catch (err) {
        console.error("Preview error", err);
      }
    };

    fetchPreview();
  }, [likelihood, impact]);

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

          {preview.score !== null && (
            <div className="alert alert-info">
              Preview → <strong>Score:</strong> {preview.score} |{" "}
              <strong>Level:</strong> {preview.level}
            </div>
          )}

          <button className="btn btn-primary w-100">
            Submit Risk
          </button>
        </form>
      </div>
    </div>
  );
}

export default RiskForm;
