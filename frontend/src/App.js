import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Dashboard />
      </div>
    </>
  );
}

export default App;
