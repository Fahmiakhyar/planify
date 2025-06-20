import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/sidebar";
import NotificationPopup from "../components/Notif";

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
          <i className="fas fa-home toggle-sidebar mb-2" onClick={toggleRightSidebar} />
          <i className="fas fa-clock toggle-sidebar mb-2" onClick={toggleRightSidebar} />
          <i className="fas fa-star toggle-sidebar" onClick={toggleRightSidebar} />
          <div className="sidebar-bottom-icons">
            <i className="fas fa-gem toggle-sidebar mb-1" onClick={toggleRightSidebar} />
            <i className="fas fa-cog toggle-sidebar mb-1" onClick={toggleRightSidebar} />
            <i className="fas fa-sign-out-alt toggle-sidebar" onClick={toggleRightSidebar} />
          </div>
        </div>

        <div className={`sidebar-right ${showRightSidebar ? "show" : ""}`} aria-hidden={!showRightSidebar}>
          <Sidebar />
        </div>

        <main className="content flex-grow-1" role="main">
          <header className="app-header" role="banner">
            <div aria-label="Planify logo" className="logo d-flex align-items-center">
              <img
                src="/logo%20planify%20new.png"
                alt="Planify Logo"
                width="36"
                height="36"
                className="me-2"
              />
              Planify
            </div>

            <nav aria-label="User actions" className="nav-actions">
              <button className="btn-icon" aria-label="Notification" onClick={() => setIsNotifOpen(true)}>
                <i className="far fa-bell"></i>
              </button>
              <button className="premium-btn" aria-label="Go Premium">
                Go Premium
              </button>
            </nav>
          </header>

          <section className="workbook-container">
            <div className="workbook-header">
              <h1 className="workbook-title">Wuling's Workbook</h1>
            </div>

            <nav aria-label="Workbook tabs" className="tab-nav" role="tablist">
              {Object.keys(tabRoutes).map((tab) => {
                const iconClass =
                  tab === "Calendar" ? "calendar" : tab === "Tasks" ? "tasks" : "sticky-note";

                return (
                  <Link
                    to={tabRoutes[tab]}
                    key={tab}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div
                      className={`tab-item ${activeTab === tab ? "active" : ""}`}
                      onClick={() => handleTabClick(tab)}
                      role="tab"
                      aria-selected={activeTab === tab}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") handleTabClick(tab);
                      }}
                    >
                      <i className={`fas fa-${iconClass}`} style={{ marginRight: "6px" }} />
                      {tab}
                    </div>
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
                        <div className="task-description">{task.description}</div>
                        <div className="task-due-date">Due: {task.dueDate}</div>
                        <div className="task-reminder">Reminder: {task.reminderDate}</div>
                        <button className="btn btn-sm btn-danger mt-2" onClick={() => deleteTask(column, index)}>
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                  <button className="add-list-btn" onClick={() => openPopup(column)}>
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
            <span className="close-btn" onClick={closePopup} style={{ cursor: "pointer" }}>
              &times;
            </span>
            <h4 style={{ paddingBottom: "30px", textAlign: "center" }}>Add New Task</h4>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveTask();
              }}
            >
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="taskName" className="form-label">Task Name</label>
                  <input
                    type="text"
                    id="taskName"
                    className="form-control"
                    value={newTask.name}
                    onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="taskDescription" className="form-label">Description</label>
                  <textarea
                    id="taskDescription"
                    className="form-control"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="taskDueDate" className="form-label">Due Date</label>
                  <input
                    type="date"
                    id="taskDueDate"
                    className="form-control"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="taskReminderDate" className="form-label">Due Date Reminder</label>
                  <input
                    type="date"
                    id="taskReminderDate"
                    className="form-control"
                    value={newTask.reminderDate}
                    onChange={(e) => setNewTask({ ...newTask, reminderDate: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="taskReminderTime" className="form-label">Reminder Time</label>
                  <input
                    type="time"
                    id="taskReminderTime"
                    className="form-control"
                    value={newTask.reminderTime}
                    onChange={(e) => setNewTask({ ...newTask, reminderTime: e.target.value })}
                    required
                  />
                </div>

              </div>

              <div className="row justify-content-end">
                <div className="col-auto">
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

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
