import nodemailer from "nodemailer";
// Create a transporter object
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

// Function to send email
export const sendEmail = async (email, studentName) => {
  const mailBody = `
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
        .container { max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        h2 { color: #007bff; }
        ul { padding-left: 20px; }
        .footer { margin-top: 20px; font-size: 14px; color: #555; }
      </style>
    </head>
    <body>
      <div class="container">
        <h2> Welcome to Our Platform!</h2>
        <p>Dear <strong>${studentName}</strong>,</p>
        <p>Congratulations! You have successfully registered with <strong>Our Platform</strong>. We’re excited to have you on board!</p>
        <p>Here’s what you can do next:</p>
        <ul>
          <li>✅ Explore our courses and resources.</li>
          <li>✅ Connect with instructors and fellow students.</li>
          <li>✅ Start learning and achieving your goals.</li>
        </ul>
        <p>If you have any questions, feel free to reach out to our support team.</p>
        <p class="footer">Best Regards, <br><strong>Our Platform Team</strong> <br></p>
      </div>
    </body>
    </html>
  `;
  const mailOptions = {
    from: "hi@demomailtrap.com",
    to: email,
    subject: "Welcome to Our Platform! – Your Learning Journey Begins",
    html: mailBody,
  };

  await transporter.sendMail(mailOptions);
};
