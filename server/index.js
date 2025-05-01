require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuración del transporte de correo
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Importar plantilla de email
const { generateEmailTemplate } = require('./email-template');

// Endpoint informativo para GET /send-email
app.get('/send-email', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>API de Email</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    h1 {
                        color: #4CAF50;
                    }
                    pre {
                        background-color: #f5f5f5;
                        padding: 15px;
                        border-radius: 5px;
                        overflow-x: auto;
                    }
                    .note {
                        background-color: #fffde7;
                        border-left: 4px solid #ffeb3b;
                        padding: 10px 15px;
                        margin: 20px 0;
                    }
                </style>
            </head>
            <body>
                <h1>API de Email de Guillermo Fernández Nutrición</h1>
                <p>Este es un endpoint de API para enviar emails desde el formulario de contacto.</p>
                <div class="note">
                    <p><strong>Nota:</strong> Este endpoint no está diseñado para ser accedido directamente desde el navegador. 
                    Debe ser llamado desde el formulario de contacto con el método POST.</p>
                </div>
                <h2>Uso correcto:</h2>
                <pre>
fetch('/send-email', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        nombre: 'Nombre',
        apellido: 'Apellido',
        email: 'email@ejemplo.com',
        servicio: 'Nutrición Clínica',
        telefono: '123456789',
        motivoConsulta: 'Consulta de ejemplo'
    })
});
                </pre>
                <p>Estado del servidor: <strong>Activo</strong></p>
            </body>
        </html>
    `);
});

// Endpoint para enviar emails
app.post('/send-email', async (req, res) => {
    try {
        const { nombre, apellido, email, servicio, telefono, motivoConsulta } = req.body;

        // Validar datos requeridos
        if (!nombre || !email || !servicio) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos obligatorios'
            });
        }

        // Preparar opciones del email
        const mailOptions = {
            from: `"Formulario Web" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO,
            cc: 'jaimevillalcon@hotmail.com',
            subject: `Nueva consulta de ${nombre} ${apellido || ''} - ${servicio}`,
            html: generateEmailTemplate({
                nombre,
                apellido,
                email,
                servicio,
                telefono,
                motivoConsulta
            }),
            replyTo: email
        };

        // Enviar el email
        await transporter.sendMail(mailOptions);

        // Responder al cliente
        res.status(200).json({
            success: true,
            message: 'Email enviado con éxito'
        });
    } catch (error) {
        console.error('Error al enviar email:', error);
        res.status(500).json({
            success: false,
            message: 'Error al enviar email',
            error: error.message
        });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
}); 