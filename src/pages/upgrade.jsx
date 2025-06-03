import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/setting/sidebar";
import "../pages/upgrade.css";

const AccountSettings = () => {
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const navigate = useNavigate();

  // Fungsi tombol kembali
  const handleGoBack = () => {
    navigate("/workspace");
  };

  return (
    <div className="container py-5">
      <title>Upgrade</title>
      <div className="row">
        <div className="col-12 d-flex align-items-center mb-4">
          {/* Tombol Kembali */}
          <button
            className="back-arrow me-3"
            onClick={handleGoBack}
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
          <h2 className="text-primary fw-bold mb-0">Account Settings</h2>
        </div>
      </div>

      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 mb-4">
          <Sidebar />
        </div>

        {/* Konten Utama */}
        <div className="col-md-9">
          <div className="content-area">
            <div className="mb-4 d-flex align-items-center">
              <h3 className="mb-0">Upgrade Your Plan</h3>
            </div>

            {/* Plan Cards Container */}
            <div className="col mb-4">
              <div className="mb-3">
                <div
                  className={`plan-card h-100 ${
                    selectedPlan === "monthly" ? "selected" : ""
                  }`}
                  style={{
                    backgroundColor: "#f8f9ff",
                    borderRadius: "12px",
                    padding: "24px",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    width: "100%", // ini supaya card full lebar
                    boxSizing: "border-box", // supaya padding tidak nambahin lebar ke luar
                  }}
                  onClick={() => setSelectedPlan("monthly")}
                >
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h2
                        className="fw-bold mb-1"
                        style={{ fontSize: "32px", color: "#1f2937" }}
                      >
                        Rp49.999,00
                      </h2>
                      <span style={{ color: "#6b7280", fontSize: "14px" }}>
                        /month
                      </span>
                    </div>
                  </div>

                  <p
                    style={{
                      color: "#374151",
                      fontSize: "14px",
                      marginBottom: "20px",
                    }}
                  >
                    Level up productivity and creativity with expanded access
                  </p>

                  <ul className="list-unstyled mb-0">
                    <li className="d-flex align-items-center mb-2">
                      <span
                        className="me-2 d-inline-flex align-items-center justify-content-center"
                        style={{
                          width: "16px",
                          height: "16px",
                          backgroundColor: "white",
                          borderRadius: "50%",
                          fontSize: "19px",
                          color:"green",
                        }}
                      >
                        ✓
                      </span>
                      <span style={{ fontSize: "13px", color: "#374151" }}>
                        Access to group chat
                      </span>
                    </li>
                    <li className="d-flex align-items-center mb-2">
                      <span
                        className="me-2 d-inline-flex align-items-center justify-content-center"
                        style={{
                          width: "16px",
                          height: "16px",
                          backgroundColor: "white",
                          borderRadius: "50%",
                          fontSize: "19px",
                          color:"green",
                        }}
                      >
                        ✓
                      </span>
                      <span style={{ fontSize: "13px", color: "#374151" }}>
                        Customize card backgrounds
                      </span>
                    </li>
                    <li className="d-flex align-items-center">
                      <span
                        className="me-2 d-inline-flex align-items-center justify-content-center"
                        style={{
                          width: "16px",
                          height: "16px",
                          backgroundColor: "white",
                          borderRadius: "50%",
                          fontSize: "19px",
                          color:"green",
                        }}
                      >
                        ✓
                      </span>
                      <span style={{ fontSize: "13px", color: "#374151" }}>
                        Connect with multiple friends at once
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Upgrade Button */}
            <div className="d-flex justify-content-end">
              <button
                className="btn px-4 py-2"
                onClick={() => (window.location.href = "/setting/paymentUp")}
                style={{
                  backgroundColor: "#0d6efd",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "500",
                  fontSize: "14px",
                }}
              >
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
