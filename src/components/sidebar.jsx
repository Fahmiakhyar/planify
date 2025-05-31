import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div>
      <ul>
        <NavLink
          to="/workspace"
          style={{ textDecoration: "none", color: "inherit" }}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <li>
            <i className="fas fa-home"></i> Dashboard
          </li>
        </NavLink>

        <NavLink
          to="/recentFile"
          style={{ textDecoration: "none", color: "inherit" }}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <li>
            <i className="fas fa-clock"></i> Recent
          </li>
        </NavLink>

        <NavLink
          to="/shared"
          style={{ textDecoration: "none", color: "inherit" }}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <li>
            <i className="fas fa-folder"></i> Shared
          </li>
        </NavLink>

        <NavLink
          to="/favorite"
          style={{ textDecoration: "none", color: "inherit" }}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <li>
            <i className="fas fa-star"></i> Favorites
          </li>
        </NavLink>
      </ul>

      <div className="premium-box text-center p-3 border rounded">
        <i
          className="fas fa-gem mb-2"
          style={{ fontSize: "2rem", color: "#6f42c1" }}
        ></i>
        <p className="mb-1">
          <strong>Current plan:</strong>
          <br />
          Free Trial
        </p>
        <small>Upgrade to Premium to get exclusive features</small>
        {/* Ganti button biasa dengan Link styled seperti button */}
        <NavLink
          to="/setting/upgrade"
          className="btn btn-sm w-100 rounded-pill mt-2"
          role="button"
        >
          ⚡ Go Premium
        </NavLink>
      </div>

      <ul>
        <NavLink
          to="/setting/profile"
          style={{ textDecoration: "none", color: "inherit" }}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <li className="bottom-menu">
            <i className="fas fa-cog"></i> Setting
          </li>
        </NavLink>

        <NavLink
          to="/logout"
          style={{ textDecoration: "none", color: "inherit" }}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <li>
            <i className="fas fa-sign-out-alt"></i> Logout
          </li>
        </NavLink>
      </ul>
    </div>
  );
}
