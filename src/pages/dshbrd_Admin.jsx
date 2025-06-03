import React, { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.fontFamily = "'Inter', sans-serif";
    document.body.style.backgroundColor = "#e6eaf3";
    document.body.style.color = "#000";
  }, []);

  const styles = {
    a: {
      textDecoration: "none",
    },
    header: {
      backgroundColor: "#fef9f8",
      display: "flex",
      alignItems: "center",
      padding: "10px 20px",
      gap: "8px",
    },
    headerImg: {
      width: "32px",
      height: "32px",
    },
    logoText: {
      fontWeight: 600,
      fontSize: "20px",
      color: "#000",
    },
    title: {
      flexGrow: 1,
      fontWeight: 600,
      fontSize: "20px",
      color: "#1a73e8",
      textAlign: "center",
    },
    signout: {
      fontSize: "12px",
      color: "#7a7a9d",
      display: "flex",
      alignItems: "center",
      gap: "4px",
      cursor: "pointer",
    },
    signoutIcon: {
      fontSize: "14px",
    },
    main: {
      padding: "20px 16px 40px",
      maxWidth: "900px",
      margin: "0 auto",
    },
    helloAdmin: {
      backgroundColor: "#1a4ed8",
      color: "#fff",
      borderRadius: "8px",
      padding: "12px 16px",
      width: "200px",
      height: "80px",
      fontWeight: 600,
      fontSize: "20px",
      lineHeight: 1.2,
      marginBottom: "20px",
    },
    helloAdminSmall: {
      display: "block",
      fontWeight: 400,
      fontSize: "10px",
      marginTop: "4px",
      color: "#d9e1ff",
    },
    navButtons: {
      backgroundColor: "#fef9f8",
      borderRadius: "12px",
      padding: "15px 16px",
      display: "flex",
      alignItems: "center",
      gap: "16px",
      Width: "fit-content",
      marginBottom: "24px",
    },
    btnDashboard: {
      cursor: "pointer",
      padding: "6px",
    },
    btnDashboardIcon: {
      fontSize: "22px",
    },
    userContainer: {
      display: "flex",
      alignItems: "center",
      background: "linear-gradient(90deg, #0038ff, #004bff)",
      borderRadius: "20px",
      padding: "10px 20px",
      color: "white",
      gap: "12px",
      cursor: "pointer",
    },
    iconUser: {
      color: "#0022ff",
      fontSize: "22px",
      backgroundColor: "transparent",
      border: "none",
    },
    textContainer: {
      display: "flex",
      flexDirection: "column",
      fontSize: "15px",
      fontWeight: "500",
    },
    iconSend: {
      fontSize: "22px",
      color: "#0022ff",
      cursor: "pointer",
      backgroundColor: "transparent",
      border: "none",
    },
    statsContainer: {
      display: "flex",
      gap: "16px",
      justifyContent: "center",
      marginBottom: "32px",
      flexWrap: "wrap",
    },
    statBox: {
      backgroundColor: "#fef9f8",
      borderRadius: "8px",
      width: "28%",
      minWidth: "160px",
      padding: "12px 0 16px",
      textAlign: "center",
    },
    statLabel: {
      backgroundColor: "#a7baff",
      color: "#fef9f8",
      fontSize: "12px",
      fontWeight: 600,
      padding: "6px 0",
      borderRadius: "4px 4px 0 0",
      userSelect: "none",
    },
    statValue: {
      backgroundColor: "#1a4ed8",
      color: "#fef9f8",
      fontWeight: 600,
      fontSize: "20px",
      padding: "8px 0",
      borderRadius: "0 0 4px 4px",
      userSelect: "none",
    },
    paymentHistory: {
      backgroundColor: "#fef9f8",
      borderRadius: "8px",
      padding: "20px 24px 24px",
    },
    paymentHistoryTitle: {
      color: "#1a4ed8",
      fontWeight: 700,
      fontSize: "16px",
      margin: "0 0 16px 0",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: "12px",
      color: "#4a4a4a",
    },
    tableHeader: {
      borderBottom: "1px solid #a7baff",
    },
    tableHeaderCell: {
      fontWeight: 600,
      paddingBottom: "8px",
      textAlign: "left",
    },
    tableBodyRow: {
      borderBottom: "1px solid #d9d9d9",
    },
    tableBodyCell: {
      padding: "8px 0",
    },
    status: {
      textAlign: "center",
    },
    statusPending: {
      backgroundColor: "#f7f9d9",
      color: "#a3a92f",
      border: "1px solid #a3a92f",
      borderRadius: "12px",
      padding: "2px 10px",
      fontWeight: 600,
      fontSize: "10px",
      display: "inline-block",
      minWidth: "60px",
    },
    statusPaid: {
      backgroundColor: "#d9f7d9",
      color: "#2fa34f",
      border: "1px solid #2fa34f",
      borderRadius: "12px",
      padding: "2px 10px",
      fontWeight: 600,
      fontSize: "10px",
      display: "inline-block",
      minWidth: "60px",
    },
    statusFailed: {
      backgroundColor: "#f9d9d9",
      color: "#a32f2f",
      border: "1px solid #a32f2f",
      borderRadius: "12px",
      padding: "2px 10px",
      fontWeight: 600,
      fontSize: "10px",
      display: "inline-block",
      minWidth: "60px",
    },
  };

  return (
    <div>
      <header style={styles.header}>
         <title>Planify - Admin</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          integrity="sha512-yada..."
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <img
          alt="Blue square icon with white checkmark inside"
          style={styles.headerImg}
          src="/logo%20planify%20new.png"
        />
        <div style={styles.logoText}>Planify</div>
        <div style={styles.title}>Dashboard</div>
        <a style={styles.signout} href="#">
          <i className="fas fa-sign-out-alt" style={styles.signoutIcon}></i>{" "}
          Sign Out
        </a>
      </header>
      <main style={styles.main}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "24px",
          }}
        >
          <div
            aria-label="Welcome message"
            style={styles.helloAdmin}
            role="region"
          >
            Hello Admin!
            <small style={styles.helloAdminSmall}>
              We are very happy to help you!
            </small>
          </div>

          <nav style={styles.navButtons}>
            <div
              style={styles.userContainer}
              onClick={() => (window.location.href = "/dshbrd_Admin")}
            >
              <i className="fas fa-folder" style={styles.btnDashboardIcon}></i>
              <div style={styles.textContainer}>
                <span>Dashboard</span>
              </div>
            </div>

            <button
              style={styles.iconUser}
              onClick={() => (window.location.href = "/userManagement")}
            >
              <i className="fas fa-user" style={styles.iconUser}></i>
            </button>

            <button
              style={styles.iconSend}
              onClick={() => (window.location.href = "/send_Admin")}
            >
              <i className="fas fa-paper-plane" style={styles.iconSend}></i>
            </button>
          </nav>
        </div>

        <section aria-label="Statistics summary" style={styles.statsContainer}>
          <div style={styles.statBox}>
            <div style={styles.statLabel}>User</div>
            <div style={styles.statValue}>450</div>
          </div>
          <div style={styles.statBox}>
            <div style={styles.statLabel}>Notification Sent</div>
            <div style={styles.statValue}>5.667</div>
          </div>
          <div style={styles.statBox}>
            <div style={styles.statLabel}>Checks Made</div>
            <div style={styles.statValue}>4.350</div>
          </div>
        </section>
        <section aria-label="Payment History" style={styles.paymentHistory}>
          <h2 style={styles.paymentHistoryTitle}>Payment History</h2>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.tableHeaderCell}>Name</th>
                <th style={styles.tableHeaderCell}>Date</th>
                <th style={styles.tableHeaderCell}>Time</th>
                <th style={styles.tableHeaderCell}>Status</th>
                <th style={styles.tableHeaderCell}>Payment Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr style={styles.tableBodyRow}>
                <td style={styles.tableBodyCell}>Angelia Ayu</td>
                <td style={styles.tableBodyCell}>01 March 2024</td>
                <td style={styles.tableBodyCell}>8.88PM</td>
                <td style={styles.status}>
                  <span style={styles.statusPending}>Pending</span>
                </td>
                <td style={styles.tableBodyCell}>$ 4.99</td>
              </tr>
              <tr style={styles.tableBodyRow}>
                <td style={styles.tableBodyCell}>Intan Alifa</td>
                <td style={styles.tableBodyCell}>21 March 2024</td>
                <td style={styles.tableBodyCell}>2.31 AM</td>
                <td style={styles.status}>
                  <span style={styles.statusPaid}>Paid</span>
                </td>
                <td style={styles.tableBodyCell}>$ 39.94</td>
              </tr>
              <tr style={styles.tableBodyRow}>
                <td style={styles.tableBodyCell}>Alycia Sinaga</td>
                <td style={styles.tableBodyCell}>4 May 2024</td>
                <td style={styles.tableBodyCell}>8.33 AM</td>
                <td style={styles.status}>
                  <span style={styles.statusFailed}>Failed</span>
                </td>
                <td style={styles.tableBodyCell}>$ 39.94</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
