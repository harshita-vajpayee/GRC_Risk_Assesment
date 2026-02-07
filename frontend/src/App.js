import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Risks from "./pages/Risks";
import HeatMap from "./pages/HeatMap";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/risks" element={<Risks />} />
        <Route path="/heatmap" element={<HeatMap />} />
      </Routes>
    </>
  );
}

export default App;
