
        function procesarEnvio(e) {
            e.preventDefault();
            
            const nombre = document.getElementById('c-nombre').value;
            const asunto = document.getElementById('c-asunto').value;
            
            let departamento = "Atención General";
            if (asunto === "admisiones") departamento = "Oficina de Admisiones y Registro";
            if (asunto === "soporte") departamento = "Dirección de Tecnologías (TI)";
            if (asunto === "facultades") departamento = "Decanatura Académica";

            // Modificar mensaje del modal dinámicamente
            document.getElementById('modalMensaje').innerText = `Hola ${nombre}, tu mensaje ha sido radicado correctamente en la ${departamento}. Nos pondremos en contacto contigo lo antes posible.`;
            
            // Mostrar modal
            document.getElementById('modalExito').classList.add('activo');
            
            // Limpiar formulario
            document.getElementById('formularioContacto').reset();
        }

        function cerrarModalExito() {
            document.getElementById('modalExito').classList.remove('activo');
        }
  