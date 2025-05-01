const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware to parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Debug middleware para registrar todas las solicitudes
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Headers:', JSON.stringify(req.headers));
  if (req.method === 'POST') {
    console.log('Body:', JSON.stringify(req.body));
  }
  next();
});

// CORS Configuration - permitir solicitudes desde cualquier origen
const corsOptions = {
  origin: '*', // Permitir solicitudes desde cualquier origen
  methods: ['GET', 'POST', 'OPTIONS'], // Permitir métodos GET, POST y OPTIONS
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Define a route handler for the "/send-email" endpoint
app.route('/send-email')
  .get((req, res) => {
    // Handle GET requests for /send-email
    console.log('GET request to /send-email received');
    res.send('GET request received for /send-email');
  })
  .post((req, res) => {
    console.log('POST request to /send-email received');
    // Handle POST requests for /send-email
    try {
      // Verificar que el cuerpo de la solicitud no sea nulo o vacío
      if (!req.body || Object.keys(req.body).length === 0) {
        console.error('Request body is empty or null');
        return res.status(400).json({ error: 'Request body is empty or null' });
      }

      const { nombre, apellido, email, servicio, telefono, motivoConsulta } = req.body;

      // Validar los datos requeridos
      if (!nombre || !email || !servicio) {
        console.error('Missing required fields', { nombre, email, servicio });
        return res.status(400).json({ error: 'Missing required fields' });
      }

      console.log('Email data validated successfully');

      // Replace these values with your email configuration
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'jaimebillanueba99@gmail.com',
          pass: 'cmme ztnd tgue nikz',
        },
      });

      // Plantilla HTML mejorada con el diseño del sitio y compatible con Mail de iPhone
      const mailOptions = {
        from: email,
        to: 'jaimevillalcon@hotmail.com',
        subject: 'Nueva consulta nutricional de: ' + nombre,
        html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Nueva consulta nutricional</title>
      </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f7f7; color: #333;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="padding: 20px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1); background-color: #ffffff;">
                  <!-- CABECERA -->
                  <tr>
                    <td align="center" bgcolor="#000000" style="padding: 20px; color: #ffffff;">
                      <h1 style="margin: 0; font-size: 24px; font-weight: 800; text-transform: uppercase; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">Nueva Consulta Nutricional</h1>
                      <p style="margin-top: 10px; margin-bottom: 0;">Tienes una nueva solicitud de consulta</p>
                    </td>
                  </tr>
                  
                  <!-- CONTENIDO -->
                  <tr>
                    <td style="padding: 20px;">
                      <h2 style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #333333; font-size: 18px;">${nombre} ${apellido} está interesado en una consulta nutricional</h2>
                      
                      <!-- DATOS DE CONTACTO -->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f9f9f9; border-radius: 8px; margin-bottom: 20px;">
                        <tr>
                          <td style="padding: 15px;">
                            <h3 style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #333333; font-size: 16px; margin-top: 0;">Datos de contacto:</h3>
                            
                            <!-- NOMBRE -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 8px;">
                              <tr>
                                <td width="140" style="font-weight: 700; color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">Nombre:</td>
                                <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">${nombre}</td>
                              </tr>
                            </table>
                            
                            <!-- APELLIDO -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 8px;">
                              <tr>
                                <td width="140" style="font-weight: 700; color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">Apellido:</td>
                                <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">${apellido || 'No proporcionado'}</td>
                              </tr>
                            </table>
                            
                            <!-- EMAIL -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 8px;">
                              <tr>
                                <td width="140" style="font-weight: 700; color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">Email:</td>
                                <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">${email}</td>
                              </tr>
                            </table>
                            
                            <!-- TELÉFONO -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 8px;">
                              <tr>
                                <td width="140" style="font-weight: 700; color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">Teléfono:</td>
                                <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">${telefono || 'No proporcionado'}</td>
                              </tr>
                            </table>
                            
                            <!-- SERVICIO -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                              <tr>
                                <td width="140" style="font-weight: 700; color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">Servicio:</td>
                                <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">${servicio}</td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- MOTIVO DE CONSULTA -->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f3f373; border-radius: 8px; margin-top: 20px;">
                        <tr>
                          <td style="padding: 15px;">
                            <h3 style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #333333; font-size: 16px; margin-top: 0;">Motivo de la Consulta:</h3>
                            <p style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin-bottom: 0;">${motivoConsulta || 'No especificado'}</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                  <!-- PIE DE PÁGINA -->
                  <tr>
                    <td align="center" bgcolor="#000000" style="padding: 15px; color: #ffffff; font-size: 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                      <p style="margin: 0;">© ${new Date().getFullYear()} Guillermo Fernández Nutrición</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
      </body>
        </html>
        `,
      };

      console.log('Attempting to send email to:', mailOptions.to);

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).json({ error: 'Failed to send email: ' + error.message });
        }

        console.log('Email sent successfully to:', mailOptions.to);
        console.log('Email info:', info);
        res.status(200).json({ message: 'Email sent successfully' });
      });
    } catch (error) {
      console.error('Exception in send-email endpoint:', error);
      // Send an error response
      res.status(500).json({ error: 'Failed to send email: ' + error.message });
    }
  });

// Definir una ruta de prueba simple
app.get('/test', (req, res) => {
  console.log('Test endpoint hit');
  res.send('Server is working');
});

// Capturar errores generales
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ error: 'Server error: ' + err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Test the server: http://localhost:${PORT}/test`);
  console.log(`Email endpoint: http://localhost:${PORT}/send-email`);
});