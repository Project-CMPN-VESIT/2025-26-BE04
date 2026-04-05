import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const submitJoinUsForm = async (req, res) => {
  const { user_name, user_mobile, user_email, user_location, user_role, user_comments } = req.body;

  try {
    // Email to the user
    const userMailOptions = {
      from: `"Jeevan Samvardhan Foundation" <${process.env.EMAIL_USER}>`,
      to: user_email,
      subject: "Welcome to Jeevan Samvardhan Foundation!",
      html: `
      <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap');
        </style>
      </head>
      <body>
        <div style="font-family: 'Outfit', sans-serif; line-height: 1.6; max-width: 600px;">
          <h2 style="color: #0e926b;">Welcome to the <span style="font-weight: 700; color: #fca00c">Jeevan Samvardhan Foundation</span> Family!</h2>
          <p>Dear <strong>${user_name}</strong>,</p>
          <p>Thank you for stepping forward to join our mission as a <strong>${user_role}</strong>. Your willingness to contribute your time and energy means the world to us.</p>
          <p>Here is a copy of the details you submitted:</p>
          <ul>
            <li><strong>Mobile:</strong> ${user_mobile}</li>
            <li><strong>Location:</strong> ${user_location}</li>
            <li><strong>Role:</strong> ${user_role}</li>
            <li><strong>Comments:</strong> ${user_comments || "None"}</li>
          </ul>
          <p>Our team will review your application and get in touch with you shortly to discuss next steps.</p>
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
      from: `"Join Us Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `🙋 New Join Us Application — ${user_name} | ${user_role}`,
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
                🙋 New Join Us Application
              </h2>
              <p style="margin:6px 0 0;color:#c6f0e2;font-size:13px;">${timestamp}</p>
            </div>

            <!-- Role Badge -->
            <div style="background:#f0faf6;padding:16px 32px;border-left:4px solid #0e926b;">
              <p style="margin:0;font-size:13px;color:#6c757d;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Applied Role</p>
              <p style="margin:6px 0 0;font-size:16px;font-weight:700;color:#0e926b;">${user_role}</p>
            </div>

            <!-- Applicant Info -->
            <div style="padding:24px 32px;">
              <p style="margin:0 0 14px;font-size:13px;color:#6c757d;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Applicant Information</p>
              <table style="width:100%;border-collapse:collapse;font-size:14px;">
                ${[
                  ["Name", user_name],
                  ["Mobile", user_mobile],
                  ["Email", user_email],
                  ["Location", user_location],
                  ["Comments", user_comments || "None"],
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
              This is an automated notification from the Jeevan Samvardhan Foundation volunteer system.
            </div>

          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);

    res.status(200).json({ success: true, message: "Application submitted successfully." });
  } catch (error) {
    console.error("Error submitting Join Us form:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};