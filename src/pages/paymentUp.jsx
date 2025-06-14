import React, { useState } from "react";

const PaymentPage = () => {
  const [preview, setPreview] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
      alert("Please upload a valid image file.");
    }
  };

  const handleConfirmPayment = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Nomor rekening berhasil disalin!");
    });
  };

  if (!isOpen) return null;

  return (
    <div className="payment-container" style={{ position: "relative" }}>
      <style>{`
        /* Container utama */
        .payment-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px;
          background-color: #f9f9f9;
          min-height: 100vh;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }

        /* Konten utama (2 panel) */
        .payment-content {
          display: flex;
          flex-direction: row;
          align-items: stretch;
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          width: 100%;
          max-width: 1000px;
        }

        /* Panel kiri */
        .left-panel {
          flex: 1;
          padding: 40px;
          background-color: #fff;
          border-right: 1px solid #ddd;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        /* Panel kanan */
        .right-panel {
          flex: 1;
          padding: 40px;
          background-color: #f0f4ff;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        /* Header */
        .header {
          margin-bottom: -200px;
        }

        .header .logo {
          font-size: 20px;
          font-weight: bold;
          color: #2c3e50;
        }

        /* Ringkasan */
        .order-summary {
          margin-top: -100px;
        }

        .order-summary h3 {
          margin-bottom: 10px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .total {
          font-weight: bold;
          font-size: 16px;
        }

        /* Info kontak & pembayaran */
        .contact-info input,
        .payment-info input {
          margin-bottom: 15px;
          padding: 10px;
          border-radius: 6px;
          border: 1px solid #ccc;
          width: 100%;
        }

        /* Kartu Bank */
        .bank-card {
          border: 1px solid #ccc;
          border-radius: 10px;
          padding: 15px;
          margin-bottom: 16px;
          background-color: #fafafa;
        }

        .bank-header {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }

        .bank-icon {
          padding: 6px 12px;
          border-radius: 6px;
          color: #fff;
          font-weight: bold;
          margin-right: 10px;
        }

        .bca-bg {
          background-color: #0066cc;
        }

        .bri-bg {
          background-color: #00923f;
        }

        .bank-details .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }

        .copy-field {
          display: flex;
          align-items: center;
        }

        .copy-field button {
          margin-left: 10px;
          padding: 5px 10px;
          border: none;
          background-color: #007bff;
          color: white;
          border-radius: 4px;
          cursor: pointer;
        }

        .copy-field button:hover {
          background-color: #0056b3;
        }

        /* Notice */
        .notice {
          background-color: #fff3cd;
          border: 1px solid #ffeeba;
          padding: 10px;
          border-radius: 6px;
          margin-top: 16px;
          font-size: 14px;
        }

        /* Upload */
        .qr-code-upload {
          margin-top: 20px;
        }

        /* Tombol */
        .confirm-btn {
          background: linear-gradient(to right, #0019e0 0%, #6f7ce0 50%, #0019e0 100%);
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          margin-top: 20px;
        }

        .confirm-btn:hover {
          background-color: #6f7ce0;
        }

        .btn {
          margin-top: 16px;
          background: none;
          margin-left: 100px;
          border: none;
          color: #3498db;
          cursor: pointer;
          text-decoration: underline;
        }

        .btn:hover {
          color: #21618c;
        }

        /* Modal */
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
        }

        .modal-content {
          background-color: white;
          padding: 30px;
          border-radius: 12px;
          text-align: center;
          width: 90%;
          max-width: 500px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
          position: relative;
        }

        .modal-content .close {
          position: absolute;
          top: 20px;
          right: 24px;
          font-size: 28px;
          font-weight: bold;
          color: #aaa;
          cursor: pointer;
        }

        .modal-content .close:hover {
          color: #333;
        }

        .btn-enjoy {
          margin-top: 20px;
          padding: 12px 24px;
          background-color: #3498db;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
        }

        .btn-enjoy:hover {
          background-color: #2e86c1;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .payment-content {
            flex-direction: column;
          }

          .left-panel,
          .right-panel {
            padding: 20px;
          }
        }

        /* Card Style untuk Plan Info */
        .card-box {
          background: linear-gradient(
            to bottom right,
            #e1e8fc 0%,
            rgba(225, 232, 252, 0) 100%
          );
          border: 1px solid #ddd;
          border-radius: 12px;
          padding: 25px;
          height: 400px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          display: flex;
          flex-direction: column;
        }

        .card-box:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
        }

        .card-box .price {
          font-size: 22px;
          font-weight: bold;
          color: #2c3e50;
          margin-bottom: 10px;
        }

        .card-box .description {
          font-size: 14px;
          color: #555;
          margin-bottom: 12px;
          flex-shrink: 0;
        }

        .card-box .features-list {
          list-style: none;
          padding: 0;
          margin: 0;
          flex-grow: 1;
        }

        .card-box .features-list li {
          margin-bottom: 8px;
          color: #2d3436;
          font-size: 14px;
          display: flex;
          align-items: center;
        }
      `}</style>

      {/* Tombol Tutup */}
      <button
        onClick={() => setIsOpen(false)}
        aria-label="Close Payment Container"
        style={{
          position: "absolute",
          top: 0,
          right: 10,
          background: "transparent",
          border: "none",
          fontSize: "24px",
          cursor: "pointer",
          color: "#333",
          fontWeight: "bold",
          lineHeight: 1,
        }}
      >
        &times;
      </button>

      <div className="payment-content">
        <title>Payment Up</title>
        {/* Panel Kiri */}
        <div className="left-panel">
          <div className="header">
            <div className="logo d-flex align-items-center mb-2">
              <img
                src="/logo%20planify%20new.png"
                alt="Planify Logo"
                width="36"
                height="36"
                className="me-2"
              />
              Planify
            </div>
            <h2>Upgrade your Plan</h2>
          </div>

          <div className="plan-info card-box">
            <h2 className="price">Rp49.999,00/month</h2>
            <p className="description">
              Level up productivity and creativity with expanded access
            </p>
            <ul className="features-list">
              <li>✔ Access to group chat</li>
              <li>✔ Customize card backgrounds</li>
              <li>✔ Connect with multiple friends at once</li>
            </ul>
          </div>

          <div className="order-summary">
            <h3>Order summary</h3>
            <p>Planify Premium Subscription</p>
            <p>Billed monthly</p>
            <hr />
            <div className="summary-row">
              <span>Subtotal</span>
              <span>Rp49.999,00</span>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>Rp0,00</span>
            </div>
            <hr />
            <h4 className="summary-row total">
              <span>Total due today</span>
              <span>Rp49.999,00</span>
            </h4>
          </div>
        </div>

        {/* Panel Kanan */}
        <div className="right-panel">
          <div className="contact-info">
            <h3>Contact Information</h3>
            <input
              type="email"
              placeholder="Email"
              defaultValue="angeliaayu@gmail.com"
              aria-label="Email"
            />
            <input
              type="tel"
              placeholder="No Telp"
              defaultValue="085700000000"
              aria-label="Phone Number"
            />
          </div>

          <div className="payment-info">
            <h3>Quick and easy payment</h3>

            {/* Transfer Bank */}
            <div className="bank-transfer mb-6">
              <p className="text-gray-600 mb-4">
                Transfer ke salah satu rekening di bawah ini dengan nominal yang
                tepat:
              </p>

              {/* BCA */}
              <div className="bank-card bca">
                <div className="bank-header">
                  <div className="bank-icon bca-bg">BCA</div>
                  <span className="bank-name">Bank Central Asia</span>
                </div>
                <div className="bank-details">
                  <div className="detail-row">
                    <span>No. Rekening:</span>
                    <div className="copy-field">
                      <span className="bank-number">1234567890</span>
                      <button onClick={() => copyToClipboard("1234567890")}>
                        Copy
                      </button>
                    </div>
                  </div>
                  <p>
                    a.n. <strong>PLANIFY INDONESIA</strong>
                  </p>
                </div>
              </div>

              {/* BRI */}
              <div className="bank-card bri">
                <div className="bank-header">
                  <div className="bank-icon bri-bg">BRI</div>
                  <span className="bank-name">Bank Rakyat Indonesia</span>
                </div>
                <div className="bank-details">
                  <div className="detail-row">
                    <span>No. Rekening:</span>
                    <div className="copy-field">
                      <span className="bank-number">0987654321</span>
                      <button onClick={() => copyToClipboard("0987654321")}>
                        Copy
                      </button>
                    </div>
                  </div>
                  <p>
                    a.n. <strong>PLANIFY INDONESIA</strong>
                  </p>
                </div>
              </div>

              {/* Peringatan */}
              <div className="notice">
                <p>
                  <strong>Penting:</strong> Transfer dengan nominal tepat
                  Rp49.999,00 dan simpan bukti transfer.
                </p>
              </div>
            </div>

            {/* Upload Bukti */}
            <input
              type="file"
              accept="image/*"
              className="form-control qr-code-upload"
              onChange={handleFileChange}
              aria-label="Upload QR Code"
            />
            {preview && (
              <img
                src={preview}
                alt="QR Preview"
                className="qr-code"
                style={{
                  maxWidth: "200px",
                  height: "auto",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  marginTop: "12px",
                }}
              />
            )}
          </div>

          <div className="payment-confirmation">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                className="confirm-btn txt-center"
                onClick={handleConfirmPayment}
              >
                I've Paid
              </button>
            </div>
            <button className="btn">Payment Failed? Tap Here</button>
          </div>
        </div>
      </div>

      {/* Modal Konfirmasi */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Thank you for your payment!</h2>
            <p>
              After scanning the QR code, please wait a moment while we confirm
              your payment.
            </p>
            <button
              className="btn-enjoy"
              onClick={() => (window.location.href = "/workspace")}
            >
              Enjoy Premium Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
