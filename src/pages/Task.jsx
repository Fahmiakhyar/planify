import React, { useState, useRef, useEffect } from "react";
import '../task.css';

function App() {
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const [activeTab, setActiveTab] = useState("Task");
  const [popupVisible, setPopupVisible] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [reminder, setReminder] = useState("1 Day before");
  const [tasks, setTasks] = useState({
    "To Do": [],
    "In Progress": [],
    Done: [],
  });
  const [currentColumn, setCurrentColumn] = useState("To Do");
  const menuRef = useRef(null);
  const [activeMenuId, setActiveMenuId] = useState(null);

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

  const openPopup = (column) => {
    setCurrentColumn(column);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setTaskName("");
    setTaskDescription("");
    setDueDate("");
    setReminder("1 Day before");
  };

  const saveTask = () => {
    const newTask = {
      name: taskName,
      description: taskDescription,
      dueDate: dueDate,
      reminder: reminder,
    };

    setTasks((prevTasks) => ({
      ...prevTasks,
      [currentColumn]: [...prevTasks[currentColumn], newTask],
    }));

    closePopup();
  };

  const deleteTask = (column, index) => {
    const updatedTasks = [...tasks[column]];
    updatedTasks.splice(index, 1);
    setTasks({ ...tasks, [column]: updatedTasks });
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
            aria-label="Workbook and notes content"
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
                    className={`fas fa-${
                      tab === "Calendar"
                        ? "calendar"
                        : tab === "Tasks"
                        ? "tasks"
                        : "sticky-note"
                    }`}
                    style={{ marginRight: "6px" }}
                  />
                  {tab}
                </div>
              ))}
            </nav>

            <div className="kanban-wrapper">
              {Object.keys(tasks).map((column) => (
                <div key={column} className="kanban-column">
                  <div className="column-header">
                    <div className="column-title">{column}</div>
                  </div>
                  <div className="task-list">
                    {tasks[column].map((task, index) => (
                      <div className="task-card" key={index}>
                        <div className="task-title">{task.name}</div>
                        <div className="task-description">
                          {task.description}
                        </div>
                        <div className="task-due-date">Due: {task.dueDate}</div>
                        <div className="task-reminder">
                          Reminder: {task.reminder}
                        </div>
                        <button
                          className="btn btn-sm btn-danger mt-2"
                          onClick={() => deleteTask(column, index)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    className="add-list-btn"
                    onClick={() => openPopup(column)}
                  >
                    + Add List
                  </button>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Popup Overlay */}
      {popupVisible && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center">
          <div
            className="bg-white p-4 rounded shadow"
            style={{ width: "380px" }}
          >
            <h5 className="mb-3 fw-bold">Add Task - {currentColumn}</h5>

            <div className="mb-3">
              <label
                htmlFor="taskName"
                className="form-label fw-semibold text-muted"
              >
                Task Name
              </label>
              <input
                type="text"
                id="taskName"
                className="form-control"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="taskDescription"
                className="form-label fw-semibold text-muted"
              >
                Description
              </label>
              <textarea
                id="taskDescription"
                className="form-control"
                rows="2"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-3">
              <label
                htmlFor="dueDate"
                className="form-label fw-semibold text-muted"
              >
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                className="form-control"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="reminder"
                className="form-label fw-semibold text-muted"
              >
                Reminder
              </label>
              <select
                id="reminder"
                className="form-select"
                value={reminder}
                onChange={(e) => setReminder(e.target.value)}
              >
                <option value="1 Day before">1 Day before</option>
                <option value="2 Days before">2 Days before</option>
                <option value="1 Week before">1 Week before</option>
                <option value="On the day">On the day</option>
              </select>
            </div>

            <div className="d-flex justify-content-between">
              <button className="btn btn-secondary" onClick={closePopup}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={saveTask}>
                Save Task
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
