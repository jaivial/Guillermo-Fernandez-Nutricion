const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware to parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:4321', // Replace with your frontend domain
  methods: 'POST',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Define a route handler for the "/send-email" endpoint
app.route('/send-email')
  .get((res) => {
    // Handle GET requests for /send-email
    res.send('GET request received for /send-email');
  })
  .post((req, res) => {
    // Handle POST requests for /send-email
    try {
      const { nombre, apellido, email, servicio, telefono, motivoConsulta } = req.body;

      // Replace these values with your email configuration
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'jaimebillanueba99@gmail.com',
          pass: 'trrm wazr uyyb obkx',
        },
      });

      // Rest of your email sending logic here
      const mailOptions = {
        from: email,
        to: 'jaimebillanueba99@gmail.com',
        subject: 'Nueva consulta nutricional de: ' + nombre,
        html: `
        <head>
        <meta charset="UTF-8">
      </head>
      <body>
        <h4>${nombre} está interesado en una consulta nutricional</h4>
        <p>Aquí tienes sus datos de contacto:</p>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Apellido:</strong> ${apellido}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Servicio:</strong> ${servicio}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Motivo de la Consulta:</strong> ${motivoConsulta}</p>
      </body>
        `,
      };

      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).json({ error: 'Failed to send email' });
        }

        // Send a success response
        res.status(200).json({ message: 'Email sent successfully' });
      });
    } catch (error) {
      console.error('Error sending email:', error);
      // Send an error response
      res.status(500).json({ error: 'Failed to send email' });
    }
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
