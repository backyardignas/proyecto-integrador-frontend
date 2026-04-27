// Variable global para almacenar los datos
let datos = [];

window.onload = function() {
    const usuario = localStorage.getItem("nombreProfe");
    
    if (usuario) {
        document.getElementById("texto-bienvenida").innerText = "Bienvenido, " + usuario;
        cargarDatos();
    } else {
        // Simulación de protección de ruta (descomentar en producción)
        // window.location.replace("login-profesores.html");
        document.getElementById("texto-bienvenida").innerText = "Bienvenido, Usuario Invitado";
        cargarDatos();
    }
};

function agregar() {
    const n = document.getElementById("nombre").value;
    const m = document.getElementById("materia").value;
    const h = document.getElementById("horario").value;

    if(n && m && h) {
        datos.push({ nombre: n, materia: m, horario: h });
        
        // Limpiar campos
        document.getElementById("nombre").value = "";
        document.getElementById("materia").value = "";
        document.getElementById("horario").value = "";
        
        dibujarTabla();
    } else {
        alert("Por favor, completa todos los campos.");
    }
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
                <td>
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
    if(confirm("¿Estás seguro de que deseas eliminar este registro?")) {
        datos.splice(index, 1);
        dibujarTabla();
    }
}

function salir() {
    localStorage.removeItem("nombreProfe");
    alert("Sesión cerrada");
    // window.location.replace("login-profesores.html");
}

function cargarDatos() {
    datos = [
        { nombre: "Diego Giraldo", materia: "FrontEnd", horario: "06:00 PM" }
    ];
    dibujarTabla();
}