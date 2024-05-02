import { useState } from 'react';
import './contactform.css';
import './contactoindexmediaqueries.css';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    servicio: 'Nutrición Clínica',
    telefono: '',
    motivoConsulta: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  
    try {
      console.log('Form successfully submitted');
      setFormData({
        nombre: '',
        apellido: '',
        email: '',
        servicio: 'Nutrición Clínica',
        telefono: '',
        motivoConsulta: '',
      });
      alert('Email enviado con éxito');
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error here, if needed
    }
  };
  
  return (
    <form obnSubmit={handleSubmit} method="post" action='sendemail.php'>
      <div className="nombreapellidoswrapper">
        <input
          type="text"
          name="nombre"
          id="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre*"
          autoComplete="on" // Add autocomplete attribute
          required
        />
        <input
          type="text"
          name="apellido"
          id="apellido"
          value={formData.apellido}
          onChange={handleChange}
          placeholder="Apellido"
          autoComplete="on" // Add autocomplete attribute
        />
      </div>
      <div className="email">
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="E-mail*"
          autoComplete="on" // Add autocomplete attribute
          required
        />
      </div>
  
      <div className="serviciotelefonowrapper">
        <input
          type="tel"
          name="telefono"
          id="telefono"
          value={formData.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
          autoComplete="on" // Add autocomplete attribute
        />
        <select
          name="servicio"
          id="servicio"
          value={formData.servicio}
          onChange={handleChange}
          required
          autoComplete="on" // Add autocomplete attribute
        >
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
        <textarea
          name="motivoConsulta"
          id="motivoConsulta"
          value={formData.motivoConsulta}
          onChange={handleChange}
          placeholder="Motivo de la consulta*"
          autoComplete="on" // Add autocomplete attribute
        />
      </div>
  
      <button type="submit">Enviar</button>
    </form>
  );
  
}  