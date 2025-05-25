import React, { useState, useRef, useEffect } from "react";
import "../pages/kalender.css";

function App() {
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const [activeTab, setActiveTab] = useState("Calendar");
  const [, setActiveMenuId] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [, setSelectedDate] = useState(null);
  const [popupDetails, setPopupDetails] = useState({}); // State for popup details
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
    setSelectedDate(date);
    setPopupDetails(getPopupDetails(date)); // Fetch details based on date
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setSelectedDate(null);
  };

  // Function to get popup details based on the date
  const getPopupDetails = (date) => {
    const details = {
      "2025-05-02": {
        title: "Interview",
        description: "Interview scheduled for the position.",
        status: "Pending",
        createdBy: "User  A",
        dueDate: "May 2, 2025",
        createdDate: "April 30, 2025 10:00",
        link: "https://www.example.com/interview",
        file: "empty",
      },
      "2025-05-05": {
        title: "Big Idea",
        description: "Create a big idea for the project.",
        status: "In Progress",
        createdBy: "User  B",
        dueDate: "May 5, 2025",
        createdDate: "May 1, 2025 12:00",
        link: "https://www.example.com/big-idea",
        file: "empty",
      },
      // Add more details for other dates as needed
    };
    return details[date] || {};
  };

  return (
    <>
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <title>Planify - Calender</title>
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

            <div className="calendar-header">
              <div className="month-nav" role="group">
                <button aria-label="Previous month" className="nav-arrow" tabIndex="0" type="button">
                  <i className="fas fa-chevron-left"></i>
                </button>
                <div aria-atomic="true" aria-live="polite" className="month-title">
                  May 2025
                </div>
                <button aria-label="Next month" className="nav-arrow" tabIndex="0" type="button">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>

            <table aria-label="Calendar for May 2025" className="calendar-grid" role="grid">
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
                      <div className="event event-blue" title="Interview" id="task-interview">Interview</div>
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
                      <div className="event event-blue" title="Big Idea" id="task-big-idea">Big Idea</div>
                      <div className="event event-blue" title="Work Planning" id="task-planning">Work Planning</div>
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
                      <div className="event event-green" title="User  Flow" id="task-user-flow">User  Flow</div>
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
                      <div className="event event-red" title="Call" id="task-call">Call</div>
                    </div>
                  </td>
                  <td onClick={() => openPopup("2025-05-14")}>
                    <div className="day-number">14</div>
                    <div className="event-list">
                      <div className="event event-red" title="HR" id="task-hr">HR</div>
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
                      <div className="event event-purple" title="Loft" id="task-loft">Loft</div>
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

            {/* Popup Overlay */}
            {popupVisible && (
              <div className="popup-overlay">
                <div className="popup-card">
                  <h2 className="popup-title">{popupDetails.title}</h2>
                  <p className="popup-description">{popupDetails.description}</p>

                  <div className="popup-detail">
                    <div className="popup-row">
                      <span className="icon">🕒</span>
                      <span>Status</span>
                      <span className="status-circle">{popupDetails.status}</span>
                    </div>
                    <div className="popup-row">
                      <span className="icon">👤</span>
                      <span>Created by</span>
                      <img src="https://i.pravatar.cc/24" alt="User " className="avatar" />
                    </div>
                    <div className="popup-row">
                      <span className="icon">📅</span>
                      <span>Due Date</span>
                      <span className="value">{popupDetails.dueDate}</span>
                    </div>
                    <div className="popup-row">
                      <span className="icon">⏰</span>
                      <span>Created Date</span>
                      <span className="value">{popupDetails.createdDate}</span>
                    </div>
                    <div className="popup-row">
                      <span className="icon">🔗</span>
                      <span>Link</span>
                      <a href={popupDetails.link} className="value" target="_blank" rel="noopener noreferrer">{popupDetails.link}</a>
                    </div>
                    <div className="popup-row">
                      <span className="icon">📁</span>
                      <span>File</span>
                      <span className="value">{popupDetails.file}</span>
                    </div>
                  </div>
                  <button onClick={closePopup} className="btn btn-primary mt-3">Close</button>
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

