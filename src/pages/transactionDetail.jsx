import React, { useEffect } from "react";

const TransactionDetails = () => {
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
      maxWidth: "1000px",
      margin: "0 auto",
    },
    titleContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "24px",
    },
    title: {
      fontSize: "24px",
      fontWeight: "600",
      color: "#4285f4",
      margin: "0",
    },
    editButton: {
      backgroundColor: "transparent",
      border: "none",
      fontSize: "18px",
      color: "#4285f4",
      cursor: "pointer",
      padding: "8px",
    },
    detailsContainer: {
      backgroundColor: "#fff",
      borderRadius: "12px",
      padding: "24px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      marginBottom: "24px",
    },
    detailRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "20px",
      paddingBottom: "16px",
      borderBottom: "1px solid #f0f0f0",
    },
    detailRowLast: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "0",
      paddingBottom: "0",
      borderBottom: "none",
    },
    detailLabel: {
      fontSize: "14px",
      color: "#666",
      fontWeight: "400",
      minWidth: "120px",
    },
    detailValue: {
      fontSize: "14px",
      color: "#333",
      fontWeight: "500",
      textAlign: "right",
      flex: "1",
    },
    receiptImage: {
      width: "120px",
      height: "150px",
      backgroundColor: "#f8f9fa",
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
    },
    receiptIcon: {
      fontSize: "24px",
      color: "#666",
    },
    receiptText: {
      fontSize: "12px",
      color: "#666",
      textAlign: "center",
      lineHeight: "1.3",
    },
    buttonContainer: {
      display: "flex",
      gap: "12px",
      justifyContent: "flex-end",
    },
    cancelButton: {
      backgroundColor: "transparent",
      border: "1px solid #d0d0d0",
      borderRadius: "8px",
      padding: "12px 24px",
      fontSize: "14px",
      color: "#666",
      cursor: "pointer",
      fontWeight: "500",
    },
    approveButton: {
      backgroundColor: "#4285f4",
      border: "none",
      borderRadius: "8px",
      padding: "12px 24px",
      fontSize: "14px",
      color: "#fff",
      cursor: "pointer",
      fontWeight: "500",
    },
  };

  const handleEdit = () => {
    console.log("Edit transaction");
  };

  const handleCancel = () => {
    console.log("Cancel transaction");
  };

  const handleApprove = () => {
    console.log("Approve transaction");
  };

  return (
    <div style={styles.container}>
        <title>Transaction Details</title>
      <header style={styles.header}>
        <a
          href="/approval"
          style={{
            ...styles.backButton,
            color: "#666",
            textDecoration: "none",
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
        <div style={styles.titleContainer}>
          <h1 style={styles.title}>Transaction details</h1>
          <button
            style={styles.editButton}
            onClick={handleEdit}
            onMouseOver={(e) => (e.target.style.color = "#1a73e8")}
            onMouseOut={(e) => (e.target.style.color = "#4285f4")}
          >
            <i className="fas fa-edit"></i>
          </button>
        </div>

        <div style={styles.detailsContainer}>
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Merchant name</span>
            <span style={styles.detailValue}>Planify Premium monthly</span>
          </div>

          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Amount</span>
            <span style={styles.detailValue}>Rp 80.000,00</span>
          </div>

          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Transaction date</span>
            <span style={styles.detailValue}>01 March 2024</span>
          </div>

          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Transaction ID</span>
            <span style={styles.detailValue}>000000</span>
          </div>

          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Transaction status</span>
            <span style={styles.detailValue}>Awaiting Review</span>
          </div>

          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Category</span>
            <span style={styles.detailValue}>Monthly</span>
          </div>

          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Receipt</span>
            <div style={styles.receiptImage}>
              <i className="fas fa-receipt" style={styles.receiptIcon}></i>
              <div style={styles.receiptText}>
                Receipt Image
                <br />
                Preview
              </div>
            </div>
          </div>

          <div style={styles.detailRowLast}>
            <span style={styles.detailLabel}>Note</span>
            <span style={styles.detailValue}>Approved</span>
          </div>
        </div>

        <div style={styles.buttonContainer}>
          <button
            style={styles.cancelButton}
            onClick={handleCancel}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#f0f0f0";
              e.target.style.borderColor = "#bbb";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.borderColor = "#d0d0d0";
            }}
          >
            Cancel
          </button>
          <button
            style={styles.approveButton}
            onClick={handleApprove}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#1a73e8")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#4285f4")}
          >
            Approve
          </button>
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

export default TransactionDetails;
