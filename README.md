# Proyecto-integrador-frontend
Grupo conformado por Juliana Marulanda, Santiago Arango, Alex Monroy, Jose Vasquez.

## Descripción del Proyecto

Este es un proyecto integrador frontend que implementa un sistema avanzado de gestión de usuarios con distinción de roles. La aplicación permite el registro de nuevos usuarios y cuenta con un sistema de autenticación diferenciado para **Estudiantes** y **Profesores**, incluyendo medidas de seguridad contra ataques de fuerza bruta mediante el bloqueo temporal de la interfaz tras múltiples intentos fallidos.

## Equipo de Desarrollo

El proyecto fue desarrollado por:

- **Juliana Marulanda** - Desarrollo de la interfaz de usuario y diseño de estilos CSS.
- **Alex Monroy** - Arquitectura de la estructura del proyecto y lógica de funciones JavaScript.
- **Santiago Arango** - Resolución de problemas técnicos, verificación y corrección de errores.
- **Jose Vasquez** - Diseño del **Mockup en Figma** y prototipado de la experiencia de usuario.

## Estructura del Proyecto

Proyecto-integrador-frontend-definitivo/
├── index.html          # Página de bienvenida (En desarrollo estético)
├── login.html          # Interfaz de acceso única (Estudiantes/Profesores)
├── registro.html       # Interfaz para el alta de nuevos usuarios
├── login.css           # Estilos globales y de componentes de acceso
├── loguin.js           # Lógica de seguridad, bloqueo y gestión de roles
├── Main.html           # Dashboard principal post-login
└── README.md           # Documentación del proyecto

## Características Actuales

- **Registro Dinámico:** Permite dar de alta usuarios nuevos en el sistema en tiempo real.
- **Roles Diferenciados:** Lógica de acceso específica para perfiles de Estudiantes y Profesores.
- **Seguridad y Bloqueo:** Tras fallar múltiples veces, la página bloquea el acceso temporalmente para proteger el sistema.
- **Fidelidad de Diseño:** Implementación basada estrictamente en el prototipo de alta fidelidad creado en **Figma**.

## Usuarios Predefinidos

| Usuario | Rol | Acceso |
| :--- | :--- | :--- |
| Juliana | Estudiante | Permitido |
| Monroy | Profesor | Permitido |
| Santiago | Estudiante | Permitido |
| Jose | Estudiante | Permitido |

## Instrucciones de Uso

### 1. Registro e Inicio
- Los nuevos usuarios pueden registrarse en `registro.html`.
- En `login.html`, el sistema identifica si el perfil es **Estudiante** o **Profesor** para dirigir la experiencia.

### 2. Bloqueo de Seguridad
- Si se detectan múltiples fallos consecutivos, el login se deshabilitará por un tiempo determinado.
- Un mensaje indicará al usuario cuánto tiempo debe esperar antes de un nuevo intento.

## Tecnologías Utilizadas

- **HTML5** - Estructura semántica.
- **CSS3** - Diseño visual y adaptabilidad.
- **JavaScript (Vanilla)** - Lógica de seguridad, gestión de roles y temporizadores.
- **Figma** - Herramienta principal para el diseño del Mockup y UI/UX.

## Estado del Proyecto y Próximas Mejoras

Actualmente el proyecto se encuentra en una fase avanzada de funcionalidad técnica:

- [ ] **Módulo de Directivos:** Implementación del tercer rol administrativo (en desarrollo).
- [ ] **Estética del Index:** Refactorización visual de la landing page para mayor impacto.
- [ ] **Persistencia:** Guardar estados de bloqueo en `localStorage` para evitar saltos de seguridad al refrescar.

## Notas de Desarrollo

- El equipo ha trabajado en estrecha colaboración para asegurar que la programación de **Alex** y la corrección de errores de **Santiago** respeten el diseño visual propuesto por **Juliana** y **Jose** desde Figma.
- Se ha puesto especial atención en que la lógica de bloqueo no interfiera con la usabilidad general del sitio.

## Licencia

Este proyecto fue desarrollado como parte de un ejercicio integrador educativo (**CESDE**).

**Última actualización:** Domingo 26 de Abril del 2026
**Versión:** Cuarta Parte (Seguridad, Roles y Diseño Figma)
**Estado:** En desarrollo - Pendiente Módulo Directivos
