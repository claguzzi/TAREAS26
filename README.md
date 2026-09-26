# Al día · Lista de tareas

Aplicación React + Vite sin backend. Las tareas se guardan exclusivamente en localStorage bajo la clave `tareas`, compatible con las tareas de la versión anterior.

## Funciones

- Crear, editar, completar y eliminar tareas; deshacer la última eliminación.
- Notas, prioridades, categorías y fechas límite.
- Buscar por texto, notas o categoría; filtrar por estado y vencimiento.
- Ordenar por creación, prioridad o fecha.
- Resumen de pendientes, completadas, vencidas y progreso.
- Interfaz adaptable a móviles y controles accesibles mediante teclado.

## Desarrollo

```sh
npm ci
npm run dev
```

Verificación: `npm run lint` y `npm run build`. Para revisar la compilación: `npm run preview`.

## Organización

- `src/App.jsx`: vistas, filtros y acciones.
- `src/TaskForm.jsx`: formulario de creación y edición.
- `src/useTasks.js`: carga compatible y persistencia con manejo de errores.
- `src/index.css`: diseño responsive.

Los datos dependen del navegador y del origen (protocolo, dominio y puerto). No se sincronizan entre dispositivos. Borrar los datos del navegador elimina las tareas. Si la lectura falla, se conserva el valor original y se bloquean las escrituras para no reemplazarlo. Si falla el guardado, el cambio no se aplica y se muestra un aviso.
