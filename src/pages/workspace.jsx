import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/sidebar";
import NotificationPopup from "../components/Notif";
import "../pages/works.css";

function App() {
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [workbooks, setWorkbooks] = useState([
    {
      id: 1,
      title: "My Planner",
      image: "/logo%20planify%20new.png",
      createdAt: "21 minutes ago",
    },
    {
      id: 2,
      title: "Wuling's Workbook",
      image: "/logo%20planify%20new.png",
      createdAt: "48 minutes ago",
    },
    {
      id: 3,
      title: "Workbook Group 7",
      image: "/logo%20planify%20new.png",
      createdAt: "2 hours ago",
    },
  ]);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const dummyNotifications = [
      {
        id: 1,
        user: "Anda",
        action: "menambahkan tugas baru ke 'To Do'",
        time: "2 menit lalu",
      },
      {
        id: 2,
        user: "Anda",
        action: "mengedit catatan pada 'Notes'",
        time: "10 menit lalu",
      },
    ];

  const [title, setTitle] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const menuRef = useRef(null);

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
    setEditingIndex(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleCreateOrUpdateWorkbook = (e) => {
    e.preventDefault();
    if (!title) return;

    const newWorkbook = {
      id: editingIndex !== null ? workbooks[editingIndex].id : Date.now(),
      title,
      image: imagePreview || "https://source.unsplash.com/featured/?workbook",
      createdAt: editingIndex !== null ? "Updated just now" : "Just now",
    };

    if (editingIndex !== null) {
      const updatedWorkbooks = workbooks.map((wb, index) =>
        index === editingIndex ? newWorkbook : wb
      );
      setWorkbooks(updatedWorkbooks);
    } else {
      setWorkbooks([newWorkbook, ...workbooks]);
    }

    closeModal();
  };

  const handleEditWorkbook = (index) => {
    const workbookToEdit = workbooks[index];
    setTitle(workbookToEdit.title);
    setImagePreview(workbookToEdit.image);
    setEditingIndex(index);
    openModal();
  };

  const handleDeleteWorkbook = (index) => {
    const updatedWorkbooks = workbooks.filter((_, i) => i !== index);
    setWorkbooks(updatedWorkbooks);
  };

  const toggleNoteMenu = (id, e) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  const handleNoteAction = (action, id) => {
    const index = workbooks.findIndex((wb) => wb.id === id);
    switch (action) {
      case "Edit":
        handleEditWorkbook(index);
        break;
      case "Archived":
        console.log(`Archived for: ${id}`);
        break;
      case "Delete":
        handleDeleteWorkbook(index);
        break;
      default:
        break;
    }
    setActiveMenuId(null);
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
            <div
              aria-label="Planify logo"
              className="logo d-flex align-items-center"
            >
              <img
                src="/logo%20planify%20new.png"
                alt="Planify Logo"
                width="36"
                height="36"
                className="me-2"
              />
              Planify
            </div>

            <nav aria-label="User  actions" className="nav-actions">
              <button className="btn-icon" aria-label="Notification" onClick={() => setIsNotifOpen(true)}>
                <i className="far fa-bell"></i>
              </button>
              <button className="premium-btn" aria-label="Go Premium">
                Go Premium
              </button>
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
                    <div
                      className="nav-link d-flex align-items-center"
                      style={{ cursor: "pointer" }}
                      onClick={() => (window.location.href = "/archived")}
                    >
                      <i className="fas fa-archive me-2"></i>
                      <span>Archived</span>
                    </div>
                  </li>
                </ul>

                {/* Workbook List */}
                <div className="row">
                  {workbooks.map((wb, index) => (
                    <div className="col-md-3 col-sm-6 mb-3" key={wb.id}>
                      <div
                        className="card h-100 shadow card-hover"
                        onClick={() => (window.location.href = "/kalender")}
                        style={{ cursor: "pointer" }}
                      >
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
                          <div className="note-actions">
                            <i
                              className="fas fa-ellipsis-h"
                              onClick={(e) => {
                                e.stopPropagation(); // agar tidak ikut trigger ke window.location
                                toggleNoteMenu(wb.id, e);
                              }}
                              style={{
                                cursor: "pointer",
                                fontSize: "18px",
                                color: "white",
                                padding: "6px",
                                borderRadius: "50%",
                                transition: "background-color 0.2s",
                              }}
                              onMouseEnter={(e) =>
                                (e.target.style.backgroundColor =
                                  "rgba(215, 212, 212, 0.84)")
                              }
                              onMouseLeave={(e) =>
                                (e.target.style.backgroundColor = "transparent")
                              }
                            />

                            {activeMenuId === wb.id && (
                              <div
                                className="crud-menu"
                                ref={menuRef}
                                onClick={(e) => e.stopPropagation()} // supaya klik di dalam menu tidak redirect
                                style={{
                                  position: "absolute",
                                  top: "30px",
                                  right: "0",
                                  backgroundColor: "white",
                                  border: "1px solid #e0e0e0",
                                  borderRadius: "8px",
                                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                  zIndex: "10000",
                                  minWidth: "120px",
                                  padding: "8px 0",
                                }}
                              >
                                {["Edit", "Archived", "Delete"].map(
                                  (action) => (
                                    <div
                                      key={action}
                                      onClick={() =>
                                        handleNoteAction(action, wb.id)
                                      }
                                      style={{
                                        padding: "12px 20px",
                                        cursor: "pointer",
                                        fontSize: "14px",
                                        color: "#333",
                                        transition: "background-color 0.2s",
                                      }}
                                      onMouseEnter={(e) =>
                                        (e.target.style.backgroundColor =
                                          "#f5f5f5")
                                      }
                                      onMouseLeave={(e) =>
                                        (e.target.style.backgroundColor =
                                          "white")
                                      }
                                    >
                                      {action}
                                    </div>
                                  )
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add New Workbook */}
                  <div className="col-md-3 col-sm-6 mb-3">
                    <div
                      className="card text-center shadow-sm card-hover"
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

            {/* Modal for Create or Edit Workbook */}
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
                      <h5 className="modal-title">
                        {editingIndex !== null
                          ? "Edit Workbook"
                          : "Create New Workbook"}
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={closeModal}
                      ></button>
                    </div>

                    <div className="modal-body">
                      <form onSubmit={handleCreateOrUpdateWorkbook}>
                        <div className="mb-3 text-start">
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

                        <div className="mb-3 text-start">
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

                        <div className="modal-footer d-flex justify-content-end">
                          <button type="submit" className="btn btn-primary">
                            {editingIndex !== null
                              ? "Update Workbook"
                              : "Create Workbook"}
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
      {/* Notification Popup */}
      <NotificationPopup
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
        notifications={dummyNotifications}
      />
    </>
  );
}

export default App;
