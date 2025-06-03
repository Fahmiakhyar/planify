import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/sidebar";
import "../pages/kalender.css";

const taskDetails = {
  "2025-05-02": {
    title: "Interview",
    description: "Online interview with client regarding wireframe approval.",
    status: "●",
    createdBy: "img/profile.png",
    dueDate: "May 2, 2025",
    createdDate: "April 30, 2025",
    link: "https://www.valid-url.com/interview",
    file: "empty",
  },
  "2025-05-05": {
    title: "Big Idea",
    description: "Create a big idea for the project.",
    status: "●",
    createdBy: "img/profile.png",
    dueDate: "May 5, 2025",
    createdDate: "May 1, 2025",
    link: "https://www.valid-url.com/big-idea",
    file: "empty",
  },
  "2025-05-10": {
    title: "User  Flow",
    description: "Finalize user flow design.",
    status: "●",
    createdBy: "img/profile.png",
    dueDate: "May 10, 2025",
    createdDate: "May 4, 2025",
    link: "https://www.valid-url.com/user-flow",
    file: "empty",
  },
};

function App() {
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const [activeTab, setActiveTab] = useState("Calendar");
  const [, setActiveMenuId] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupData, setPopupData] = useState({});
  const [taskInputVisible, setTaskInputVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    dueDate: "",
    reminderDate: "",
    reminderTime: "",
    status: "To Do",
  });

  const fileInputRef = useRef(null);
  const linkInputRef = useRef(null);
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

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const openPopup = (date) => {
    const data = taskDetails[date];
    if (data) {
      setPopupData(data);
      setPopupVisible(true);
    } else {
      setCurrentDate(date);
      setTaskInputVisible(true);
    }
  };

  const closePopup = () => {
    setPopupVisible(false);
    setPopupData({});
  };

  const handleSaveTask = () => {
    taskDetails[currentDate] = {
      title: newTask.name,
      description: newTask.description,
      status: newTask.status, // Use the status from the newTask state
      createdBy: "img/profile.png",
      dueDate: newTask.dueDate,
      createdDate: new Date().toLocaleDateString(),
      link: "",
      file: "empty",
    };
    setTaskInputVisible(false);
    setNewTask({
      name: "",
      description: "",
      dueDate: "",
      reminderDate: "",
      reminderTime: "",
      status: "To Do",
    }); // Reset form
  };

  const tabRoutes = {
    Calendar: "/Calendar",
    Tasks: "/Task",
    Notes: "/Notes",
  };

  return (
    <>
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <title>Planify - Calendar</title>
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
                    to={tabRoutes[tab]} // arahkan ke route yang benar
                    key={tab}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {tabContent}
                  </Link>
                );
              })}
            </nav>

            <div className="calendar-header">
              <div className="month-nav" role="group">
                <button
                  aria-label="Previous month"
                  className="nav-arrow"
                  tabIndex="0"
                  type="button"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <div
                  aria-atomic="true"
                  aria-live="polite"
                  className="month-title"
                >
                  May 2025
                </div>
                <button
                  aria-label="Next month"
                  className="nav-arrow"
                  tabIndex="0"
                  type="button"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>

            <table
              aria-label="Calendar for May 2025"
              className="calendar-grid"
              role="grid"
            >
              <thead>
                <tr>
                  <th scope="col">Sunday</th>
                  <th scope="col">Monday</th>
                  <th scope="col">Tuesday</th>
                  <th scope="col">Wednesday</th>
                  <th scope="col">Thursday</th>
                  <th scope="col">Friday</th>
                  <th scope="col">Saturday</th>
                </tr>
              </thead>
              <tbody>
                {/* Week 1 */}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td onClick={() => openPopup("2025-05-01")}>
                    <div className="day-number">1</div>
                    <div className="event-list"></div>
                  </td>
                  <td onClick={() => openPopup("2025-05-02")}>
                    <div className="day-number">2</div>
                    <div className="event-list">
                      <div
                        className="event event-blue"
                        title="Interview"
                        id="task-interview"
                      >
                        Interview
                      </div>
                    </div>
                  </td>
                  <td onClick={() => openPopup("2025-05-03")}>
                    <div className="day-number">3</div>
                    <div className="event-list"></div>
                  </td>
                </tr>

                {/* Week 2 */}
                <tr>
                  <td onClick={() => openPopup("2025-05-04")}>
                    <div className="day-number">4</div>
                    <div className="event-list"></div>
                  </td>
                  <td onClick={() => openPopup("2025-05-05")}>
                    <div className="day-number">5</div>
                    <div className="event-list">
                      <div
                        className="event event-blue"
                        title="Big Idea"
                        id="task-big-idea"
                      >
                        Big Idea
                      </div>
                      <div
                        className="event event-blue"
                        title="Work Planning"
                        id="task-planning"
                      >
                        Work Planning
                      </div>
                    </div>
                  </td>
                  <td onClick={() => openPopup("2025-05-06")}>
                    <div className="day-number">6</div>
                    <div className="event-list"></div>
                  </td>
                  <td onClick={() => openPopup("2025-05-07")}>
                    <div className="day-number">7</div>
                    <div className="event-list"></div>
                  </td>
                  <td onClick={() => openPopup("2025-05-08")}>
                    <div className="day-number">8</div>
                    <div className="event-list"></div>
                  </td>
                  <td onClick={() => openPopup("2025-05-09")}>
                    <div className="day-number">9</div>
                    <div className="event-list"></div>
                  </td>
                  <td onClick={() => openPopup("2025-05-10")}>
                    <div className="day-number">10</div>
                    <div className="event-list">
                      <div
                        className="event event-green"
                        title="User  Flow"
                        id="task-user-flow"
                      >
                        User Flow
                      </div>
                    </div>
                  </td>
                </tr>

                {/* Week 3 */}
                <tr>
                  <td onClick={() => openPopup("2025-05-11")}>
                    <div className="day-number">11</div>
                    <div className="event-list"></div>
                  </td>
                  <td onClick={() => openPopup("2025-05-12")}>
                    <div className="day-number">12</div>
                    <div className="event-list"></div>
                  </td>
                  <td onClick={() => openPopup("2025-05-13")}>
                    <div className="day-number">13</div>
                    <div className="event-list">
                      <div
                        className="event event-red"
                        title="Call"
                        id="task-call"
                      >
                        Call
                      </div>
                    </div>
                  </td>
                  <td onClick={() => openPopup("2025-05-14")}>
                    <div className="day-number">14</div>
                    <div className="event-list">
                      <div className="event event-red" title="HR" id="task-hr">
                        HR
                      </div>
                    </div>
                  </td>
                  <td onClick={() => openPopup("2025-05-15")}>
                    <div className="day-number">15</div>
                    <div className="event-list"></div>
                  </td>
                  <td onClick={() => openPopup("2025-05-16")}>
                    <div className="day-number">16</div>
                    <div className="event-list"></div>
                  </td>
                  <td onClick={() => openPopup("2025-05-17")}>
                    <div className="day-number">17</div>
                    <div className="event-list"></div>
                  </td>
                </tr>

                {/* Week 4 */}
                <tr>
                  <td onClick={() => openPopup("2025-05-18")}>
                    <div className="day-number">18</div>
                    <div className="event-list"></div>
                  </td>
                  <td onClick={() => openPopup("2025-05-19")}>
                    <div className="day-number">19</div>
                    <div className="event-list">
                      <div
                        className="event event-purple"
                        title="Loft"
                        id="task-loft"
                      >
                        Loft
                      </div>
                    </div>
                  </td>
                  <td onClick={() => openPopup("2025-05-20")}>
                    <div className="day-number">20</div>
                    <div className="event-list"></div>
                  </td>
                  <td onClick={() => openPopup("2025-05-21")}>
                    <div className="day-number">21</div>
                    <div className="event-list"></div>
                  </td>
                  <td onClick={() => openPopup("2025-05-22")}>
                    <div className="day-number">22</div>
                    <div className="event-list"></div>
                  </td>
                  <td onClick={() => openPopup("2025-05-23")}>
                    <div className="day-number">23</div>
                    <div className="event-list"></div>
                  </td>
                  <td onClick={() => openPopup("2025-05-24")}>
                    <div className="day-number">24</div>
                    <div className="event-list"></div>
                  </td>
                </tr>

                {/* Week 5 */}
                <tr>
                  <td onClick={() => openPopup("2025-05-25")}>
                    <div className="day-number">25</div>
                    <div className="event-list"></div>
                  </td>
                  <td onClick={() => openPopup("2025-05-26")}>
                    <div className="day-number">26</div>
                    <div className="event-list"></div>
                  </td>
                  <td onClick={() => openPopup("2025-05-27")}>
                    <div className="day-number">27</div>
                    <div className="event-list"></div>
                  </td>
                  <td onClick={() => openPopup("2025-05-28")}>
                    <div className="day-number">28</div>
                    <div className="event-list"></div>
                  </td>
                  <td onClick={() => openPopup("2025-05-29")}>
                    <div className="day-number">29</div>
                    <div className="event-list"></div>
                  </td>
                  <td onClick={() => openPopup("2025-05-30")}>
                    <div className="day-number">30</div>
                    <div className="event-list"></div>
                  </td>
                  <td onClick={() => openPopup("2025-05-31")}>
                    <div className="day-number">31</div>
                    <div className="event-list"></div>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Popup Overlay for Task Details */}
            {popupVisible && (
              <div className="modal" style={{ display: "flex" }}>
                <div className="modal-content2">
                  <span className="close-btn" onClick={closePopup}>
                    &times;
                  </span>
                  <h2>{popupData.title}</h2>
                  <p>{popupData.description}</p>
                  <div className="task-info">
                    <p>
                      <strong>Status:</strong>{" "}
                      {popupData.status === "●" && (
                        <>
                          <i className="fas fa-circle-dot text-secondary me-1"></i>{" "}
                          To Do
                        </>
                      )}
                      {popupData.status === "Doing" && (
                        <>
                          <i className="fas fa-spinner text-warning me-1"></i>{" "}
                          Doing
                        </>
                      )}
                      {popupData.status === "Done" && (
                        <>
                          <i className="fas fa-check-circle text-success me-1"></i>{" "}
                          Done
                        </>
                      )}
                    </p>

                    <p>
                      <strong>Created by:</strong>{" "}
                      <img
                        src={popupData.createdBy}
                        alt="User  "
                        style={{
                          borderRadius: "50%",
                          verticalAlign: "middle",
                          width: 24,
                          height: 24,
                        }}
                      />
                    </p>
                    <p>
                      <strong>Due Date:</strong> {popupData.dueDate}
                    </p>
                    <p>
                      <strong>Created Date:</strong> {popupData.createdDate}
                    </p>
                    <p>
                      <strong>Link:</strong>
                      {popupData.link ? (
                        <a
                          href={popupData.link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Link
                        </a>
                      ) : (
                        "No link available"
                      )}
                    </p>
                    <p>
                      <strong>File:</strong> {popupData.file}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Task Input Form Overlay */}
            {taskInputVisible && (
              <div className="modal2" style={{ display: "flex" }}>
                <div className="modal-content2">
                  <span
                    className="close-btn"
                    onClick={() => setTaskInputVisible(false)}
                    style={{ cursor: "pointer" }}
                  >
                    &times;
                  </span>
                  <h2>Add New Task</h2>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSaveTask();
                    }}
                  >
                    <div className="mb-3">
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

                    <div className="mb-3">
                      <label className="form-label d-block">Task Status</label>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="taskStatus"
                          id="statusTodo"
                          value="To Do"
                          checked={newTask.status === "To Do"}
                          onChange={(e) =>
                            setNewTask({ ...newTask, status: e.target.value })
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="statusTodo"
                        >
                          <i className="fas fa-circle-dot text-secondary me-1"></i>{" "}
                          To Do
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="taskStatus"
                          id="statusDoing"
                          value="Doing"
                          checked={newTask.status === "Doing"}
                          onChange={(e) =>
                            setNewTask({ ...newTask, status: e.target.value })
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="statusDoing"
                        >
                          <i className="fas fa-spinner text-warning me-1"></i>{" "}
                          Doing
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="taskStatus"
                          id="statusDone"
                          value="Done"
                          checked={newTask.status === "Done"}
                          onChange={(e) =>
                            setNewTask({ ...newTask, status: e.target.value })
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="statusDone"
                        >
                          <i className="fas fa-check-circle text-success me-1"></i>{" "}
                          Done
                        </label>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="taskDescription" className="form-label">
                        Description
                      </label>
                      <textarea
                        id="taskDescription"
                        className="form-control"
                        value={newTask.description}
                        onChange={(e) =>
                          setNewTask({
                            ...newTask,
                            description: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="mb-3">
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

                    <div className="mb-3">
                      <label htmlFor="taskReminderDate" className="form-label">
                        Due Date Reminder
                      </label>
                      <input
                        type="date"
                        id="taskReminderDate"
                        className="form-control"
                        value={newTask.reminderDate}
                        onChange={(e) =>
                          setNewTask({
                            ...newTask,
                            reminderDate: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="taskReminderTime" className="form-label">
                        Reminder Time
                      </label>
                      <input
                        type="time"
                        id="taskReminderTime"
                        className="form-control"
                        value={newTask.reminderTime || ""}
                        onChange={(e) =>
                          setNewTask({
                            ...newTask,
                            reminderTime: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="icon-container">
                      {/* Ikon Upload File */}
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

                      {/* Ikon Link */}
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

                    <div className="text-end">
                      <button type="submit" className="btn btn-primary">
                        Save Task
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
