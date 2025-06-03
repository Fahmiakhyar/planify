import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/sidebar";
import "../pages/task.css";

function App() {
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const [activeTab, setActiveTab] = useState("Tasks");
  const [taskInputVisible, setTaskInputVisible] = useState(false);
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    dueDate: "",
    reminderDate: "",
    reminderTime: "",
  });

  const [tasks, setTasks] = useState({
    "To Do": [],
    Doing: [],
    Done: [],
  });
  const [currentColumn, setCurrentColumn] = useState("To Do");
  const fileInputRef = useRef(null);
  const linkInputRef = useRef(null);

  const toggleRightSidebar = () => {
    setShowRightSidebar(!showRightSidebar);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const openPopup = (column) => {
    setCurrentColumn(column);
    setTaskInputVisible(true);
  };

  const closePopup = () => {
    setTaskInputVisible(false);
    setNewTask({
      name: "",
      description: "",
      dueDate: "",
      reminderDate: "",
      reminderTime: "",
    });
  };

  const saveTask = () => {
    const taskToSave = { ...newTask };
    setTasks((prevTasks) => ({
      ...prevTasks,
      [currentColumn]: [...prevTasks[currentColumn], taskToSave],
    }));
    closePopup();
  };

  const deleteTask = (column, index) => {
    const updatedTasks = [...tasks[column]];
    updatedTasks.splice(index, 1);
    setTasks({ ...tasks, [column]: updatedTasks });
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
      <title>Planify - Tasks</title>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
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
              <button className="btn-icon" aria-label="Notification">
                <i className="far fa-bell"></i>
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

          <section className="workbook-container">
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
                          Reminder: {task.reminderDate}
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

      {taskInputVisible && (
        <div className="modal2" style={{ display: "flex" }}>
          <div className="modal-content2">
            <span
              className="close-btn"
              onClick={closePopup}
              style={{ cursor: "pointer" }}
            >
              &times;
            </span>
            <h4 style={{ paddingBottom: "30px", textAlign: "center" }}>
              Add New Task
            </h4>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveTask();
              }}
            >
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="taskName" className="form-label">
                    Task Name
                  </label>
                  <input
                    type="text"
                    id="taskName"
                    className="form-control"
                    value={newTask.name}
                    onChange={(e) =>
                      setNewTask({ ...newTask, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="taskDescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    id="taskDescription"
                    className="form-control"
                    value={newTask.description}
                    onChange={(e) =>
                      setNewTask({ ...newTask, description: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="taskDueDate" className="form-label">
                    Due Date
                  </label>
                  <input
                    type="date"
                    id="taskDueDate"
                    className="form-control"
                    value={newTask.dueDate}
                    onChange={(e) =>
                      setNewTask({ ...newTask, dueDate: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="taskReminderDate" className="form-label">
                    Due Date Reminder
                  </label>
                  <input
                    type="date"
                    id="taskReminderDate"
                    className="form-control"
                    value={newTask.reminderDate}
                    onChange={(e) =>
                      setNewTask({ ...newTask, reminderDate: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="taskReminderTime" className="form-label">
                    Reminder Time
                  </label>
                  <input
                    type="time"
                    id="taskReminderTime"
                    className="form-control"
                    value={newTask.reminderTime}
                    onChange={(e) =>
                      setNewTask({ ...newTask, reminderTime: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="col-md-6">
                  <div
                    className="icon-container mb-3"
                    style={{ marginTop: "25px" }}
                  >
                    <i
                      className="fas fa-file-circle-plus icon"
                      title="Upload File"
                      onClick={() => fileInputRef.current.click()}
                    ></i>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        alert(`File selected: ${file?.name}`);
                      }}
                    />

                    <i
                      className="fas fa-link icon ms-2"
                      title="Add Link"
                      onClick={() => linkInputRef.current.focus()}
                    ></i>
                    <input
                      type="url"
                      ref={linkInputRef}
                      placeholder="https://example.com"
                      className="hidden-link-input"
                      onChange={(e) => {
                        alert(`Link entered: ${e.target.value}`);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="text-end">
                <button type="submit" className="btn btn-primary">
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
