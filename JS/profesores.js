document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('student-form');
    const studentList = document.getElementById('student-list');
    
    // 1. Cargar estudiantes al abrir la página
    let estudiantes = JSON.parse(localStorage.getItem('listaEstudiantes')) || [];
    renderEstudiantes();

    // 2. Evento para Guardar (Crear o Editar)
    studentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const id = document.getElementById('student-id').value;
        const nombre = document.getElementById('nombre').value;
        const programa = document.getElementById('programa').value;

        if (id) {
            // Editar existente
            estudiantes = estudiantes.map(est => 
                est.id == id ? { ...est, nombre, programa } : est
            );
        } else {
            // Crear nuevo
            const nuevoEstudiante = {
                id: Date.now(), // ID único basado en el tiempo
                nombre,
                programa
            };
            estudiantes.push(nuevoEstudiante);
        }

        guardarYRenderizar();
        studentForm.reset();
        document.getElementById('student-id').value = ''; // Limpiar ID oculto
    });

    // 3. Función para guardar en LocalStorage y dibujar la tabla
    function guardarYRenderizar() {
        localStorage.setItem('listaEstudiantes', JSON.stringify(estudiantes));
        renderEstudiantes();
    }

    // 4. Función para mostrar los estudiantes en la tabla
    function renderEstudiantes() {
        studentList.innerHTML = '';
        
        estudiantes.forEach(est => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${est.nombre}</td>
                <td>${est.programa}</td>
                <td>
                    <button class="btn-edit" onclick="prepararEdicion(${est.id})">Editar</button>
                    <button class="btn-delete" onclick="eliminarEstudiante(${est.id})">Eliminar</button>
                </td>
            `;
            studentList.appendChild(row);
        });
    }

    // 5. Funciones Globales para los botones (Edit/Delete)
    window.eliminarEstudiante = (id) => {
        if (confirm('¿Estás seguro de eliminar a este estudiante?')) {
            estudiantes = estudiantes.filter(est => est.id !== id);
            guardarYRenderizar();
        }
    };

    window.prepararEdicion = (id) => {
        const est = estudiantes.find(e => e.id === id);
        document.getElementById('student-id').value = est.id;
        document.getElementById('nombre').value = est.nombre;
        document.getElementById('programa').value = est.programa;
        document.getElementById('nombre').focus();
    };
});
/*hola*/