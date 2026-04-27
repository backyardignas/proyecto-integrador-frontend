  const form = document.getElementById('form-login-profe');

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const usuario = document.getElementById('user-profe').value.trim();
            const pass = document.getElementById('pass-profe').value;

            // Base de datos de profesores autorizados
            const profesValidos = {
                "Diego": "cesde2026",
                "Andres": "cesde2026",
                "Luis": "cesde2026",
            };

            if (profesValidos[usuario] && profesValidos[usuario] === pass) {
                // Guardar el nombre para la alerta de bienvenida en la siguiente página
                localStorage.setItem("nombreProfe", usuario);
                // Redirección exitosa
                window.location.href = "profesores.html";
            } else {
                alert("Error: Las credenciales de profesor son incorrectas.");
            }
        });
