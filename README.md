# 🎓 Sistema de Gestión Académica - UniOriente

¡Bienvenido profe Diego! Este es el proyecto integrador de desarrollo web diseñado para la administración y control de estudiantes y profesores de **UniOriente**. La aplicación cuenta con una interfaz moderna y estilizada en tonos lilas que facilita el registro de usuarios, el control de materias y el seguimiento del rendimiento académico.

## 🚀 Características Principales

* **Módulo de Profesores:** Registro completo de docentes con asignación de su materia correspondiente y control de horarios de clase.
* **Módulo de Estudiantes:** Registro de alumnos vinculados a su carrera específica (Ingeniería de Sistemas, Derecho, Administración o Diseño Gráfico).
* **Control de Calificaciones:** Captura de tres notas parciales por estudiante, con un cálculo automático del promedio ponderado basado en los siguientes porcentajes:
  * **Nota 1:** 30%
  * **Nota 2:** 30%
  * **Nota 3:** 40%
* **Indicador Visual de Estado:** Las tarjetas de los estudiantes muestran automáticamente si el alumno está **Aprobado** (verde, nota mayor o igual a 3.0) o **Reprobado** (rojo, nota menor a 3.0).
* **Persistencia de Datos (Sesión y Base de Datos):** * Guarda los registros de forma local mediante `localStorage` para que la información no se pierda al recargar el navegador.
  * Muestra un saludo dinámico de bienvenida con el nombre del usuario que inició sesión.

---

## 🧩 Funcionamiento Detallado por Módulos

El sistema está dividido en dos grandes secciones operativas. A continuación se explica la arquitectura, responsabilidades y el comportamiento técnico de cada página HTML y su respectivo archivo JavaScript:

### 🏫 1. Módulo de Profesores (`profesores.html` + `profesores.js`)

Este módulo está diseñado para que la institución lleve el control de qué docentes dictan cuáles materias y en qué horarios específicos.

#### 🏛️ Estructura del HTML (`profesores.html`)
* **Barra de Navegación (Header):** Contiene el logotipo circular de la institución, el título de la plataforma y un contenedor dinámico (`#saludo-usuario`) para el nombre del docente que inició sesión, junto a un botón para cerrar la sesión actual.
* **Formulario de Registro:** Ubicado en la sección izquierda. Posee casillas de texto para capturar el *Nombre Completo*, un menú desplegable para la *Asignatura* y un campo para el *Horario*. Cuenta también con un campo oculto (`#indice-edicion`) y el botón principal de envío (`#btn-guardar`).
* **Tabla de Visualización:** Ubicada en la sección derecha. Estructura los registros guardados en columnas legibles: Nombre, Materia, Horario y Acciones (Botones de Editar y Borrar).

#### 🧠 Lógica del JavaScript (`profesores.js`)
* **Carga Inicial (`DOMContentLoaded`):** El script lee el espacio `usuarioLogueado` del almacenamiento local para inyectar el nombre del usuario en el encabezado. Adicionalmente, precarga un registro de ejemplo y llama a la función para renderizar la tabla.
* **Eventos del Formulario (Guardar/Actualizar):** Al hacer clic en el botón de envío, el script previene la recarga por defecto (`e.preventDefault()`), extrae los valores escritos en las cajas de texto y valida el campo oculto:
  * *Si está vacío:* Ejecuta un método `.push()` para anexar el nuevo profesor al arreglo de datos.
  * *Si tiene un número:* Entiende que es una edición, reemplaza el objeto viejo en ese índice específico y restaura el diseño del botón principal.
* **Interactividad en Filas (Editar y Borrar):** * La función de edición toma el índice seleccionado, mapea los atributos del objeto de vuelta a los inputs del formulario para que el usuario pueda modificarlos y desplaza la pantalla suavemente hacia arriba.
  * La función de eliminación ejecuta un método `.splice(indice, 1)` para remover permanentemente al profesor seleccionado del arreglo y redibuja la tabla actualizada inmediatamente.

---

### 🧑‍🎓 2. Módulo de Estudiantes (`estudiantes.html` + `estudiantes.js`)

Esta es la sección más avanzada del sistema. No solo almacena alumnos, sino que gestiona calificaciones, calcula promedios ponderados en tiempo real y evalúa el rendimiento académico.

