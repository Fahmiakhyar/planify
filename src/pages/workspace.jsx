import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/sidebar";
import "../pages/works.css";

function App() {
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [workbooks, setWorkbooks] = useState([
    {
      title: "My Planner",
      image: "https://source.unsplash.com/featured/?planner",
      createdAt: "21 minutes ago",
    },
    {
      title: "Wuling's Workbook",
      image: "https://source.unsplash.com/featured/?laptop,code",
      createdAt: "48 minutes ago",
    },
    {
      title: "Workbook Group 7",
      image: "https://source.unsplash.com/featured/?notes,desk",
      createdAt: "2 hours ago",
    },
  ]);

  const [title, setTitle] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const menuRef = useRef(null);
  const [, setActiveMenuId] = useState(null);

  useEffect(() => {
    function handleClickOutsideMenu(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenuId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutsideMenu);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, []);

  const toggleRightSidebar = () => {
    setShowRightSidebar(!showRightSidebar);
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setTitle("");
    setImagePreview(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleCreateWorkbook = (e) => {
    e.preventDefault();
    if (!title) return;

    const newWorkbook = {
      title,
      image: imagePreview || "https://source.unsplash.com/featured/?workbook",
      createdAt: "Just now",
    };

    setWorkbooks([newWorkbook, ...workbooks]);
    closeModal();
  };

  return (
    <>
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <title>Planify - Dashboard</title>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        rel="stylesheet"
      />

      <div className="d-flex">
        <div className="sidebar-left">
          <i
            className="fas fa-home toggle-sidebar mb-2"
            onClick={toggleRightSidebar}
          />
          <i
            className="fas fa-clock toggle-sidebar mb-2"
            onClick={toggleRightSidebar}
          />
          <i
            className="fas fa-folder toggle-sidebar mb-1"
            onClick={toggleRightSidebar}
          />
          <i
            className="fas fa-star toggle-sidebar"
            onClick={toggleRightSidebar}
          />
          <div className="sidebar-bottom-icons">
            <i
              className="fas fa-gem toggle-sidebar mb-1"
              onClick={toggleRightSidebar}
            />
            <i
              className="fas fa-cog toggle-sidebar mb-1"
              onClick={toggleRightSidebar}
            />
            <i
              className="fas fa-sign-out-alt toggle-sidebar"
              onClick={toggleRightSidebar}
            />
          </div>
        </div>

        <div
          className={`sidebar-right ${showRightSidebar ? "show" : ""}`}
          aria-hidden={!showRightSidebar}
        >
          <Sidebar />
        </div>

        <main className="content flex-grow-1" role="main">
          <header className="app-header" role="banner">
            <div aria-label="Planify logo" className="logo">
              <div aria-hidden="true" className="logo-icon">
                <i className="fas fa-calendar-check"> </i>
              </div>
              Planify
            </div>
            <nav aria-label="User  actions" className="nav-actions">
              <button className="btn-icon" aria-label="Message">
                <i className="far fa-envelope"></i>
              </button>
              <button className="btn-icon" aria-label="Notification">
                <i className="far fa-bell"></i>
              </button>
              <button className="btn-icon" aria-label="Help">
                <i className="far fa-circle-question"></i>
              </button>
              <button className="premium-btn" aria-label="Go Premium">
                Go Premium
              </button>
              <img
                className="user-avatar"
                src="https://storage.googleapis.com/a1aa/image/b1775588-94f7-4a59-b686-0a1dddb0891b.jpg"
                alt="User  Avatar"
                width="40"
                height="40"
              />
            </nav>
          </header>

          {/* Main Content Area */}
          <div className="container-fluid mt-4">
            {/* Welcome Section */}
            <div className="row mb-4">
              <div className="col-md-8">
                <h1 className="h2 mb-2">Hi, Angelia!</h1>
                <p className="text-muted">
                  What's on your mind today? Let's get things done!
                </p>
              </div>
              <div className="col-md-4 text-end">
                <img
                  src="https://storage.googleapis.com/a1aa/image/b1775588-94f7-4a59-b686-0a1dddb0891b.jpg"
                  alt="Person working on laptop"
                  className="img-fluid"
                  style={{ maxWidth: "100px", height: "auto" }}
                />
              </div>
            </div>

            {/* Workspace Section */}
            <div className="row">
              <div className="col-12">
                <h2 className="h4 mb-3">Workspace</h2>

                <ul className="nav nav-tabs mb-4">
                  <li className="nav-item">
                    <a className="nav-link active">
                      <i className="fas fa-book me-2"></i>All Workbook
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link">
                      <i className="fas fa-archive me-2"></i>Archived
                    </a>
                  </li>
                </ul>

                {/* Workbook List */}
                <div className="row">
                  {workbooks.map((wb, index) => (
                    <div className="col-md-3 col-sm-6 mb-3" key={index}>
                      <div className="card h-100">
                        <img
                          src={wb.image}
                          className="card-img-top"
                          alt={wb.title}
                          style={{ height: "160px", objectFit: "cover" }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{wb.title}</h5>
                          <p
                            className="text-muted"
                            style={{ fontSize: "0.9rem" }}
                          >
                            {wb.createdAt}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add New Workbook */}
                  <div className="col-md-3 col-sm-6 mb-3">
                    <div
                      className="card text-center"
                      style={{
                        minHeight: "200px",
                        border: "2px dashed #ddd",
                        cursor: "pointer",
                      }}
                      onClick={openModal}
                    >
                      <div className="card-body d-flex flex-column justify-content-center">
                        <div className="mb-3">
                          <i
                            className="fas fa-plus"
                            style={{ fontSize: "3rem", color: "#007bff" }}
                          ></i>
                        </div>
                        <p className="card-text">New Workbook</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal for Create Workbook */}
            {showModal && (
              <div
                className="modal fade show"
                style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
                tabIndex="-1"
                role="dialog"
                aria-modal="true"
              >
                <div
                  className="modal-dialog modal-dialog-centered modal-lg"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Create New Workbook</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={closeModal}
                      ></button>
                    </div>

                    <div className="modal-body">
                      <form onSubmit={handleCreateWorkbook}>
                        <div className="mb-3">
                          <label
                            htmlFor="workspace-name"
                            className="form-label"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            id="workspace-name"
                            name="workspace-name"
                            placeholder="Enter workspace title"
                            className="form-control"
                            autoComplete="off"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </div>

                        <div className="mb-3">
                          <label htmlFor="picture-cover" className="form-label">
                            Picture / Cover
                          </label>
                          <input
                            type="file"
                            id="picture-cover"
                            name="picture-cover"
                            accept="image/*"
                            className="form-control"
                            onChange={handleImageUpload}
                          />
                          {imagePreview && (
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="mt-3"
                              style={{
                                width: "100%",
                                maxHeight: "200px",
                                objectFit: "cover",
                              }}
                            />
                          )}
                        </div>

                        {/* Tombol dibuat sejajar horizontal */}
                        <div className="modal-footer d-flex justify-content-end">
                          <button type="submit" className="btn btn-primary">
                            Create Workbook
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary ms-2"
                            onClick={closeModal}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
