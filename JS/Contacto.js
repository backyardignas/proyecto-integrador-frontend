// Procesa el envío del formulario de correspondencia
function procesarEnvio(event) {
    event.preventDefault(); // Impedimos la recarga innecesaria de la pantalla
    
    const nombre = document.getElementById('c-nombre').value;
    const modal = document.getElementById('modalExito');
    
    // Inyectamos dinámicamente un mensaje personalizado con el nombre del usuario
    document.getElementById('modalMensaje').textContent = `¡Muchas gracias ${nombre}! Tu mensaje ha sido recibido con éxito por nuestro equipo de soporte de la UDEO. Nos comunicaremos contigo muy pronto.`;
    
    // Activamos la visibilidad del modal flotante estético
    modal.style.display = 'flex';
}

// Cierra la ventana modal flotante de confirmación
function cerrarModalExito() {
    const modal = document.getElementById('modalExito');
    modal.style.display = 'none';
    
    // Reseteamos por completo los campos de texto del formulario
    document.getElementById('formularioContacto').reset();
}