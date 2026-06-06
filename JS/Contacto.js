function procesarEnvio(event) {
    event.preventDefault();

    const nombre = document.getElementById('c-nombre').value;
    const email = document.getElementById('c-email').value;
    const asunto = document.getElementById('c-asunto').value;
    const mensaje = document.getElementById('c-mensaje').value;

    const destinatario = "soporte@udeo.edu.co";

    const cuerpo = `
Nombre: ${nombre}
Correo: ${email}
Asunto: ${asunto}

Mensaje:
${mensaje}
`;

    window.location.href =
        `mailto:${destinatario}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
}