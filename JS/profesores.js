// JS/profesores.js
document.addEventListener('DOMContentLoaded', () => {
    const sesion = JSON.parse(localStorage.getItem('sesion_activa'));
    if (sesion) {
        document.getElementById('saludo-usuario').textContent = `Prof. ${sesion.nombre}`;
    }

    actualizarTablaProfesores();
    rellenarSelectorEstudiantes();
    mostrarEstudiantesParaProfesor();

   
    document.getElementById('professor-form').addEventListener('submit', procesarProfesor);
    
    
    document.getElementById('form-notas').addEventListener('submit', actualizarNotasDeAlumno);
});

function actualizarTablaProfesores() {
    const tabla = document.getElementById('lista-profesores');
    const profesores = JSON.parse(localStorage.getItem('bd_profesores')) || [];
    tabla.innerHTML = '';

    profesores.forEach((profe, posicion) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${profe.nombre}</td>
            <td>${profe.materia}</td>
            <td>${profe.horario}</td>
            <td>
                <button onclick="prepararEdicionProfe(${posicion})" style="background:#f39c12; color:white; border:none; padding:4px 10px; border-radius:4px; cursor:pointer;">Editar</button>
                <button onclick="borrarProfesor(${posicion})" style="background:#e74c3c; color:white; border:none; padding:4px 10px; border-radius:4px; cursor:pointer; margin-left:5px;">Borrar</button>
            </td>
        `;
        tabla.appendChild(fila);
    });
}

function procesarProfesor(e) {
    e.preventDefault();
    const profesores = JSON.parse(localStorage.getItem('bd_profesores')) || [];
    const idEdicion = document.getElementById('indice-edicion').value;

    const datosProfe = {
        nombre: document.getElementById('nombre').value.trim(),
        materia: document.getElementById('materia').value.trim(),
        horario: document.getElementById('horario').value.trim(),
        clave: "UDEO2026" // Mantiene la clave por defecto al crear nuevos desde el panel
    };

    if (idEdicion === "") {
        profesores.push(datosProfe);
    } else {
        profesores[idEdicion] = datosProfe;
        document.getElementById('indice-edicion').value = "";
        document.getElementById('form-titulo').textContent = "Registrar Profesor";
    }

    localStorage.setItem('bd_profesores', JSON.stringify(profesores));
    document.getElementById('professor-form').reset();
    actualizarTablaProfesores();
}

function prepararEdicionProfe(posicion) {
    const profesores = JSON.parse(localStorage.getItem('bd_profesores'));
    const profe = profesores[posicion];

    document.getElementById('nombre').value = profe.nombre;
    document.getElementById('materia').value = profe.materia;
    document.getElementById('horario').value = profe.horario;
    document.getElementById('indice-edicion').value = posicion;
    document.getElementById('form-titulo').textContent = "Modificar Datos Profesor";
}

function borrarProfesor(posicion) {
    if (confirm("¿Estás seguro de eliminar a este docente?")) {
        const profesores = JSON.parse(localStorage.getItem('bd_profesores'));
        profesores.splice(posicion, 1);
        localStorage.setItem('bd_profesores', JSON.stringify(profesores));
        actualizarTablaProfesores();
    }
}

function rellenarSelectorEstudiantes() {
    const select = document.getElementById('sel-estudiante');
    const estudiantes = JSON.parse(localStorage.getItem('bd_estudiantes')) || [];
    select.innerHTML = '<option value="">-- Selecciona un estudiante --</option>';
    
    estudiantes.forEach((est, index) => {
        const opcion = document.createElement('option');
        opcion.value = index;
        opcion.textContent = est.nombre;
        select.appendChild(opcion);
    });
}

function mostrarEstudiantesParaProfesor() {
    const listaProfe = document.getElementById('lista-estudiantes-profe');
    const estudiantes = JSON.parse(localStorage.getItem('bd_estudiantes')) || [];
    listaProfe.innerHTML = '';

    estudiantes.forEach(est => {
        const n1 = parseFloat(est.nota1) || 0;
        const n2 = parseFloat(est.nota2) || 0;
        const n3 = parseFloat(est.nota3) || 0;
        const de_verdad_final = ((n1 * 0.3) + (n2 * 0.3) + (n3 * 0.4)).toFixed(1);

        const bloque = document.createElement('div');
        bloque.style = "background: #fff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); margin-bottom: 12px; border-left: 5px solid #2c3e50;";
        bloque.innerHTML = `
            <h5 style="margin:0 0 5px 0; font-size:1.05rem;">${est.nombre} <small style="color:#95a5a6; font-size:0.8rem;">(${est.carrera})</small></h5>
            <p style="margin:0 0 5px 0; font-size:0.9rem;">Notas: N1 (30%): <strong>${n1}</strong> | N2 (30%): <strong>${n2}</strong> | N3 (40%): <strong>${n3}</strong></p>
            <p style="margin:0; font-size:0.95rem;"><strong>Definitiva Actual:</strong> <span style="color:${de_verdad_final >= 3 ? '#2ecc71' : '#e74c3c'}; font-weight:bold;">${de_verdad_final}</span></p>
        `;
        listaProfe.appendChild(bloque);
    });
}

function actualizarNotasDeAlumno(e) {
    e.preventDefault();
    const estudiantes = JSON.parse(localStorage.getItem('bd_estudiantes')) || [];
    const posicionAlumno = document.getElementById('sel-estudiante').value;

    if (posicionAlumno === "") {
        alert("Primero debes seleccionar a un alumno de la lista desplegable.");
        return;
    }

    estudiantes[posicionAlumno].nota1 = parseFloat(document.getElementById('nota1-profe').value) || 0;
    estudiantes[posicionAlumno].nota2 = parseFloat(document.getElementById('nota2-profe').value) || 0;
    estudiantes[posicionAlumno].nota3 = parseFloat(document.getElementById('nota3-profe').value) || 0;

    localStorage.setItem('bd_estudiantes', JSON.stringify(estudiantes));
    
    alert("Las calificaciones han sido almacenadas con éxito.");
    document.getElementById('form-notas').reset();
    
    mostrarEstudiantesParaProfesor();
}