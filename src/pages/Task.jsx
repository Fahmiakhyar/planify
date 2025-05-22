import "./App.css";
import { useState, useRef, useEffect } from "react";

function App() {
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const [activeTab, setActiveTab] = useState("Tasks");
  const [showAddTaskPopup, setShowAddTaskPopup] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [activeMenuId, setActiveMenuId] = useState(null);
  const menuRef = useRef(null);

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

  const openAddTaskPopup = () => {
    setShowAddTaskPopup(true);
  };

  const closeAddTaskPopup = () => {
    setShowAddTaskPopup(false);
    setTaskTitle("");
    setTaskDescription("");
  };

  const saveTask = () => {
    if (taskTitle.trim() === "" || taskDescription.trim() === "") {
      alert("Title and description cannot be empty!");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      description: taskDescription,
    };

    setTasks([...tasks, newTask]);
    closeAddTaskPopup();
  };

  const toggleTaskMenu = (taskId, e) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === taskId ? null : taskId);
  };

  const handleTaskAction = (action, taskId) => {
    switch (action) {
      case "Edit":
        const taskToEdit = tasks.find((task) => task.id === taskId);
        if (taskToEdit) {
          setTaskTitle(taskToEdit.title);
          setTaskDescription(taskToEdit.description);
          setShowAddTaskPopup(true);
          setTasks(tasks.filter((task) => task.id !== taskId));
        }
        break;
      case "Delete":
        setTasks(tasks.filter((task) => task.id !== taskId));
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
      <title>Planify - Tasks</title>
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
              <li className="bottom-menu">
                <i className="fas fa-cog"></i> Setting
              </li>
              <li>
                <i className="fas fa-sign-out-alt"></i> Logout
              </li>
            </ul>
          </div>
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
              <button
                aria-label="Message"
                className="btn-icon"
                title="Message"
                type="button"
              >
                <i className="far fa-envelope"> </i>
              </button>
              <button
                aria-label="Notification"
                className="btn-icon"
                title="Notification"
                type="button"
              >
                <i className="far fa-bell"> </i>
              </button>
              <button
                aria-label="Help"
                className="btn-icon"
                title="Help"
                type="button"
              >
                <i className="far fa-circle-question"> </i>
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
            aria-label="Workbook and task board content"
            className="workbook-container"
          >
            <div className="workbook-header">
              <h1 className="workbook-title">Wuling's Workbook</h1>
            </div>

            <nav aria-label="Workbook tabs" className="tab-nav" role="tablist">
              {["Calendar", "Tasks", "Notes"].map((tab) => (
                <div
                  key={tab}
                  className={`tab-item ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                  role="tab"
                  aria-selected={activeTab === tab}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setActiveTab(tab);
                    }
                  }}
                >
                  <i
                    className={`fas fa-${
                      tab === "Calendar"
                        ? "calendar"
                        : tab === "Tasks"
                        ? "tasks"
                        : "sticky-note"
                    }`}
                  />
                  {tab}
                </div>
              ))}
            </nav>

            <div className="kanban-wrapper">
              {/* To-Do Column */}
              <div className="kanban-column">
                <div className="column-header">
                  <div className="column-title">To-Do</div>
                </div>
                <div className="task-list">
                  {tasks.map((task) => (
                    <div className="task-card" key={task.id}>
                      <div className="column-actions">
                        <i
                          className="fas fa-ellipsis-h"
                          onClick={(e) => toggleTaskMenu(task.id, e)}
                          style={{ cursor: "pointer" }}
                        ></i>
                        {activeMenuId === task.id && (
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
                              zIndex: "1000",
                              minWidth: "120px",
                              padding: "8px 0",
                            }}
                          >
                            {["Edit", "Delete"].map((action) => (
                              <div
                                key={action}
                                onClick={() => handleTaskAction(action, task.id)}
                                style={{
                                  padding: "12px 20px",
                                  cursor: "pointer",
                                  fontSize: "14px",
                                  color: "#333",
                                  transition: "background-color 0.2s",
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
                      <div className="task-title">{task.title}</div>
                      <div className="task-description">{task.description}</div>
                    </div>
                  ))}
                </div>
                <button className="add-list-btn" onClick={openAddTaskPopup}>
                  + Add Task
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>

      <div
        id="taskPopupOverlay"
        className={`popup-overlay ${showAddTaskPopup ? "active" : ""}`}
        onClick={(e) => {
          if (e.target.id === "taskPopupOverlay") {
            closeAddTaskPopup();
          }
        }}
      >
        <div
          className="popup-content"
          role="dialog"
          aria-modal="true"
          aria-labelledby="popupTitle"
        >
          <div className="popup-header">
            <h2 className="popup-title" id="popupTitle">
              Add Task
            </h2>
          </div>
          <div className="popup-body">
            <form
              className="popup-form"
              onSubmit={(e) => {
                e.preventDefault();
                saveTask();
              }}
              id="taskForm"
            >
              <div className="form-group">
                <label htmlFor="taskTitle">Title</label>
                <input
                  type="text"
                  id="taskTitle"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label htmlFor="taskDesc">Description</label>
                <textarea
                  id="taskDesc"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                />
              </div>
              <div className="popup-footer">
                <button type="button" className="save-btn" onClick={saveTask}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
