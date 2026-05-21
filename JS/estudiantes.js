document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registro-form");
    const listaContenedor = document.getElementById("lista-estudiantes");
    const saludo = document.getElementById("saludo-usuario");
    const inputNombre = document.getElementById("nombre");
    const inputRol = document.getElementById("rol");
    const inputIndex = document.getElementById("edit-index");

    // 1. Mostrar nombre del usuario logueado (Persistencia de sesión)
    const usuarioActual = localStorage.getItem("usuarioLogueado") || "Invitado";
    saludo.textContent = `Bienvenido, ${usuarioActual}`;

    // 2. Cargar datos iniciales
    let estudiantes = JSON.parse(localStorage.getItem("estudiantes_db")) || [];

    const render = () => {
        listaContenedor.innerHTML = "";
        estudiantes.forEach((est, index) => {
            const card = document.createElement("div");
            card.className = "card-estudiante";
            card.innerHTML = `
                <h4>${est.nombre}</h4>
                <p>${est.rol}</p>
                <div class="actions">
                    <button class="btn-edit" onclick="editar(${index})">Editar</button>
                    <button class="btn-delete" onclick="eliminar(${index})">Borrar</button>
                </div>
            `;
            listaContenedor.appendChild(card);
        });
    };

    // 3. Crear / Actualizar
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const nuevoEstudiante = { nombre: inputNombre.value, rol: inputRol.value };
        const index = inputIndex.value;

        if (index === "") {
            estudiantes.push(nuevoEstudiante);
        } else {
            estudiantes[index] = nuevoEstudiante;
            inputIndex.value = "";
            document.getElementById("btn-guardar").textContent = "Guardar Registro";
        }

        localStorage.setItem("estudiantes_db", JSON.stringify(estudiantes));
        form.reset();
        render();
    });

    // 4. Funciones Globales (Eliminar y Editar)
    window.eliminar = (index) => {
        if (confirm("¿Seguro que deseas eliminar este registro?")) {
            estudiantes.splice(index, 1);
            localStorage.setItem("estudiantes_db", JSON.stringify(estudiantes));
            render();
        }
    };

    window.editar = (index) => {
        const est = estudiantes[index];
        inputNombre.value = est.nombre;
        inputRol.value = est.rol;
        inputIndex.value = index;
        document.getElementById("btn-guardar").textContent = "Actualizar Registro";
        window.scrollTo(0, 0);
    };

    render();
});
/*hola*/

