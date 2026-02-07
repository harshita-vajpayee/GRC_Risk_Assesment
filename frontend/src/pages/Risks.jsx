import { useEffect, useState } from "react";
import RiskTable from "../components/RiskTable";
import { getRisks } from "../api/riskApi";

function Risks() {
  const [risks, setRisks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getRisks();
      setRisks(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Risk Register</h3>
      <RiskTable risks={risks} loading={loading} />
    </div>
  );
}

export default Risks;
