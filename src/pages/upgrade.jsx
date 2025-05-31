import React, { useState } from "react";
import Sidebar from "../components/setting/sidebar";
import "../pages/upgrade.css";

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState("upgrade");
  const [plan, setPlan] = useState("monthly");

  const handleUpgrade = () => {
    // Handle upgrade functionality here
    console.log("Upgrading plan to:", plan);
  };

  return (
    <>
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <title>Account Settings</title>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        rel="stylesheet"
      />
      <div className="container py-5">
        <div className="row">
          <div className="col-12">
            <h2 className="mb-4 text-primary fw-bold">Account settings</h2>
          </div>
        </div>

        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 mb-4">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="col-md-9">
            <div className="content-area">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                  <button
                    className="back-arrow me-3"
                    onClick={() => setActiveTab("profile")}
                    aria-label="Go back"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-arrow-left"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                      />
                    </svg>
                  </button>
                  <h3 className="mb-0">Upgrade Your Plan</h3>
                </div>
              </div>

              <div className="row g-4 mb-4">
                <div className="col-md-6">
                  <div className="plan-card">
                    <h3>
                      $4.99 <small className="text-muted">/month</small>
                    </h3>
                    <p className="text-muted">
                      Level up productivity and creativity with expanded access
                    </p>
                    <ul className="list-unstyled text-start">
                      <li>
                        <span className="check-icon">✔</span>Access to group chat
                      </li>
                      <li>
                        <span className="check-icon">✔</span>Customize card backgrounds
                      </li>
                      <li>
                        <span className="check-icon">✔</span>Connect with multiple friends at once
                      </li>
                    </ul>
                    <button className="btn btn-select" onClick={() => setPlan("monthly")}>
                      Select Plan
                    </button>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="plan-card">
                    <h3>
                      $39.99 <small className="text-muted">/yearly</small>
                    </h3>
                    <p className="text-muted">
                      Level up productivity and creativity with expanded access
                    </p>
                    <ul className="list-unstyled text-start">
                      <li>
                        <span className="check-icon">✔</span>Access to group chat
                      </li>
                      <li>
                        <span className="check-icon">✔</span>Customize card backgrounds
                      </li>
                      <li>
                        <span className="check-icon">✔</span>Connect with multiple friends at once
                      </li>
                    </ul>
                    <button className="btn btn-select" onClick={() => setPlan("yearly")}>
                      Select Plan
                    </button>
                  </div>
                </div>
              </div>

              <button className="btn btn-upgrade" onClick={handleUpgrade}>
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSettings;
