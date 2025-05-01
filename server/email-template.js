/**
 * Genera una plantilla HTML para emails
 */
exports.generateEmailTemplate = (data) => {
    const { nombre, apellido, email, servicio, telefono, motivoConsulta } = data;

    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nueva Consulta</title>
      <style>
        /* Estilos generales */
        body {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f9f9f9;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          padding: 20px 0;
          background-color: #4CAF50;
          color: white;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          margin-bottom: 20px;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
        }
        .content {
          padding: 0 20px;
        }
        .field {
          margin-bottom: 20px;
        }
        .field-label {
          font-weight: bold;
          color: #4CAF50;
          display: block;
          margin-bottom: 5px;
        }
        .field-value {
          background-color: #f5f5f5;
          padding: 10px;
          border-radius: 4px;
          border-left: 3px solid #4CAF50;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
          color: #888;
          font-size: 14px;
        }
        @media only screen and (max-width: 600px) {
          .container {
            width: 100%;
            border-radius: 0;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Nueva Consulta Recibida</h1>
        </div>
        
        <div class="content">
          <div class="field">
            <div class="field-label">Nombre:</div>
            <div class="field-value">${nombre} ${apellido || ''}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Email:</div>
            <div class="field-value">${email}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Servicio:</div>
            <div class="field-value">${servicio}</div>
          </div>
          
          ${telefono ? `
          <div class="field">
            <div class="field-label">Teléfono:</div>
            <div class="field-value">${telefono}</div>
          </div>
          ` : ''}
          
          <div class="field">
            <div class="field-label">Motivo de Consulta:</div>
            <div class="field-value">${motivoConsulta || 'No especificado'}</div>
          </div>
        </div>
        
        <div class="footer">
          <p>Este email fue enviado desde el formulario de contacto de Guillermo Fernández Nutrición.</p>
          <p>© ${new Date().getFullYear()} Guillermo Fernández Nutrición - Todos los derechos reservados</p>
        </div>
      </div>
    </body>
    </html>
  `;
}; 