import React, { useEffect, useState } from "react";

const ApprovalPayment = () => {
  const [payments, setPayments] = useState([
    {
      id: 1,
      name: "Angelia Ayu",
      date: "01 March 2024",
      time: "8.88 PM",
      amount: "$4.99",
      status: "pending",
    },
    {
      id: 2,
      name: "Intan Alifa",
      date: "21 March 2024",
      time: "2.31 AM",
      amount: "$39.94",
      status: "pending",
    },
    {
      id: 3,
      name: "Alycia Sinaga",
      date: "4 May 2024",
      time: "8.33 AM",
      amount: "$39.94",
      status: "pending",
    },
  ]);

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.fontFamily = "'Inter', sans-serif";
    document.body.style.backgroundColor = "#f5f5f5";
    document.body.style.color = "#000";
  }, []);

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#f5f5f5",
      padding: "0",
    },
    header: {
      backgroundColor: "#fff",
      padding: "12px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "1px solid #e0e0e0",
    },
    backButton: {
      backgroundColor: "transparent",
      border: "none",
      fontSize: "18px",
      color: "#666",
      cursor: "pointer",
      padding: "8px",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    logoIcon: {
      width: "28px",
      height: "28px",
      backgroundColor: "#4285f4",
      borderRadius: "6px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontSize: "14px",
      fontWeight: "bold",
    },
    logoText: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#000",
    },
    main: {
      padding: "24px 20px",
      maxWidth: "800px",
      margin: "0 auto",
    },
    title: {
      fontSize: "24px",
      fontWeight: "600",
      color: "#4285f4",
      marginBottom: "24px",
    },
    tableContainer: {
      backgroundColor: "#fff",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    tableHeader: {
      backgroundColor: "#f8f9fa",
    },
    tableHeaderCell: {
      padding: "16px 20px",
      textAlign: "left",
      fontWeight: "500",
      fontSize: "14px",
      color: "#666",
      borderBottom: "1px solid #e0e0e0",
    },
    tableRow: {
      borderBottom: "1px solid #f0f0f0",
      transition: "background-color 0.2s ease",
    },
    tableCell: {
      padding: "16px 20px",
      fontSize: "14px",
      color: "#333",
      verticalAlign: "middle",
    },
    viewButton: {
      backgroundColor: "transparent",
      border: "1px solid #d0d0d0",
      borderRadius: "20px",
      padding: "6px 16px",
      fontSize: "12px",
      color: "#666",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    actionCell: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    approveButton: {
      width: "24px",
      height: "24px",
      borderRadius: "50%",
      border: "2px solid #ffc107",
      backgroundColor: "#ffc107",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    checkIcon: {
      fontSize: "12px",
      color: "#fff",
    },
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleView = (paymentId) => {
    console.log("View payment:", paymentId);
    // Add your view logic here
  };

  const handleApprove = (paymentId) => {
    setPayments(
      payments.map((payment) =>
        payment.id === paymentId
          ? {
              ...payment,
              status: payment.status === "approved" ? "pending" : "approved",
            }
          : payment
      )
    );
  };

  return (
    <div style={styles.container}>
      <title>Approval - Payment</title>
      <header style={styles.header}>
        <a
          href="/dshbrd_Admin"
          style={{
            ...styles.backButton,
            color: "#666",
            textDecoration: "none",
            fontSize: "16px",
            display: "inline-block",
            transition: "color 0.2s ease",
          }}
          onMouseOver={(e) => (e.target.style.color = "#333")}
          onMouseOut={(e) => (e.target.style.color = "#666")}
        >
          <i className="fas fa-chevron-left"></i>
        </a>

        <div style={styles.logo}>
          <div style={styles.logoIcon}>
            <i className="fas fa-check"></i>
          </div>
          <span style={styles.logoText}>Planify</span>
        </div>
      </header>

      <main style={styles.main}>
        <h1 style={styles.title}>Approval Payment</h1>

        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.tableHeaderCell}>Name</th>
                <th style={styles.tableHeaderCell}>Date</th>
                <th style={styles.tableHeaderCell}>Time</th>
                <th style={styles.tableHeaderCell}>Receipt</th>
                <th style={styles.tableHeaderCell}>Payment Amount</th>
                <th style={styles.tableHeaderCell}></th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr
                  key={payment.id}
                  style={styles.tableRow}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#f8f9fa")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  <td style={styles.tableCell}>{payment.name}</td>
                  <td style={styles.tableCell}>{payment.date}</td>
                  <td style={styles.tableCell}>{payment.time}</td>
                  <td style={styles.tableCell}>
                    <a
                      href="/transactionDetail"
                      style={{
                        ...styles.viewButton,
                        display: "inline-block",
                        textAlign: "center",
                        backgroundColor: "transparent",
                        borderColor: "#d0d0d0",
                        color: "inherit",
                        textDecoration: "none",
                        padding: "6px 15px",
                        borderRadius: "5px",
                        border: "1px solid",
                        cursor: "pointer",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = "#f0f0f0";
                        e.target.style.borderColor = "#bbb";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = "transparent";
                        e.target.style.borderColor = "#d0d0d0";
                      }}
                    >
                      View
                    </a>
                  </td>
                  <td style={styles.tableCell}>{payment.amount}</td>
                  <td style={styles.tableCell}>
                    <div style={styles.actionCell}>
                      <button
                        style={styles.approveButton}
                        onClick={() => handleApprove(payment.id)}
                      >
                        {payment.status === "approved" && (
                          <i
                            className="fas fa-check"
                            style={styles.checkIcon}
                          ></i>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        integrity="sha512-Avb2QiuDEEvB4bZJYdft2mNjVShBftLdPG8FJ0V7irTLQ8Uo0qcPxh4Plq7G5tGm0rU+1SPhVotteLpBERwTkw=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

export default ApprovalPayment;
