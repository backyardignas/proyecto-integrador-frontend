document.getElementById('form-login-profe').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evitamos recargar la página
    
    const usuarioProfe = document.getElementById('user-profe').value.trim();
    const passProfe = document.getElementById('pass-profe').value;
    
    try {
        // Conectamos con el archivo .json en la raíz
        const respuesta = await fetch('profesores.json');
        
        if (!respuesta.ok) {
            throw new Error(`No se encontró profesores.json. Estado: ${respuesta.status}`);
        }

        const datosProfesores = await respuesta.json();

        // Forzamos al LocalStorage a actualizarse con los datos nuevos
        localStorage.setItem('bd_profesores', JSON.stringify(datosProfesores));

        // Buscamos al docente (Corregido el error de nombre de variable)
        const profesorEncontrado = datosProfesores.find(
            profe => profe.nombre.toLowerCase() === usuarioProfe.toLowerCase()
        );

        // Validamos contra la clave real del JSON
        if (profesorEncontrado && profesorEncontrado.clave === passProfe) {
            localStorage.setItem('sesion_activa', JSON.stringify({ 
                nombre: profesorEncontrado.nombre, 
                rol: 'profesor' 
            }));
            window.location.href = 'profesores.html';
        } else {
            alert("Usuario incorrecto o contraseña inválida.");
        }

    } catch (error) {
        console.error("Error en loginProfesores.js:", error);
        alert("Error de conexión con la base de datos de docentes.");
    }
});