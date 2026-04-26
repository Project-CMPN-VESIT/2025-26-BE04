import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const submitContactUsForm = async (req, res) => {
  const { name, mobile, email, question } = req.body;

  try {
    // Email to the user
    const userMailOptions = {
      from: `"Jeevan Samvardhan Foundation" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "We received your question – Jeevan Samvardhan Foundation",
      html: `
        <html>
          <head>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap');
            </style>
          </head>
          <body>
            <div style="font-family: 'Outfit', sans-serif; line-height: 1.6; max-width: 600px;">
              <h2 style="color: #0e926b;">
                Thank you for reaching out to
                <span style="font-weight: 700; color: #fca00c">Jeevan Samvardhan Foundation</span>!
              </h2>
              <p>Dear <strong>${name}</strong>,</p>
              <p>We have received your question and our team will get back to you as soon as possible.</p>
              <p>Here is a copy of your submission:</p>
              <ul>
                <li><strong>Mobile:</strong> ${mobile}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Your Question:</strong> ${question}</li>
              </ul>
              <p>Warm regards,<br/>
              <strong>Jeevan Samvardhan Foundation</strong></p>
              <img src="https://www.jeevansamvardhan.org/images/my-images/logo3.png" width="150" alt="JSF Logo">
            </div>
          </body>
        </html>
      `,
    };

    // Notification email to admin
    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    const adminMailOptions = {
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `💬 New Contact Query — ${name}`,
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
            <div style="background:#0e926b;padding:24px 32px;">
              <h2 style="margin:0;color:#fff;font-size:18px;font-weight:700;">
                💬 New Contact Us Query
              </h2>
              <p style="margin:6px 0 0;color:#c6f0e2;font-size:13px;">${timestamp}</p>
            </div>

            <!-- Question Highlight -->
            <div style="background:#f0faf6;padding:16px 32px;border-left:4px solid #0e926b;">
              <p style="margin:0;font-size:13px;color:#6c757d;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Question</p>
              <p style="margin:6px 0 0;font-size:15px;color:#212529;line-height:1.6;">${question}</p>
            </div>

            <!-- Sender Info -->
            <div style="padding:24px 32px;">
              <p style="margin:0 0 14px;font-size:13px;color:#6c757d;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Sender Information</p>
              <table style="width:100%;border-collapse:collapse;font-size:14px;">
                ${[
                  ["Name", name],
                  ["Mobile", mobile],
                  ["Email", email],
                ]
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
              This is an automated notification from the Jeevan Samvardhan Foundation contact system.
            </div>

          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);

    res.status(200).json({ success: true, message: "Message sent successfully." });
  } catch (error) {
    console.error("Contact Us form error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};