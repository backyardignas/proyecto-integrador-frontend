async function login() {
    const usuarioEstudiante = document.getElementById('usuario').value.trim();
    const contraseniaEstudiante = document.getElementById('contraseña').value;

    if (usuarioEstudiante === "" || contraseniaEstudiante === "") {
        alert("Por favor, completa ambos campos para ingresar.");
        return;
    }

    try {
        const respuesta = await fetch('./estudiantes.json');
        if (!respuesta.ok) throw new Error(`Error: ${respuesta.status}`);

        const datosEstudiantes = await respuesta.json();

        const estudianteEncontrado = datosEstudiantes.find(
            est => est.nombre.toLowerCase() === usuarioEstudiante.toLowerCase()
        );

        if (estudianteEncontrado && estudianteEncontrado.clave === contraseniaEstudiante) {
            const claveBD = 'notas_' + estudianteEncontrado.nombre.toLowerCase().replace(/\s+/g, '_');
            if (!localStorage.getItem(claveBD)) {
                const notasIniciales = {
                    nombre: estudianteEncontrado.nombre,
                    carrera: estudianteEncontrado.carrera,
                    nota1: estudianteEncontrado.nota1 || 0,
                    nota2: estudianteEncontrado.nota2 || 0,
                    nota3: estudianteEncontrado.nota3 || 0
                };
                localStorage.setItem(claveBD, JSON.stringify(notasIniciales));
            }

            localStorage.setItem('sesion_activa', JSON.stringify({
                nombre: estudianteEncontrado.nombre,
                carrera: estudianteEncontrado.carrera,
                rol: 'estudiante',
                claveBD: claveBD
            }));

            window.location.href = 'estudiantes.html';
        } else {
            alert("Usuario no encontrado o contraseña incorrecta.");
        }
    } catch (error) {
        console.error(error);
        alert("Error de conexión con la base de datos de estudiantes.");
    }
}
