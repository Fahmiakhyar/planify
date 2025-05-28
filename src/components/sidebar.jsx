import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div>
      <ul>
        <li className="active">
          <i className="fas fa-home"></i> Dashboard
        </li>
        <li>
          <i className="fas fa-clock"></i> Recent
        </li>
        <li>
          <i className="fas fa-folder"></i> Shared
        </li>
        <li>
          <i className="fas fa-star"></i> Favorites
        </li>
      </ul>

      <div className="premium-box">
        <i className="fas fa-gem mb-2"></i>
        <p className="mb-1">
          <strong>Current plan:</strong>
          <br />
          Free Trial
        </p>
        <small>Upgrade to Premium to get exclusive features</small>
        <button className="btn btn-sm w-100 rounded-pill mt-2">
          ⚡ Go Premium
        </button>
      </div>
      <ul>
        <Link to="/setting/profile" style={{ textDecoration: "none", color: "inherit" }}>
          <li className="bottom-menu">
            <i className="fas fa-cog"></i> Setting
          </li>
        </Link>
        <li>
          <i className="fas fa-sign-out-alt"></i> Logout
        </li>
      </ul>
    </div>
  );
}
