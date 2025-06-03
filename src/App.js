import "./App.css";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./components/sidebar";

function App() {
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const [activeTab, setActiveTab] = useState("Notes");
  const [showAddNotePopup, setShowAddNotePopup] = useState(false);
  const [notes, setNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  // Add state to track which note's menu is currently open
  const [activeMenuId, setActiveMenuId] = useState(null);

  // Ref for tracking clicks outside the menu
  const menuRef = useRef(null);

  // Handle clicks outside of the menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenuId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleRightSidebar = () => {
    setShowRightSidebar(!showRightSidebar);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const openAddNotePopup = () => {
    setShowAddNotePopup(true);
  };

  const closeAddNotePopup = () => {
    setShowAddNotePopup(false);
    setNoteTitle("");
    setNoteContent("");
  };

  const saveNote = () => {
    if (noteTitle.trim() === "") {
      alert("Judul catatan tidak boleh kosong!");
      return;
    }

    const newNote = {
      id: Date.now(),
      title: noteTitle,
      content: noteContent,
    };

    setNotes([newNote, ...notes]);
    closeAddNotePopup();
  };

  // Toggle the menu for a specific note
  const toggleNoteMenu = (noteId, e) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === noteId ? null : noteId);
  };

  // Handle note actions
  const handleNoteAction = (action, noteId) => {
    switch (action) {
      case "Edit":
        // Find the note to edit
        const noteToEdit = notes.find((note) => note.id === noteId);
        if (noteToEdit) {
          setNoteTitle(noteToEdit.title);
          setNoteContent(noteToEdit.content);
          setShowAddNotePopup(true);
          // Remove the old note
          setNotes(notes.filter((note) => note.id !== noteId));
        }
        break;
      case "Detail":
        alert(
          `Note Details: ${notes.find((note) => note.id === noteId)?.title}`
        );
        break;
      case "Delete":
        setNotes(notes.filter((note) => note.id !== noteId));
        break;
      default:
        break;
    }
    setActiveMenuId(null);
  };
  const tabRoutes = {
    Calendar: "/kalender",
    Tasks: "/task",
    Notes: "/notes",
  };

  return (
    <>
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <title>Planify - Notes</title>
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
              <button
                aria-label="Notification"
                className="btn-icon"
                title="Notification"
                type="button"
              >
                <i className="far fa-bell"> </i>
              </button>
              <button
                aria-label="Go Premium"
                className="premium-btn"
                type="button"
              >
                Go Premium
              </button>
              <img
                alt="User  Avatar"
                className="user-avatar"
                height="40"
                src="https://storage.googleapis.com/a1aa/image/b1775588-94f7-4a59-b686-0a1dddb0891b.jpg"
                width="40"
              />
            </nav>
          </header>

          <section
            aria-label="Workbook and notes content"
            className="workbook-container"
          >
            <div className="workbook-header">
              <h1 className="workbook-title">Wuling's Workbook</h1>
            </div>

            <nav aria-label="Workbook tabs" className="tab-nav" role="tablist">
              {["Calendar", "Tasks", "Notes"].map((tab) => {
                const iconClass =
                  tab === "Calendar"
                    ? "calendar"
                    : tab === "Tasks"
                    ? "tasks"
                    : "sticky-note";

                const tabContent = (
                  <div
                    key={tab}
                    className={`tab-item ${activeTab === tab ? "active" : ""}`}
                    onClick={() => handleTabClick(tab)}
                    role="tab"
                    aria-selected={activeTab === tab}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleTabClick(tab);
                      }
                    }}
                  >
                    <i
                      className={`fas fa-${iconClass}`}
                      style={{ marginRight: "6px" }}
                    />
                    {tab}
                  </div>
                );

                return (
                  <Link
                    to={tabRoutes[tab]} // arahkan sesuai tab
                    key={tab}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {tabContent}
                  </Link>
                );
              })}
            </nav>

            <div className="notes-container">
              <div
                className="add-note-btn"
                onClick={openAddNotePopup}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    openAddNotePopup();
                  }
                }}
              >
                <span>Add Note</span>
                <i className="fas fa-plus"></i>
              </div>

              <div className="notes-grid">
                {notes.length === 0 && <p>Tidak ada catatan.</p>}
                {notes.map((note) => (
                  <div
                    className="note-card"
                    key={note.id}
                    style={{ position: "relative" }}
                  >
                    <div className="note-actions">
                      <i
                        className="fas fa-ellipsis-h"
                        onClick={(e) => toggleNoteMenu(note.id, e)}
                        style={{ cursor: "pointer" }}
                      ></i>

                      {activeMenuId === note.id && (
                        <div
                          className="crud-menu"
                          ref={menuRef}
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
                          {["Edit", "Detail", "Delete"].map((action) => (
                            <div
                              key={action}
                              onClick={() => handleNoteAction(action, note.id)}
                              style={{
                                padding: "12px 20px",
                                cursor: "pointer",
                                fontSize: "14px",
                                color: "#333",
                                transition: "background-color 0.2s",
                                zIndex: "10000",
                              }}
                              onMouseEnter={(e) =>
                                (e.target.style.backgroundColor = "#f5f5f5")
                              }
                              onMouseLeave={(e) =>
                                (e.target.style.backgroundColor = "white")
                              }
                            >
                              {action}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <h3 className="note-title">{note.title}</h3>
                    <div className="note-content">{note.content}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>

      <div
        className={`custom-popup-overlay ${showAddNotePopup ? "active" : ""}`}
        onClick={() => setShowAddNotePopup(false)} // Klik area luar menutup popup
      >
        <div
          className="custom-popup-box"
          role="dialog"
          aria-modal="true"
          aria-labelledby="popupTitle"
          onClick={(e) => e.stopPropagation()} // Mencegah klik dalam popup menutup
        >
          <h5 className="custom-popup-title" id="popupTitle">
            Add Note
          </h5>

          <form
            className="popup-form"
            onSubmit={(e) => {
              e.preventDefault();
              saveNote();
            }}
            id="noteForm"
          >
            <div className="custom-form-group">
              <label htmlFor="noteTitle" className="custom-label">
                Title
              </label>
              <input
                type="text"
                id="noteTitle"
                className="custom-input"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="custom-form-group">
              <label htmlFor="noteContent" className="custom-label">
                Content
              </label>
              <textarea
                id="noteContent"
                className="custom-input"
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
              />
            </div>

            <div className="custom-popup-actions1">
              <div className="popup-tools">
                <button type="button" className="popup-tool" title="Add Emoji">
                  <i className="far fa-smile"></i>
                </button>
                <button
                  type="button"
                  className="popup-tool"
                  title="Add Checklist"
                >
                  <i className="fas fa-tasks"></i>
                </button>
                <button type="button" className="popup-tool" title="Add Image">
                  <i className="far fa-image"></i>
                </button>
                <button
                  type="button"
                  className="popup-tool"
                  title="Add Reminder"
                >
                  <i className="far fa-bell"></i>
                </button>
              </div>

              <button type="button" className="btn-save" onClick={saveNote}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
