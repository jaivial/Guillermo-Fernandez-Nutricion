import { useState } from "react";
import "./contactform.css";
import "./contactoindexmediaqueries.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    servicio: "Nutrición Clínica",
    telefono: "",
    motivoConsulta: "",
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: null,
    error: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Resetear mensajes de error/éxito al comenzar a editar después de un envío
    if (status.success || status.error) {
      setStatus({
        submitting: false,
        success: null,
        error: null,
      });
    }
  };

  const handleSubmit = async (e) => {
    // Prevenir el comportamiento predeterminado del formulario (navegación)
    e.preventDefault();

    console.log("Form submitted:", formData);

    // Validar formulario
    if (!formData.nombre || !formData.email || !formData.servicio) {
      setStatus({
        submitting: false,
        success: null,
        error: "Por favor completa todos los campos obligatorios (*)",
      });
      return;
    }

    // Actualizar estado a "enviando"
    setStatus({
      submitting: true,
      success: null,
      error: null,
    });

    try {
      // URL directa al servidor de email (puerto 5002)
      const apiUrl = "http://localhost:5002/send-email";

      console.log("Enviando datos al servidor:", apiUrl);

      // Usar fetch con modo no-cors como fallback si es necesario
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "omit", // No enviar cookies
        mode: "cors", // Intentar con cors primero
        cache: "no-cache", // No usar caché
        body: JSON.stringify(formData),
      });

      console.log("Respuesta del servidor:", response.status);

      // Verificar la respuesta HTTP, incluso si no es JSON
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error en la respuesta del servidor:", response.status, errorText);
        throw new Error(`Error del servidor: ${response.status} ${errorText}`);
      }

      // Intentar parsear como JSON, pero manejar cualquier error
      let data;
      try {
        data = await response.json();
        console.log("Datos de respuesta:", data);
      } catch (parseError) {
        console.error("Error al parsear la respuesta como JSON:", parseError);
        // Si no podemos parsear como JSON pero la respuesta fue OK, asumimos éxito
        if (response.ok) {
          data = { message: "Email enviado con éxito" };
        } else {
          throw new Error("Error al procesar la respuesta del servidor");
        }
      }

      console.log("Form successfully submitted:", data);

      // Resetear formulario y mostrar éxito
      setFormData({
        nombre: "",
        apellido: "",
        email: "",
        servicio: "Nutrición Clínica",
        telefono: "",
        motivoConsulta: "",
      });

      setStatus({
        submitting: false,
        success: "¡Email enviado con éxito! Nos pondremos en contacto contigo lo antes posible.",
        error: null,
      });
    } catch (error) {
      console.error("Error submitting form:", error);

      // Mensaje de error más informativo
      let errorMsg = "Error al enviar el email: ";

      if (error.message && error.message.includes("Failed to fetch")) {
        errorMsg += "No se pudo conectar con el servidor. Asegúrate de que el servidor está funcionando en el puerto 5002.";
      } else if (error.message) {
        errorMsg += error.message;
      } else {
        errorMsg += "Inténtalo de nuevo más tarde";
      }

      setStatus({
        submitting: false,
        success: null,
        error: errorMsg,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {status.error && <div className="form-error-message">{status.error}</div>}

      {status.success && <div className="form-success-message">{status.success}</div>}

      <div className="nombreapellidoswrapper">
        <input type="text" name="nombre" id="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre*" autoComplete="on" required disabled={status.submitting} />
        <input type="text" name="apellido" id="apellido" value={formData.apellido} onChange={handleChange} placeholder="Apellido" autoComplete="on" disabled={status.submitting} />
      </div>
      <div className="email">
        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} placeholder="E-mail*" autoComplete="on" required disabled={status.submitting} />
      </div>

      <div className="serviciotelefonowrapper">
        <input type="tel" name="telefono" id="telefono" value={formData.telefono} onChange={handleChange} placeholder="Teléfono" autoComplete="on" disabled={status.submitting} />
        <select name="servicio" id="servicio" value={formData.servicio} onChange={handleChange} required autoComplete="on" disabled={status.submitting}>
          <option value="" disabled hidden>
            Selecciona un servicio
          </option>
          <option value="Nutrición Clínica">Nutrición Clínica</option>
          <option value="Nutrición Deportiva">Nutrición Deportiva</option>
          <option value="Pérdida de Peso">Pérdida de Peso</option>
          <option value="Hábitos Alimentarios">Hábitos Alimentarios</option>
        </select>
      </div>

      <div className="motivoconsultawrapper">
        <textarea name="motivoConsulta" id="motivoConsulta" value={formData.motivoConsulta} onChange={handleChange} placeholder="Motivo de la consulta*" autoComplete="on" required disabled={status.submitting} />
      </div>

      <button type="submit" disabled={status.submitting}>
        {status.submitting ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
}
