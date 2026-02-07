import { useEffect, useState } from "react";
import { getRisks } from "../api/riskApi";

function colorFor(score) {
  if (score <= 5) return "#00FF00";
  if (score <= 12) return "#FFFF00";
  if (score <= 18) return "#FFA500";
  return "#FF0000";
}

function RiskHeatMap() {
  const [risks, setRisks] = useState([]);

  useEffect(() => {
    getRisks().then(setRisks);
  }, []);

  function count(l, i) {
    return risks.filter(r => r.likelihood === l && r.impact === i);
  }

  return (
    <div className="card shadow-sm mt-4">
      <div className="card-body">
        <h5>Risk Heat Map</h5>
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th>Likelihood ↓ / Impact →</th>
              {[1,2,3,4,5].map(i => <th key={i}>{i}</th>)}
            </tr>
          </thead>
          <tbody>
            {[1,2,3,4,5].map(l => (
              <tr key={l}>
                <th>{l}</th>
                {[1,2,3,4,5].map(i => {
                  const cell = count(l, i);
                  const score = l * i;
                  return (
                    <td
                      key={i}
                      style={{ backgroundColor: colorFor(score) }}
                      title={cell.map(r => r.asset).join(", ")}
                    >
                      {cell.length}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RiskHeatMap;
