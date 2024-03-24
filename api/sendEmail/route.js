const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    // Destructure request body directly, no need for await request.json()
    const { nombre, apellido, email, servicio, telefono, motivoConsulta } = req.body;

    // Create a transporter for sending emails
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'jaimebillanueba99@gmail.com',
        pass: 'trrm wazr uyyb obkx',
      },
    });

    // Define email content
    const mailOptions = {
      from: email,
      to: 'jaimebillanueba99@gmail.com',
      subject: 'New Contact Form Submission',
      text: `
        Name: ${nombre} ${apellido}
        Email: ${email}
        Service: ${servicio}
        Phone: ${telefono}
        Message: ${motivoConsulta}
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Send success response
    return res.status(200).json({ message: "Email sent successfully" });

  } catch (error) {
    // Send error response
    console.error('Error sending email:', error);
    return res.status(500).json({ message: "Failed to send email" });
  }
});

module.exports = router;
