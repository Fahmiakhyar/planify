import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import NotificationPopup from "../components/Notif";
import "../pages/works.css";

function App() {
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const [favorites, setFavorites] = useState([]); // Store favorites based on title
  const [archivedWorkbooks, setArchivedWorkbooks] = useState([]); // Store archived workbooks
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

  const handleFavoriteClick = (item) => {
    if (favorites.includes(item.title)) {
      setFavorites(favorites.filter((title) => title !== item.title)); // Remove from favorites
    } else {
      setFavorites([...favorites, item.title]); // Add to favorites
    }
  };

  const handleArchiveClick = (item) => {
    setArchivedWorkbooks([...archivedWorkbooks, item]); // Archive the workbook
  };

  const workbooks = [
    {
      title: "My Planner",
      image: "https://source.unsplash.com/featured/?planner",
      createdAt: "2 hours ago",
    },
    {
      title: "Wuling's Workbook",
      image: "https://source.unsplash.com/featured/?laptop,code",
      createdAt: "2 weeks ago",
    },
    {
      title: "Workbook Group 7",
      image: "https://source.unsplash.com/featured/?notes,desk",
      createdAt: "42 minutes ago",
    },
  ];

  return (
    <>
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <title>Planify - Archived</title>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        rel="stylesheet"
      />

      <div className="d-flex">
        {/* Left Sidebar */}
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

        {/* Right Sidebar */}
        <div
          className={`sidebar-right ${showRightSidebar ? "show" : ""}`}
          aria-hidden={!showRightSidebar}
        >
          <Sidebar />
        </div>

        {/* Main Content */}
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
            <nav className="nav-actions">
              <button className="btn-icon" aria-label="Notification" onClick={() => setIsNotifOpen(true)}>
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

          {/* Archived Table */}
          <div className="container-fluid mt-4">
            <h2 className="h4 mb-3">Archived</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Edited</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {workbooks.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={item.image}
                        alt={item.title}
                        width="50"
                        className="me-2"
                      />
                      {item.title}
                    </td>
                    <td>Public</td>
                    <td>{item.createdAt}</td>
                    <td>
                      <i
                        className={`fas fa-star ${
                          favorites.includes(item.title)
                            ? "text-warning"
                            : "text-muted"
                        }`}
                        onClick={() => handleFavoriteClick(item)}
                        style={{ cursor: "pointer", transition: "0.3s ease" }}
                      />
                      <i
                        className="fas fa-archive ms-2"
                        onClick={() => handleArchiveClick(item)}
                        style={{ cursor: "pointer", transition: "0.3s ease" }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Archived Workbooks Section */}
          <div className="container-fluid mt-4">
            <h2 className="h4 mb-3">Archived Workbooks</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Edited</th>
                </tr>
              </thead>
              <tbody>
                {archivedWorkbooks.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={item.image}
                        alt={item.title}
                        width="50"
                        className="me-2"
                      />
                      {item.title}
                    </td>
                    <td>Public</td>
                    <td>{item.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
