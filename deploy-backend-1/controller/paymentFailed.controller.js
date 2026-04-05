import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const notifyPaymentFailed = async (req, res) => {
  const {
    name,
    email,
    mobile,
    amount,
    address,
    panNumber,
    dateOfBirth,
    fundraiserName,
    errorCode,
    errorDescription,
    errorReason,
    errorSource,
    errorStep,
    errorMetadata,
  } = req.body;

  try {
    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    const mailOptions = {
      from: `"Jeevan Samvardhan Foundation" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `⚠️ Payment Failed Alert — ${name || "Unknown Donor"} | ₹${amount || "N/A"}`,
      html: `
        <html>
        <head>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap');
          </style>
        </head>
        <body style="margin:0;padding:0;background:#f4f4f4;">
          <div style="font-family:'Outfit',sans-serif;max-width:600px;margin:32px auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
            
            <!-- Header -->
            <div style="background:#A32D2D;padding:24px 32px;">
              <h2 style="margin:0;color:#fff;font-size:18px;font-weight:700;">
                ⚠️ Payment Failed Notification
              </h2>
              <p style="margin:6px 0 0;color:#f5c6c6;font-size:13px;">${timestamp}</p>
            </div>

            <!-- Error Block -->
            <div style="background:#FCEBEB;padding:20px 32px;border-left:4px solid #A32D2D;">
              <p style="margin:0 0 6px;font-size:13px;color:#6c757d;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Error Details</p>
              ${errorCode ? `<p style="margin:4px 0;font-size:13px;"><strong>Code:</strong> <span style="font-family:monospace;color:#A32D2D;">${errorCode}</span></p>` : ""}
              ${errorDescription ? `<p style="margin:4px 0;font-size:13px;"><strong>Description:</strong> ${errorDescription}</p>` : ""}
              ${errorReason ? `<p style="margin:4px 0;font-size:13px;"><strong>Reason:</strong> ${errorReason}</p>` : ""}
              ${errorSource ? `<p style="margin:4px 0;font-size:13px;"><strong>Source:</strong> ${errorSource}</p>` : ""}
              ${errorStep ? `<p style="margin:4px 0;font-size:13px;"><strong>Step:</strong> ${errorStep}</p>` : ""}
              ${errorMetadata ? `<p style="margin:4px 0;font-size:13px;"><strong>Metadata:</strong> <span style="font-family:monospace;">${JSON.stringify(errorMetadata)}</span></p>` : ""}
            </div>

            <!-- Donor Info -->
            <div style="padding:24px 32px;">
              <p style="margin:0 0 14px;font-size:13px;color:#6c757d;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Donor Information</p>
              <table style="width:100%;border-collapse:collapse;font-size:14px;">
                ${[
                  ["Fundraiser", fundraiserName],
                  ["Name", name],
                  ["Email", email],
                  ["Mobile", mobile],
                  ["Amount", amount ? `₹${amount}` : null],
                  ["Address", address],
                  ["PAN Number", panNumber],
                  ["Date of Birth", dateOfBirth],
                ]
                  .filter(([, v]) => v)
                  .map(
                    ([label, value], i) => `
                  <tr style="background:${i % 2 === 0 ? "#f8f9fa" : "#fff"};">
                    <td style="padding:10px 14px;color:#6c757d;font-weight:600;width:38%;border-bottom:1px solid #eee;">${label}</td>
                    <td style="padding:10px 14px;color:#212529;border-bottom:1px solid #eee;">${value}</td>
                  </tr>`
                  )
                  .join("")}
              </table>
            </div>

            <!-- Footer -->
            <div style="padding:16px 32px;background:#f8f9fa;border-top:1px solid #eee;font-size:12px;color:#6c757d;">
              This is an automated alert from the Jeevan Samvardhan Foundation donation system.
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Admin notified of payment failure.",
    });
  } catch (err) {
    console.error("Failed to send payment failure email:", err);
    return res.status(500).json({
      success: false,
      message: "Could not send notification email.",
    });
  }
};