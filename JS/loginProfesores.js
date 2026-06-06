document.getElementById('form-login-profe').addEventListener('submit', async function(event) {
    event.preventDefault();
    const usuarioProfe = document.getElementById('user-profe').value.trim();
    const passProfe = document.getElementById('pass-profe').value;

    try {
        const respuesta = await fetch('./profesores.json');
        if (!respuesta.ok) throw new Error(`Error: ${respuesta.status}`);

        const datosProfesores = await respuesta.json();

        const profesorEncontrado = datosProfesores.find(
            profe => profe.nombre.toLowerCase() === usuarioProfe.toLowerCase()
        );

        if (profesorEncontrado && profesorEncontrado.clave === passProfe) {
            localStorage.setItem('sesion_activa', JSON.stringify({
                nombre: profesorEncontrado.nombre,
                materia: profesorEncontrado.materia,
                rol: 'profe'
            }));
            window.location.href = 'profesores.html';
        } else {
            alert("Usuario incorrecto o contraseña inválida.");
        }
    } catch (error) {
        console.error(error);
        alert("Error de conexión con la base de datos de docentes.");
    }
});
