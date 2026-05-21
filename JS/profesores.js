// Variable global para almacenar los datos
let datos = [];
let editIndex = null; // Guarda el índice de la fila que se está editando

window.onload = function() {
    const usuario = localStorage.getItem("nombreProfe");
    
    if (usuario) {
        document.getElementById("texto-bienvenida").innerText = "Bienvenido, " + usuario;
        cargarDatos();
    } else {
        document.getElementById("texto-bienvenida").innerText = "Bienvenido, Usuario Invitado";
        cargarDatos();
    }
};

// Función única para Agregar o Actualizar
function guardar() {
    const n = document.getElementById("nombre").value.trim();
    const m = document.getElementById("materia").value.trim();
    const h = document.getElementById("horario").value.trim();

    if (n && m && h) {
        if (editIndex === null) {
            // MODO AGREGAR: Insertar nuevo registro
            datos.push({ nombre: n, materia: m, horario: h });
        } else {
            // MODO EDITAR: Actualizar el registro existente
            datos[editIndex] = { nombre: n, materia: m, horario: h };
            editIndex = null; // Resetear el estado de edición
            
            // Regresar el botón a su estado original
            const btn = document.getElementById("btn-guardar");
            btn.innerText = "Guardar Datos";
            btn.classList.remove("btn-warning");
            btn.classList.add("btn-primary");
        }
        
        // Limpiar campos del formulario
        limpiarFormulario();
        dibujarTabla();
    } else {
        alert("Por favor, completa todos los campos.");
    }
}

// Cargar los datos de la tabla de vuelta al formulario
function prepararEditar(index) {
    editIndex = index;
    const registro = datos[index];

    // Pasar los valores de la tabla a los inputs
    document.getElementById("nombre").value = registro.nombre;
    document.getElementById("materia").value = registro.materia;
    document.getElementById("horario").value = registro.horario;

    // Transformar visualmente el botón de guardar a modo actualización
    const btn = document.getElementById("btn-guardar");
    btn.innerText = "Actualizar Datos";
    btn.classList.remove("btn-primary");
    btn.classList.add("btn-warning"); // Color naranja/amarillo para denotar edición
}

function dibujarTabla() {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";
    
    datos.forEach((item, index) => {
        const fila = `
            <tr>
                <td>${item.nombre}</td>
                <td>${item.materia}</td>
                <td>${item.horario}</td>
                <td class="text-end text-nowrap">
                    <button class="btn btn-edit btn-sm me-2" onclick="prepararEditar(${index})">
                        Editar
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="eliminar(${index})">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
        lista.innerHTML += fila;
    });
}

function eliminar(index) {
    // Si estamos editando esa misma fila, cancelamos la edición primero
    if (editIndex === index) {
        alert("No puedes eliminar el registro mientras lo estás editando.");
        return;
    }

    if (confirm("¿Estás seguro de que deseas eliminar este registro?")) {
        datos.splice(index, 1);
        dibujarTabla();
    }
}

function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("materia").value = "";
    document.getElementById("horario").value = "";
}

function cargarDatos() {
    datos = [
        { nombre: "Diego Giraldo", materia: "FrontEnd", horario: "06:00 PM" }
    ];
    dibujarTabla();
}