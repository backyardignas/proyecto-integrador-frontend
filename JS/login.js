function login() {
    let usuarioInput = document.getElementById("usuario").value;
    let contraseñaInput = document.getElementById("contraseña").value;

    const usuariosPermitidos = {
        "Juliana": "123456",
        "Monroy": "123456",
        "Santiago": "123456",
        "Jose": "123456"
    };

    const tiempoBloqueo = localStorage.getItem("bloqueoHasta");
    const ahora = Date.now();

    if (tiempoBloqueo && ahora < tiempoBloqueo) {
        const segundosRestantes = Math.ceil((tiempoBloqueo - ahora) / 1000);
        alert(`Demasiados intentos. Intenta de nuevo en ${segundosRestantes} segundos.`);
        return; 
    }

    if (usuariosPermitidos[usuarioInput] && usuariosPermitidos[usuarioInput] === contraseñaInput) {
        localStorage.removeItem("intentosFallidos");
        localStorage.removeItem("bloqueoHasta");
        window.location.href = "Main.html";
    } else {
        let intentos = parseInt(localStorage.getItem("intentosFallidos")) || 0;
        intentos++;
        localStorage.setItem("intentosFallidos", intentos);

        if (intentos >= 3) {
            const bloqueoTiempo = ahora + (2 * 60 * 1000);
            localStorage.setItem("bloqueoHasta", bloqueoTiempo);
            localStorage.setItem("intentosFallidos", 0);
            alert("Has fallado 3 veces. Acceso bloqueado por 2 minutos.");
        } else {
            alert(`Credenciales incorrectas. Te quedan ${3 - intentos} intentos.`);
        }
    }
}