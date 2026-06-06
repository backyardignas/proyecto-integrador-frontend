document.addEventListener('DOMContentLoaded', () => {
    const sesion = JSON.parse(localStorage.getItem('sesion_activa'));

    if (!sesion || sesion.rol !== 'profe') {
        window.location.href = 'loginProfesores.html';
        return;
    }

    document.getElementById('saludo-usuario').textContent = `Prof. ${sesion.nombre}`;
    document.getElementById('materia-profe').textContent = sesion.materia || '';

    cargarListaEstudiantes();
    mostrarTodosLosEstudiantes();

    document.getElementById('form-notas').addEventListener('submit', guardarNotas);
});

async function cargarListaEstudiantes() {
    const select = document.getElementById('sel-estudiante');
    select.innerHTML = '<option value="">-- Selecciona un estudiante --</option>';

    try {
        const respuesta = await fetch('./estudiantes.json');
        const datosEstudiantes = await respuesta.json();
        datosEstudiantes.forEach(est => {
            const claveBD = 'notas_' + est.nombre.toLowerCase().replace(/\s+/g, '_');
            if (!localStorage.getItem(claveBD)) {
                localStorage.setItem(claveBD, JSON.stringify({
                    nombre: est.nombre,
                    carrera: est.carrera,
                    nota1: est.nota1 || 0,
                    nota2: est.nota2 || 0,
                    nota3: est.nota3 || 0
                }));
            }
            const opcion = document.createElement('option');
            opcion.value = claveBD;
            opcion.textContent = est.nombre;
            select.appendChild(opcion);
        });
    } catch (error) {
        console.error(error);
    }
}

async function mostrarTodosLosEstudiantes() {
    const lista = document.getElementById('lista-estudiantes-profe');
    lista.innerHTML = '';

    try {
        const respuesta = await fetch('./estudiantes.json');
        const datosEstudiantes = await respuesta.json();

        datosEstudiantes.forEach(est => {
            const claveBD = 'notas_' + est.nombre.toLowerCase().replace(/\s+/g, '_');
            const guardado = JSON.parse(localStorage.getItem(claveBD)) || est;

            const n1 = parseFloat(guardado.nota1) || 0;
            const n2 = parseFloat(guardado.nota2) || 0;
            const n3 = parseFloat(guardado.nota3) || 0;
            const notaFinal = ((n1 * 0.3) + (n2 * 0.3) + (n3 * 0.4)).toFixed(1);
            const aprobado = parseFloat(notaFinal) >= 3.0;

            const bloque = document.createElement('div');
            bloque.style = "background: #fff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); margin-bottom: 12px; border-left: 5px solid #2c3e50;";
            bloque.innerHTML = `
                <h5 style="margin:0 0 4px 0; font-size:1.05rem;">${guardado.nombre} <small style="color:#95a5a6; font-size:0.8rem;">(${guardado.carrera})</small></h5>
                <p style="margin:0 0 4px 0; font-size:0.9rem;">N1 (30%): <strong>${n1}</strong> &nbsp;|&nbsp; N2 (30%): <strong>${n2}</strong> &nbsp;|&nbsp; N3 (40%): <strong>${n3}</strong></p>
                <p style="margin:0; font-size:0.95rem;"><strong>Definitiva:</strong> <span style="color:${aprobado ? '#2ecc71' : '#e74c3c'}; font-weight:bold;">${notaFinal}</span> &nbsp;<span style="font-size:0.8rem; color:${aprobado ? '#27ae60' : '#c0392b'};">${aprobado ? '✓ Aprobado' : '✗ Reprobado'}</span></p>
            `;
            lista.appendChild(bloque);
        });
    } catch (error) {
        console.error(error);
    }
}

function guardarNotas(e) {
    e.preventDefault();
    const claveBD = document.getElementById('sel-estudiante').value;

    if (claveBD === "") {
        alert("Primero debes seleccionar a un alumno de la lista desplegable.");
        return;
    }

    const datosActuales = JSON.parse(localStorage.getItem(claveBD)) || {};

    datosActuales.nota1 = parseFloat(document.getElementById('nota1-profe').value) || 0;
    datosActuales.nota2 = parseFloat(document.getElementById('nota2-profe').value) || 0;
    datosActuales.nota3 = parseFloat(document.getElementById('nota3-profe').value) || 0;

    localStorage.setItem(claveBD, JSON.stringify(datosActuales));

    alert("Las calificaciones han sido almacenadas con éxito.");
    document.getElementById('form-notas').reset();

    mostrarTodosLosEstudiantes();
}
