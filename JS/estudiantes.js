document.addEventListener('DOMContentLoaded', () => {
    const sesion = JSON.parse(localStorage.getItem('sesion_activa'));

    if (!sesion || sesion.rol !== 'estudiante') {
        window.location.href = 'login.html';
        return;
    }

    document.getElementById('saludo-usuario').textContent = `Hola, ${sesion.nombre}`;

    mostrarMisNotas(sesion);
});

function mostrarMisNotas(sesion) {
    const lista = document.getElementById('lista-estudiantes');
    const misNotas = JSON.parse(localStorage.getItem(sesion.claveBD));

    lista.innerHTML = '';

    if (!misNotas) {
        lista.innerHTML = '<p style="color: var(--texto-mutado); text-align: center; padding: 20px;">Aún no tienes notas asignadas por tu profesor.</p>';
        return;
    }

    const n1 = parseFloat(misNotas.nota1) || 0;
    const n2 = parseFloat(misNotas.nota2) || 0;
    const n3 = parseFloat(misNotas.nota3) || 0;
    const notaFinal = ((n1 * 0.3) + (n2 * 0.3) + (n3 * 0.4)).toFixed(1);
    const aprobado = parseFloat(notaFinal) >= 3.0;

    const tarjeta = document.createElement('div');
    tarjeta.className = 'card-estudiante';

    tarjeta.innerHTML = `
        <h4>${misNotas.nombre}</h4>
        <p class="carrera-text">${misNotas.carrera}</p>

        <div class="seccion-notas">
            <div class="desglose-notas">
                <span>Nota 1 &mdash; 30%</span>
                <strong>${n1.toFixed(1)}</strong>
            </div>
            <div class="desglose-notas">
                <span>Nota 2 &mdash; 30%</span>
                <strong>${n2.toFixed(1)}</strong>
            </div>
            <div class="desglose-notas">
                <span>Nota 3 &mdash; 40%</span>
                <strong>${n3.toFixed(1)}</strong>
            </div>
            <div class="fila-definitiva">
                <span class="etiqueta-final">Nota Definitiva</span>
                <span class="valor-final ${aprobado ? 'estado-aprobado' : 'estado-reprobado'}">
                    ${notaFinal} &nbsp; ${aprobado ? '✓ Aprobado' : '✗ Reprobado'}
                </span>
            </div>
        </div>

        <div class="aviso-readonly">
            <span>&#128274;</span> Solo tú puedes ver tus notas. Son asignadas por tu profesor.
        </div>
    `;

    lista.appendChild(tarjeta);
}
