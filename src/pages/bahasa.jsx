import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/setting/sidebar";
import "../pages/bahasa.css";

const AccountSettings = () => {
  const navigate = useNavigate(); // digunakan untuk tombol back
  const [language, setLanguage] = useState("English");
  const [dateFormat, setDateFormat] = useState("May 6, 2025");
  const [timeFormat, setTimeFormat] = useState("24hour");
  const [weekStart, setWeekStart] = useState("monday");

  const handleSaveChanges = () => {
    console.log("Saving changes...", {
      language,
      dateFormat,
      timeFormat,
      weekStart,
    });
  };

  const handleGoBack = () => {
    navigate("/workspace"); // kembali ke halaman sebelumnya
  };

  return (
    <>
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <title>Bahasa</title>
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
            {/* Tombol back dan judul */}
            <div className="d-flex align-items-center mb-4">
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
        </div>

        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 mb-4">
            <Sidebar />
          </div>

          {/* Konten utama */}
          <div className="col-md-9">
            <div className="content-area">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="mb-0">Language & Region</h3>
                <button className="save-btn" onClick={handleSaveChanges}>
                  Save Changes
                </button>
              </div>

              <div className="row">
                {/* Language */}
                <div className="col-md-12 mb-4">
                  <label htmlFor="language" className="form-label">
                    Language
                  </label>
                  <select
                    className="form-select"
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="English">English</option>
                    <option value="Español">Español</option>
                    <option value="Français">Français</option>
                    <option value="Deutsch">Deutsch</option>
                    <option value="Italiano">Italiano</option>
                    <option value="日本語">日本語</option>
                    <option value="한국어">한국어</option>
                    <option value="中文">中文</option>
                  </select>
                </div>

                {/* Date Format */}
                <div className="col-md-12 mb-4">
                  <label htmlFor="dateFormat" className="form-label">
                    Date Format
                  </label>
                  <select
                    className="form-select"
                    id="dateFormat"
                    value={dateFormat}
                    onChange={(e) => setDateFormat(e.target.value)}
                  >
                    <option value="May 6, 2025">May 6, 2025</option>
                    <option value="6 May 2025">6 May 2025</option>
                    <option value="05/06/2025">05/06/2025</option>
                    <option value="06/05/2025">06/05/2025</option>
                    <option value="2025-05-06">2025-05-06</option>
                  </select>
                </div>

                {/* Time Format */}
                <div className="col-md-12 mb-4">
                  <fieldset>
                    <legend className="form-label">Time Format</legend>
                    <div className="mt-2">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="timeFormat"
                          id="24hour"
                          value="24hour"
                          checked={timeFormat === "24hour"}
                          onChange={(e) => setTimeFormat(e.target.value)}
                        />
                        <label className="form-check-label" htmlFor="24hour">
                          24 hour
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="timeFormat"
                          id="12hour"
                          value="12hour"
                          checked={timeFormat === "12hour"}
                          onChange={(e) => setTimeFormat(e.target.value)}
                        />
                        <label className="form-check-label" htmlFor="12hour">
                          12 hour
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>

                {/* Week Start */}
                <div className="col-md-12 mb-4">
                  <fieldset>
                    <legend className="form-label">Start of the Week</legend>
                    <div className="mt-2">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="weekStart"
                          id="monday"
                          value="monday"
                          checked={weekStart === "monday"}
                          onChange={(e) => setWeekStart(e.target.value)}
                        />
                        <label className="form-check-label" htmlFor="monday">
                          Monday
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="weekStart"
                          id="sunday"
                          value="sunday"
                          checked={weekStart === "sunday"}
                          onChange={(e) => setWeekStart(e.target.value)}
                        />
                        <label className="form-check-label" htmlFor="sunday">
                          Sunday
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSettings;
