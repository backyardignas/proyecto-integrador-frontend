function login() {
    let usuarioInput = document.getElementById("usuario").value;
    let contraseñaInput = document.getElementById("contraseña").value;

    const usuariosPermitidos = {
        "Juliana": "123456",
        "Monroy": "123456",
        "Santiago": "123456",
        "Jose": "123456"
    };

    if (!usuarioInput || !contraseñaInput) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const ahora = Date.now();
    const tiempoBloqueo = localStorage.getItem(`bloqueo_${usuarioInput}`);

    if (tiempoBloqueo && ahora < tiempoBloqueo) {
        const segundosRestantes = Math.ceil((tiempoBloqueo - ahora) / 1000);
        alert(`Usuario bloqueado. Intenta en ${segundosRestantes} segundos.`);
        return;
    }

    if (usuariosPermitidos[usuarioInput] && usuariosPermitidos[usuarioInput] === contraseñaInput) {
        localStorage.removeItem(`intentos_${usuarioInput}`);
        localStorage.removeItem(`bloqueo_${usuarioInput}`);
        
        // Guardamos el nombre para que aparezca en la subpágina
        localStorage.setItem("usuarioLogueado", usuarioInput);
        
        // REDIRECCIÓN A ESTUDIANTES
        window.location.href = "estudiantes.html";
    } else {
        let intentos = parseInt(localStorage.getItem(`intentos_${usuarioInput}`)) || 0;
        intentos++;
        localStorage.setItem(`intentos_${usuarioInput}`, intentos);

        if (intentos >= 3) {
            const bloqueoTiempo = ahora + (2 * 60 * 1000);
            localStorage.setItem(`bloqueo_${usuarioInput}`, bloqueoTiempo);
            localStorage.setItem(`intentos_${usuarioInput}`, 0);
            alert("Has fallado 3 veces. Usuario bloqueado por 2 minutos.");
        } else {
            alert(`Credenciales incorrectas. Intentos: ${intentos}/3`);
        }
    }
}
/*hola*/
