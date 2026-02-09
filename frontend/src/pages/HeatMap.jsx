import { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";
import RiskHeatMap from "../components/RiskHeatMap";
import { getRisks } from "../api/riskApi";

function HeatMap() {
  const [risks, setRisks] = useState([]);
  const [loading, setLoading] = useState(true);
  const heatmapRef = useRef(null);

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

  async function downloadHeatMap() {
    if (!heatmapRef.current) return;

    const canvas = await html2canvas(heatmapRef.current, {
      backgroundColor: "#ffffff",
      scale: 2 // higher quality
    });

    const link = document.createElement("a");
    link.download = "risk-heatmap.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  if (loading) {
    return <div className="text-center mt-5">Loading heat map...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Risk Heat Map</h3>

        <button
          className="btn btn-outline-primary btn-sm"
          onClick={downloadHeatMap}
        >
          Download Heatmap Image
        </button>
      </div>

      {/* ONLY THIS PART IS CAPTURED */}
      <div ref={heatmapRef}>
        <RiskHeatMap risks={risks} />
      </div>
    </div>
  );
}

export default HeatMap;
