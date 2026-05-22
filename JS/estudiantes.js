document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario-registro");
    const contenedorLista = document.getElementById("lista-estudiantes");
    const saludo = document.getElementById("saludo-usuario");
    const inputNombre = document.getElementById("nombre");
    const inputCarrera = document.getElementById("carrera");
    const inputIndice = document.getElementById("indice-edicion");
    
    const inputNota1 = document.getElementById("nota1");
    const inputNota2 = document.getElementById("nota2");
    const inputNota3 = document.getElementById("nota3");

    // Persistencia de la sesión del usuario
    const usuarioActual = localStorage.getItem("usuarioLogueado") || "Invitado";
    saludo.textContent = `Bienvenido, ${usuarioActual}`;

    // Cargar base de datos local
    let estudiantesBaseDatos = JSON.parse(localStorage.getItem("estudiantes_db")) || [];

    // Función para pintar las tarjetas en el HTML
    const dibujarTablero = () => {
        contenedorLista.innerHTML = "";
        
        estudiantesBaseDatos.forEach((estudiante, indice) => {
            const n1 = estudiante.nota1 !== undefined ? parseFloat(estudiante.nota1) : 0;
            const n2 = estudiante.nota2 !== undefined ? parseFloat(estudiante.nota2) : 0;
            const n3 = estudiante.nota3 !== undefined ? parseFloat(estudiante.nota3) : 0;
            
            // Fórmula promedio N1 (30%), N2 (30%), N3 (40%)
            const notaDefinitiva = (n1 * 0.3) + (n2 * 0.3) + (n3 * 0.4);
            const aprobado = notaDefinitiva >= 3.0;
            
            // Definimos la clase de color según el estado académico
            const claseEstado = aprobado ? "estado-aprobado" : "estado-reprobado";
            const textoEstado = aprobado ? "Aprobado" : "Reprobado";

            const tarjeta = document.createElement("div");
            tarjeta.className = "card-estudiante";
            
            tarjeta.innerHTML = `
                <h4>${estudiante.nombre}</h4>
                <p class="carrera-text">${estudiante.carrera}</p>
                
                <!-- Contenedor visual de las notas -->
                <div class="seccion-notas">
                    <div class="desglose-notas">
                        <span>N1 (30%): <strong>${n1.toFixed(1)}</strong></span>
                        <span>N2 (30%): <strong>${n2.toFixed(1)}</strong></span>
                        <span>N3 (40%): <strong>${n3.toFixed(1)}</strong></span>
                    </div>
                    <div class="fila-definitiva">
                        <span class="etiqueta-final">Nota Final:</span>
                        <span class="valor-final ${claseEstado}">
                            ${notaDefinitiva.toFixed(2)} (${textoEstado})
                        </span>
                    </div>
                </div>

                <div class="actions">
                    <button class="btn-edit" onclick="prepararEdicion(${indice})">Editar</button>
                    <button class="btn-delete" onclick="removerEstudiante(${indice})">Borrar</button>
                </div>
            `;
            contenedorLista.appendChild(tarjeta);
        });
    };

    // 3. Escuchador del formulario (Guardar / Actualizar)
    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        
        const nuevoEstudiante = { 
            nombre: inputNombre.value, 
            carrera: inputCarrera.value,
            nota1: inputNota1.value,
            nota2: inputNota2.value,
            nota3: inputNota3.value
        };
        
        const indice = inputIndice.value;

        if (indice === "") {
            estudiantesBaseDatos.push(nuevoEstudiante);
        } else {
            estudiantesBaseDatos[indice] = nuevoEstudiante;
            inputIndice.value = "";
            document.getElementById("btn-guardar").textContent = "Guardar Registro";
        }

        localStorage.setItem("estudiantes_db", JSON.stringify(estudiantesBaseDatos));
        formulario.reset();
        dibujarTablero();
    });

    // 4. Funciones asignadas a la ventana global para los botones
    window.removerEstudiante = (indice) => {
        if (confirm("¿Seguro que deseas eliminar este registro?")) {
            estudiantesBaseDatos.splice(indice, 1);
            localStorage.setItem("estudiantes_db", JSON.stringify(estudiantesBaseDatos));
            dibujarTablero();
        }
    };

    window.prepararEdicion = (indice) => {
        const estudiante = estudiantesBaseDatos[indice];
        inputNombre.value = estudiante.nombre;
        inputCarrera.value = estudiante.carrera;
        
        inputNota1.value = estudiante.nota1 !== undefined ? estudiante.nota1 : "";
        inputNota2.value = estudiante.nota2 !== undefined ? estudiante.nota2 : "";
        inputNota3.value = estudiante.nota3 !== undefined ? estudiante.nota3 : "";
        
        inputIndice.value = indice;
        document.getElementById("btn-guardar").textContent = "Actualizar Registro";
        window.scrollTo(0, 0);
    };

    dibujarTablero();
});
/*hola*/