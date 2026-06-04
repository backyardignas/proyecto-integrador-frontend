async function login() {
    const usuarioEstudiante = document.getElementById('usuario').value.trim();
    const contraseniaEstudiante = document.getElementById('contraseña').value;

    if (usuarioEstudiante === "" || contraseniaEstudiante === "") {
        alert("Por favor, completa ambos campos para ingresar.");
        return;
    }

    try {
    
        const respuesta = await fetch('estudiantes.json');
        
        if (!respuesta.ok) {
            throw new Error(`No se encontró estudiantes.json. Estado: ${respuesta.status}`);
        }

        const datosEstudiantes = await respuesta.json();

        
        localStorage.setItem('bd_estudiantes', JSON.stringify(datosEstudiantes));

        
        const estudianteEncontrado = datosEstudiantes.find(
            est => est.nombre.toLowerCase() === usuarioEstudiante.toLowerCase()
        );

        
        if (estudianteEncontrado && estudianteEncontrado.clave === contraseniaEstudiante) {
            localStorage.setItem('sesion_activa', JSON.stringify({ 
                nombre: estudianteEncontrado.nombre, 
                rol: 'estudiante' 
            }));
            window.location.href = 'estudiantes.html';
        } else {
            alert("Usuario no encontrado o contraseña incorrecta.");
        }

    } catch (error) {
        console.error("Error en login.js:", error);
        alert("Error de conexión con la base de datos de estudiantes.");
    }
}