require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5001;

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