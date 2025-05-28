import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/sidebar";
import "../pages/task.css";

function App() {
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const [activeTab, setActiveTab] = useState("Tasks");
  const [popupVisible, setPopupVisible] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [reminder, setReminder] = useState("1 Day before");
  const [tasks, setTasks] = useState({
    "To Do": [],
    " Doing": [],
    Done: [],
  });
  const [currentColumn, setCurrentColumn] = useState("To Do");
  const menuRef = useRef(null);
  const popupRef = useRef(null);
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

  useEffect(() => {
    function handleClickOutsidePopup(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopup();
      }
    }

    if (popupVisible) {
      document.addEventListener("mousedown", handleClickOutsidePopup);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsidePopup);
    };
  }, [popupVisible]);

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
          <Sidebar/>
        </div>

        <main className="content flex-grow-1" role="main">
          <header className="app-header" role="banner">
            <div aria-label="Planify logo" className="logo">
              <div aria-hidden="true" className="logo-icon">
                <i className="fas fa-calendar-check"> </i>
              </div>
              Planify
            </div>
            <nav aria-label="User actions" className="nav-actions">
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
                alt="User Avatar"
                width="40"
                height="40"
              />
            </nav>
          </header>

          <section className="workbook-container">
            <div className="workbook-header">
              <h1 className="workbook-title">Wuling's Workbook</h1>
            </div>

            <nav className="tab-nav" role="tablist">
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
                  >
                    <i
                      className={`fas fa-${iconClass}`}
                      style={{ marginRight: "6px" }}
                    />
                    {tab}
                  </div>
                );

                return tab === "Calendar" ? (
                  <Link
                    to="/kalender"
                    key={tab}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {tabContent}
                  </Link>
                ) : (
                  <Link
                    to="/Notes"
                    key={tab}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {tabContent}
                  </Link>
                );
              })}
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
        <div className="custom-popup-overlay2">
          <div className="custom-popup-box" ref={popupRef}>
            <h5 className="custom-popup-title">Add Task - {currentColumn}</h5>

            <div className="custom-form-group">
              <label htmlFor="taskName" className="custom-label">
                Task Name
              </label>
              <input
                type="text"
                id="taskName"
                className="custom-input"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>

            <div className="custom-form-group">
              <label htmlFor="taskDescription" className="custom-label">
                Description
              </label>
              <textarea
                id="taskDescription"
                className="custom-input"
                rows="2"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="custom-form-group">
              <label htmlFor="dueDate" className="custom-label">
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                className="custom-input"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <div className="custom-form-group">
              <label htmlFor="reminder" className="custom-label">
                Reminder
              </label>
              <select
                id="reminder"
                className="custom-input"
                value={reminder}
                onChange={(e) => setReminder(e.target.value)}
              >
                <option value="1 Day before">1 Day before</option>
                <option value="2 Days before">2 Days before</option>
                <option value="1 Week before">1 Week before</option>
                <option value="On the day">On the day</option>
              </select>
            </div>

            <div className="custom-popup-actions">
              <button className="btn-save" onClick={saveTask}>
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
