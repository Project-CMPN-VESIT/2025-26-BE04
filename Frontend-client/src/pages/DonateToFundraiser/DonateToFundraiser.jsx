import { useEffect, useState } from "react";
import "./DonateToFundraiser.css";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const DonateToFundraiser = () => {
  const { fundraiserId } = useParams();
  const [fundraiserInfo, setFundraiserInfo] = useState({});
  const isFixedAmount = fundraiserInfo?.isFixedAmount;

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    amount: "",
    address: "",
    panNumber: "",
    dateOFBirth: "",
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);

  const fetchDonations = async () => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const response = await axios.get(
        `http://localhost:8000/api/donation/get-donations/${fundraiserId}`,
        config
      );
      setFundraiserInfo(response.data.fundraiser);
    } catch (error) {
      toast.error("Error fetching fundraiser details. Try again later.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  useEffect(() => {
    if (fundraiserInfo?.isFixedAmount && fundraiserInfo?.fixedAmount) {
      setFormData((prev) => ({
        ...prev,
        amount: fundraiserInfo.fixedAmount.toString(),
      }));
    }
  }, [fundraiserInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.mobile ||
      !formData.email ||
      !formData.amount ||
      !formData.panNumber ||
      !formData.address
    ) {
      toast.warn("Please fill all required fields.");
      return;
    }
    setShowModal(true);
  };

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await axios.post(
      "http://localhost:8000/api/donation/create-order",
      { amount: formData.amount }
    );

    if (!result) {
      toast.error("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data.order;

    const options = {
      key: "rzp_test_IB0DFCqRT7jxeD",
      amount,
      currency,
      name: "Jeevan Samvardhan Foundation",
      order_id,
      handler: async function (response) {
        try {
          setLoading(true);
          const data = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            name: formData.name,
            email: formData.email,
            mobileNo: formData.mobile,
            amount: formData.amount,
            address: formData.address,
            panNumber: formData.panNumber,
            dateOFBirth: formData.dateOFBirth,
            fundraiserId,
          };

          const verifyResult = await axios.post(
            "http://localhost:8000/api/donation/verify-payment",
            data
          );

          setShowModal(false);
          fetchDonations();
          setFormData({
            name: "",
            mobile: "",
            email: "",
            amount: "",
            address: "",
            panNumber: "",
            dateOFBirth: "",
          });

          setPaymentResult({
            status: "success",
            data: {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              amount: formData.amount,
              email: formData.email,
              date: new Date().toLocaleString("en-IN"),
              transactionHash:
                verifyResult.data?.newDonation?.blockchain?.transactionHash || null,
            },
          });
        } catch (err) {
          console.error(err);
          setShowModal(false);
          setPaymentResult({
            status: "failed",
            error: "Payment verification failed. Please contact support.",
          });
        } finally {
          setLoading(false);
        }
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.mobile,
      },
      notes: {
        address: `Paying for ${fundraiserInfo.name}`,
      },
      theme: { color: "var(--accent-01)" },
      modal: {
        ondismiss: function () {
          setShowModal(false);
        },
      },
    };

    const paymentObject = new window.Razorpay(options);

    paymentObject.on("payment.failed", async function (response) {
      const err = response.error || {};

      try {
        await axios.post("http://localhost:8000/api/payment-failed", {
          // Donor info
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          amount: formData.amount,
          address: formData.address,
          panNumber: formData.panNumber,
          dateOfBirth: formData.dateOFBirth,
          fundraiserName: fundraiserInfo.name,
          // All Razorpay error fields
          errorCode: err.code || "",
          errorDescription: err.description || "Unknown error",
          errorReason: err.reason || "",
          errorSource: err.source || "",
          errorStep: err.step || "",
          errorMetadata: err.metadata || null,
        });
      } catch (notifyErr) {
        console.error("Failed to notify admin of payment failure:", notifyErr);
      }

      setShowModal(false);
      setPaymentResult({
        status: "failed",
        error: err.description || "Payment could not be completed.",
        code: err.code || "",
      });
    });

    paymentObject.open();
  }

  const truncate = (str, n = 10) =>
    str && str.length > n * 2 ? `${str.slice(0, n)}...${str.slice(-6)}` : str;

  return (
    <div className="donate-to-fundraiser-wrapper">
      {/* Fundraiser Info */}
      <div className="fundraiser-info-container">
        <div className="fundraiser-info">
          <div className="fundraiser-name">{fundraiserInfo.name}</div>
          <div className="fundraiser-description">
            <span>Description:</span> {fundraiserInfo.description}
          </div>
          <div className="fundraiser-date">
            <span>Creation Date:</span>{" "}
            {fundraiserInfo.createdAt && fundraiserInfo.createdAt.split("T")[0]}
          </div>
          {fundraiserInfo?.hasGoal && (
            <div className="fundraiser-goal">
              <span>Progress:</span> ₹{fundraiserInfo?.amountRaised || 0} / ₹
              {fundraiserInfo.goal}
            </div>
          )}
        </div>
        <div className="fundraiser-image">
          <img src={fundraiserInfo.logo} alt="Fundraiser logo" />
        </div>
      </div>

      {/* Donation Form */}
      <div className="donation-info-container">
        <h3>
          You're donating to <span>{fundraiserInfo.name}</span>
        </h3>
        <form className="donation-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label>Mobile:</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter your mobile number"
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>PAN Number:</label>
            <input
              type="text"
              name="panNumber"
              value={formData.panNumber}
              onChange={handleChange}
              placeholder="Enter PAN number"
            />
          </div>

          <div className="form-group">
            <label>Address:</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
            />
          </div>

          <div className="form-group">
            <label>Date of Birth (Optional):</label>
            <input
              type="date"
              name="dateOFBirth"
              value={formData.dateOFBirth}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Quick Amounts:</label>
            <div className="quick-amounts">
              {[100, 500, 1000, 5000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  disabled={isFixedAmount}
                  className={`amount-badge ${
                    formData.amount === amt.toString() ? "selected" : ""
                  }`}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      amount: amt.toString(),
                    }))
                  }
                >
                  ₹{amt}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            {isFixedAmount && (
              <p style={{ color: "#28a745", fontWeight: 500 }}>
                This fundraiser has a fixed donation amount of ₹
                {fundraiserInfo?.fixedAmount}
              </p>
            )}
            <label>Donation Amount (₹):</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter donation amount"
              disabled={isFixedAmount}
            />
          </div>

          <button type="submit" className="donate-button" disabled={loading}>
            {loading ? "Processing..." : "Make Donation"}
          </button>
        </form>
      </div>

      {/* Confirm Donation Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Donation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You are about to donate <strong>₹{formData.amount}</strong> to{" "}
          <strong>{fundraiserInfo.name}</strong>.
          <br />
          Are you sure you want to proceed?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={displayRazorpay} disabled={loading}>
            {loading ? "Processing..." : "Confirm"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Payment Success Modal */}
      <Modal
        show={paymentResult?.status === "success"}
        onHide={() => setPaymentResult(null)}
        centered
      >
        <Modal.Header
          closeButton
          style={{ borderBottom: "0.5px solid var(--bs-border-color)" }}
        >
          <Modal.Title
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "16px",
            }}
          >
            <span
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#EAF3DE",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#3B6D11"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            Payment successful
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div
            style={{
              textAlign: "center",
              padding: "16px 0 20px",
              borderBottom: "0.5px solid var(--bs-border-color)",
              marginBottom: 16,
            }}
          >
            <div style={{ fontSize: 12, color: "#6c757d", marginBottom: 4 }}>
              Amount donated
            </div>
            <div style={{ fontSize: 30, fontWeight: 600, color: "#3B6D11" }}>
              ₹{Number(paymentResult?.data?.amount).toLocaleString("en-IN")}
            </div>
          </div>

          {[
            { label: "Payment ID", value: paymentResult?.data?.paymentId },
            { label: "Order ID", value: paymentResult?.data?.orderId },
            { label: "Date & time", value: paymentResult?.data?.date },
            ...(paymentResult?.data?.transactionHash
              ? [
                  {
                    label: "Blockchain hash",
                    value: truncate(paymentResult?.data?.transactionHash),
                  },
                ]
              : []),
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "7px 0",
                fontSize: 13,
                borderBottom: "0.5px solid var(--bs-border-color)",
              }}
            >
              <span style={{ color: "#6c757d" }}>{label}</span>
              <span
                style={{
                  fontWeight: 500,
                  maxWidth: "60%",
                  textAlign: "right",
                  wordBreak: "break-all",
                }}
              >
                {value}
              </span>
            </div>
          ))}

          <div
            style={{
              marginTop: 16,
              background: "#EAF3DE",
              borderRadius: 8,
              padding: "10px 14px",
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
              fontSize: 13,
              color: "#27500A",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#27500A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flexShrink: 0, marginTop: 2 }}
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            A donation receipt has been sent to{" "}
            <strong style={{ marginLeft: 4 }}>{paymentResult?.data?.email}</strong>.
            Please check your inbox.
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="success" onClick={() => setPaymentResult(null)}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Payment Failed Modal */}
      <Modal
        show={paymentResult?.status === "failed"}
        onHide={() => setPaymentResult(null)}
        centered
      >
        <Modal.Header
          closeButton
          style={{ borderBottom: "0.5px solid var(--bs-border-color)" }}
        >
          <Modal.Title
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "16px",
            }}
          >
            <span
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#FCEBEB",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#A32D2D"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </span>
            Payment failed
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ textAlign: "center", padding: "24px 20px" }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "#FCEBEB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 14px",
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#A32D2D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>
            Your payment was not completed
          </div>
          <div
            style={{
              fontSize: 13,
              color: "#6c757d",
              lineHeight: 1.6,
              marginBottom: 16,
            }}
          >
            No amount has been deducted from your account. You can try again or
            use a different payment method.
          </div>
          {paymentResult?.error && (
            <div
              style={{
                background: "#f8f9fa",
                borderRadius: 8,
                padding: "8px 14px",
                fontSize: 12,
                fontFamily: "monospace",
                color: "#6c757d",
                textAlign: "left",
              }}
            >
              {paymentResult.code && (
                <span style={{ marginRight: 6, color: "#A32D2D" }}>
                  [{paymentResult.code}]
                </span>
              )}
              {paymentResult.error}
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setPaymentResult(null)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              setPaymentResult(null);
              setShowModal(true);
            }}
          >
            Try again
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DonateToFundraiser;
