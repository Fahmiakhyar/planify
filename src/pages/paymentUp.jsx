import React, { useState } from "react";
import "./PaymentPage.css";

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
      <title>Planify - Payment</title>

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
            />
            <input
              type="tel"
              placeholder="No Telp"
              defaultValue="085700000000"
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
