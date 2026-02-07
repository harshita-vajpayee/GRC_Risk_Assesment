import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span className="navbar-brand">GRC Risk Tool</span>

      <div>
        <Link className="btn btn-outline-light btn-sm me-2" to="/">
          Dashboard
        </Link>

        <Link className="btn btn-outline-light btn-sm me-2" to="/risks">
          Risks
        </Link>

        <Link className="btn btn-outline-light btn-sm" to="/heatmap">
          Heat Map
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