#### 🏛️ Estructura del HTML (`estudiantes.html`)
* **Formulario de Registro Avanzado:** Dispone de un campo de texto para el *Nombre Completo*, un selector para la *Carrera* y una fila interna con tres casillas numéricas (`input type="number"`) configuradas con límites de `min="0"` y `max="5"` para registrar las tres notas parciales.
* **Tablero de Tarjetas (Grid de Estudiantes):** En lugar de una tabla lineal, este módulo cuenta con un contenedor flexible (`#lista-estudiantes`) diseñado para agrupar tarjetas individuales (`card-estudiante`) por cada alumno guardado.

#### 🧠 Lógica del JavaScript (`estudiantes.js`)
* **Base de Datos Local Completa (`localStorage`):** Al iniciar, el script extrae la clave `estudiantes_db`. Si contiene datos, transforma esa cadena de texto en un arreglo de objetos manipulable usando `JSON.parse()`. Cada inserción o borrado actualiza inmediatamente esta memoria usando `JSON.stringify()`.
* **Cálculo Matemático Automatizado:** Dentro de la función de renderizado, el script recorre el arreglo de estudiantes y por cada uno realiza la siguiente operación matemática en base a los pesos académicos establecidos:
  $$\text{Definitiva} = (\text{Nota}_1 \times 0.3) + (\text{Nota}_2 \times 0.3) + (\text{Nota}_3 \times 0.4)$$
* **Evaluación de Estado Dinámica:** Una vez obtenido el promedio, un bloque condicional evalúa si el resultado es mayor o igual a `3.0`:
  * *Si aprueba:* Le concatena a la tarjeta el texto `(Aprobado)` y le asigna la clase CSS `.estado-aprobado` (color verde).
  * *Si reprueba:* Le concatena el texto `(Reprobado)` y le asigna la clase CSS `.estado-reprobado` (color rojo).
* **Formulario Inteligente de Doble Acción (Agregar vs Editar):** * *Modo Agregar:* Si el input oculto está vacío, al dar clic en guardar el sistema hace un `.push()` para meter un registro nuevo.
  * *Modo Editar:* Al dar clic en "Editar" en cualquier tarjeta, las tres calificaciones parciales se extraen del objeto y se cargan nuevamente en las casillas numéricas, guardando su posición en el campo oculto. Al volver a guardar, el sistema detecta el índice, sobrescribe los datos en esa posición exacta del arreglo y limpia el formulario restableciendo el botón.
* **Eliminación Segura:** Al presionar "Borrar", el código activa una alerta de confirmación nativa (`confirm()`). Si aceptas, saca al estudiante de la lista usando **`splice(indice, 1)`**, actualiza el `localStorage` y vuelve a dibujar el tablero de tarjetas sin el estudiante eliminado.

---

## 👥 Equipo de Trabajo

* **Juliana Marulanda:** Programó la lógica de JavaScript, el sistema de notas (30%, 30%, 40%) con sus alertas de color (Aprobado/Reprobado) y el guardado de datos en `localStorage`.
* **Alex Monroy:** Diseñó las tarjetas dinámicas de los estudiantes y ayudó con la maquetación responsiva usando Bootstrap 5.
* **Santiago Arango:** Creó el módulo de profesores, estructurando sus formularios, tablas de horarios y apoyando la conexión de los archivos.
* **Jose Vásquez:** Diseñó el mockup (boceto) inicial del proyecto, configuró la barra de navegación, las vistas principales y apoyó con Git.

---

## 🛠️ Tecnologías Utilizadas

* **HTML5:** Estructura semántica de todas las páginas de la aplicación.
* **CSS3:** Estilos personalizados, efectos visuales modernos (como el esmerilado/backdrop-filter en la navegación) y uso de variables para mantener la consistencia del diseño.
* **Bootstrap 5:** Framework utilizado para agilizar el diseño de tablas, tarjetas y formularios responsivos.
* **JavaScript (ES6):** Lógica del negocio en español, manipulación dinámica del DOM (Document Object Model) y almacenamiento local.

## 📂 Estructura del Proyecto

```text
├── CSS/
│   ├── estudiantes.css      # Estilos del módulo de alumnos y notas
│   └── profesores.css       # Estilos del diseño lila y barra de navegación
├── JS/
│   ├── estudiantes.js       # Lógica de cálculo de promedios y CRUD de alumnos
│   └── profesores.js        # Lógica de administración de profesores
├── IMG/
│   └── logo.png             # Identidad visual de la institución
├── Main.html                # Panel principal o inicio del sistema
├── estudiantes.html         # Interfaz de gestión de alumnos
└── profesores.html          # Interfaz de gestión de profesores