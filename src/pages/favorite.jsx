import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import NotificationPopup from "../components/Notif";
import "../pages/works.css";

function App() {
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const [favorites, setFavorites] = useState([]);
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
    if (favorites.includes(item)) {
      setFavorites(favorites.filter((fav) => fav !== item)); // Hapus dari favorit
    } else {
      setFavorites([...favorites, item]); // Tambah ke favorit
    }
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
        {/* Sidebar kiri */}
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

        {/* Sidebar kanan */}
        <div
          className={`sidebar-right ${showRightSidebar ? "show" : ""}`}
          aria-hidden={!showRightSidebar}
        >
          <Sidebar />
        </div>

        {/* Konten utama */}
        <main className="content flex-grow-1" role="main">
          <header className="app-header" role="banner">
            <div className="logo">
              <div className="logo-icon">
                <i className="fas fa-calendar-check"></i>
              </div>
              Planify
            </div>
            <nav className="nav-actions">
              <button className="btn-icon" aria-label="Notification"  onClick={() => setIsNotifOpen(true)}>
                <i className="far fa-bell"></i>
              </button>
              
              <button className="premium-btn" aria-label="Go Premium">
                Go Premium
              </button>
            </nav>
          </header>

          <div className="container-fluid mt-4">
            <h2 className="h4 mb-3">Favorite</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {workbooks.map((item, index) => (
                  <tr key={index}>
                    <td className="d-flex align-items-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        width="50"
                        className="me-2"
                      />
                      {item.title}
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <i
                          className={`fas fa-star ${favorites.includes(item) ? 'text-warning' : 'text-muted'}`}
                          onClick={() => handleFavoriteClick(item)}
                          style={{ cursor: "pointer", fontSize: "18px" }}
                        />
                      </div>
                    </td>
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
