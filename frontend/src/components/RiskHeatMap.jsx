function colorFor(score) {
  if (score <= 5) return "#00FF00";
  if (score <= 12) return "#FFFF00";
  if (score <= 18) return "#FFA500";
  return "#FF0000";
}

function RiskHeatMap({ risks = [], onCellClick }) {
  console.log("HeatMap risks:", risks);

  const safeRisks = Array.isArray(risks) ? risks : [];
  console.log("HeatMap risks:", risks);
  function cellRisks(l, i) {
    return safeRisks.filter(
      r => Number(r.likelihood) === l && Number(r.impact) === i
    );
  }

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <h5>Risk Heat Map</h5>

        <table className="table table-bordered text-center align-middle">
          <thead>
            <tr>
              <th>Likelihood ↓ / Impact →</th>
              {[1, 2, 3, 4, 5].map(i => (
                <th key={i}>{i}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {[1, 2, 3, 4, 5].map(l => (
              <tr key={l}>
                <th>{l}</th>

                {[1, 2, 3, 4, 5].map(i => {
                  const cell = cellRisks(l, i);
                  const score = l * i;

                  return (
                    <td
                      key={i}
                      style={{
                        backgroundColor: colorFor(score),
                        cursor: cell.length ? "pointer" : "default"
                      }}
                      title={
                        cell.length
                          ? cell.map(r => r.asset).join(", ")
                          : "No risks"
                      }
                      onClick={() => {
                        if (cell.length && onCellClick) {
                          onCellClick(l, i);
                        }
                      }}
                    >
                      {cell.length}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        <small className="text-muted">
          Click a cell to filter the Risk Register
        </small>
      </div>
    </div>
  );
}

export default RiskHeatMap;
