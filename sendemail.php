<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form data
    $nombre = $_POST["nombre"];
    $apellido = $_POST["apellido"];
    $email = $_POST["email"];
    $telefono = $_POST["telefono"];
    $servicio = $_POST["servicio"];
    $motivoConsulta = $_POST["motivoConsulta"];
    
    // Email information
    $to = "guillermofernandeznutricion@gmail.com"; // Change this to your email address
    $subject = "Nueva Consulta Nutricional";
    $message = "Nombre: $nombre\n";
    $message .= "Apellido: $apellido\n";
    $message .= "Email: $email\n";
    $message .= "Teléfono: $telefono\n";
    $message .= "Servicio: $servicio\n";
    $message .= "Motivo de la consulta: $motivoConsulta\n";
    
    // Set additional headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    // Send email
    if (mail($to, $subject, $message, $headers)) {
       echo '<script>alert("Email enviado con éxito.");</script>';
    // Redirect after displaying the alert
    echo '<script>window.location.href="/";</script>';
        
    } else {
        echo "Hubo un error al enviar tu consulta. Por favor, inténtalo de nuevo más tarde.";
    }
} else {
    // If the form is not submitted, redirect back to the form page
    echo "not working"; // Change this to the actual filename of your form page
    exit;
}
?>