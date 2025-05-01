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
      // Usar una URL absoluta para evitar problemas de redirección
      const apiUrl = window.location.origin + "/send-email";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
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
      } else {
        throw new Error(data.message || "Error al enviar el email");
      }
    } catch (error) {
      console.error("Error submitting form:", error);

      setStatus({
        submitting: false,
        success: null,
        error: "Error al enviar el email: " + (error.message || "Inténtalo de nuevo más tarde"),
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
