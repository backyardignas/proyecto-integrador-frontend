document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-login-profe');
    if (!form) return;

    const MAX_INTENTOS = 3;
    const TIEMPO_BLOQUEO = 2 * 60 * 1000; // 2 minutos

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const usuarioInput = document.getElementById('user-profe');
        const passInput = document.getElementById('pass-profe');
        const usuario = usuarioInput.value.trim();
        const pass = passInput.value;

        // Si el campo de usuario está vacío, no hacemos nada
        if (!usuario) return;

        const ahora = Date.now();
        // Claves únicas por usuario
        const claveBloqueo = `bloqueoHasta_${usuario}`;
        const claveIntentos = `intentos_${usuario}`;

        const tiempoBloqueoHasta = localStorage.getItem(claveBloqueo);

        // 1. Verificar si este usuario específico está bloqueado
        if (tiempoBloqueoHasta && ahora < tiempoBloqueoHasta) {
            const segundosRestantes = Math.ceil((tiempoBloqueoHasta - ahora) / 1000);
            alert(`La cuenta de ${usuario} está bloqueada. Intenta de nuevo en ${segundosRestantes} segundos.`);
            return;
        }

        const profesValidos = {
            "Diego": "cesde2026",
            "Andres": "cesde2026",
            "Luis": "cesde2026",
        };

        // 2. Validar credenciales
        if (profesValidos[usuario] && profesValidos[usuario] === pass) {
            // Éxito: Limpiamos solo los datos de este usuario
            localStorage.removeItem(claveIntentos);
            localStorage.removeItem(claveBloqueo);
            localStorage.setItem("nombreProfe", usuario);
            window.location.href = "profesores.html";
        } else {
            // Fallo: Aumentar intentos solo para este usuario
            let intentos = parseInt(localStorage.getItem(claveIntentos) || 0);
            intentos++;
            localStorage.setItem(claveIntentos, intentos);

            if (intentos >= MAX_INTENTOS) {
                const tiempoExpiracion = Date.now() + TIEMPO_BLOQUEO;
                localStorage.setItem(claveBloqueo, tiempoExpiracion);
                localStorage.setItem(claveIntentos, 0); 
                alert(`Has superado los intentos para la cuenta de ${usuario}. Bloqueada por 2 minutos.`);
            } else {
                alert(`Credenciales incorrectas para ${usuario}. Quedan ${MAX_INTENTOS - intentos} intentos.`);
                passInput.value = "";
                passInput.focus();
            }
        }
    });
});
/*hola*/
