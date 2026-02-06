import { useState } from "react";
import RiskForm from "../components/RiskForm";
import RiskResult from "../components/RiskResult";
import { assessRisk } from "../api/riskApi";

function Dashboard() {
  const [result, setResult] = useState(null);

  async function handleSubmit(data) {
    try {
      const response = await assessRisk(data);
      setResult(response);
    } catch {
      alert("Error assessing risk");
    }
  }

  return (
    <div>
      <RiskForm onSubmit={handleSubmit} />
      <RiskResult risk={result} />
    </div>
  );
}

export default Dashboard;
