function StatsCards({ stats, onCardClick, selectedLevel }) {
  const cardStyles = {
    Total: {
      bg: "#e3f2fd",
      border: "#1565c0"
    },
    Critical: {
      bg: "#fdecea",
      border: "#c62828"
    },
    High: {
      bg: "#fff3e0",
      border: "#ef6c00"
    },
    Medium: {
      bg: "#fffde7",
      border: "#f9a825"
    },
    Low: {
      bg: "#e8f5e9",
      border: "#2e7d32"
    }
  };

  const cards = ["Total", "Critical", "High", "Medium", "Low"];

  return (
    <div className="row g-3 mb-4">
      {cards.map(type => (
        <div className="col-md-2" key={type}>
          <div
            className="card text-center h-100"
            role="button"
            onClick={() =>
              onCardClick(type === "Total" ? null : type)
            }
            style={{
              backgroundColor: cardStyles[type].bg,
              border: `2px solid ${
                selectedLevel === type
                  ? cardStyles[type].border
                  : "transparent"
              }`,
              boxShadow:
                selectedLevel === type
                  ? "0 4px 12px rgba(0,0,0,0.18)"
                  : "0 2px 6px rgba(0,0,0,0.1)",
              transition: "all 0.2s ease-in-out"
            }}
          >
            <div className="card-body">
              <h6 className="text-muted">
                {type === "Total" ? "Total Risks" : `${type} Risks`}
              </h6>
              <h2 style={{ color: cardStyles[type].border }}>
                {stats[type.toLowerCase()]}
              </h2>
              <small className="text-muted">Click to view</small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;
