// Cuando toda la estructura de la página cargue, ejecutamos el código
document.addEventListener('DOMContentLoaded', () => {

    const sesion = JSON.parse(localStorage.getItem('sesion_activa'));
    const saludo = document.getElementById('saludo-usuario');
    
    if (sesion) {
        saludo.textContent = `Hola, ${sesion.nombre}`;
    } else {
        saludo.textContent = "Estudiante";
    }

    
    const formulario = document.getElementById('formulario-registro');
    if (formulario) {
        const elementos = formulario.querySelectorAll('input, select, button');
        elementos.forEach(item => item.disabled = true);
    }

    
    mostrarEstudiantesEnPantalla();
});

// Función encargada de renderizar las tarjetas de los alumnos
function mostrarEstudiantesEnPantalla() {
    const lista = document.getElementById('lista-estudiantes');
    
    const estudiantes = JSON.parse(localStorage.getItem('bd_estudiantes')) || [];
    
    
    lista.innerHTML = '';

    
    if (estudiantes.length === 0) {
        lista.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #7f8c8d;">No hay alumnos registrados.</p>';
        return;
    }

    
    estudiantes.forEach(est => {
        const n1 = parseFloat(est.nota1) || 0;
        const n2 = parseFloat(est.nota2) || 0;
        const n3 = parseFloat(est.nota3) || 0;
        
        // Calculamos la definitiva con los porcentajes estipulados (30%30%, 40%)
        const notaFinal = ((n1 * 0.3) + (n2 * 0.3) + (n3 * 0.4)).toFixed(1);

        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-estudiante';
        tarjeta.style = "background: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 15px;";
        
    
        tarjeta.innerHTML = `
            <h3 style="color: #2c3e50; margin-bottom: 5px; font-size: 1.2rem;">${est.nombre}</h3>
            <p style="color: #7f8c8d; font-size: 0.9rem; margin-bottom: 10px;"><strong>Carrera:</strong> ${est.carrera}</p>
            <p style="margin-bottom: 6px; font-size: 0.95rem;">Cortes: [N1: ${n1}] | [N2: ${n2}] | [N3: ${n3}]</p>
            <p style="margin-0; font-size: 1rem;"><strong>Nota Definitiva:</strong> <span style="color: ${notaFinal >= 3.0 ? '#2ecc71' : '#e74c3c'}; font-weight: bold;">${notaFinal}</span></p>
        `;
        lista.appendChild(tarjeta);
    });
}