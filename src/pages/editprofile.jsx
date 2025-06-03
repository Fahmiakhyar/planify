import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Tambahkan untuk navigasi
import "../pages/editprofile.css";
import Sidebar from "../components/setting/sidebar";

const AccountSettings = () => {
  const navigate = useNavigate(); // ✅ Inisialisasi navigasi
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleGoBack = () => {
    navigate("/workspace"); // ✅ Kembali ke halaman workspace
  };

  return (
    <>
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <title>Edit Profile</title>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        rel="stylesheet"
      />

      <div className="container py-5">
        <div className="row mb-3">
          <div className="col-12">
            <div className="d-flex align-items-center">
              {/* ✅ Tombol kembali */}
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

          {/* Main Content */}
          <div className="col-md-9">
            <div className="content-area">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Profile</h3>
                <button className="save-btn">Save Changes</button>
              </div>

              <div className="row">
                <div className="col-md-12 d-flex mb-4">
                  <div className="profile-pic-container">
                    {/* Profile picture preview atau upload */}
                  </div>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-12 mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" />
                </div>

                <div className="col-md-12">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" />
                </div>
              </div>

              <div className="mt-5">
                <h4 className="mb-4">Change Password</h4>

                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label htmlFor="newPassword" className="form-label">
                      New password
                    </label>
                    <div className="password-field position-relative">
                      <input
                        type={newPasswordVisible ? "text" : "password"}
                        className="form-control"
                        id="newPassword"
                      />
                      <span
                        className="password-toggle"
                        onClick={toggleNewPasswordVisibility}
                      >
                        <i className={`fa ${newPasswordVisible ? "fa-eye-slash" : "fa-eye"}`}></i>
                      </span>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm new password
                    </label>
                    <div className="password-field position-relative">
                      <input
                        type={confirmPasswordVisible ? "text" : "password"}
                        className="form-control"
                        id="confirmPassword"
                      />
                      <span
                        className="password-toggle"
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        <i className={`fa ${confirmPasswordVisible ? "fa-eye-slash" : "fa-eye"}`}></i>
                      </span>
                    </div>
                  </div>
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
