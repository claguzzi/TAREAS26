import { useEffect, useState } from "react";

export default function App() {
  const [tarea, setTarea] = useState("");

  // ✅ Inicialización correcta desde localStorage
  const [tareas, setTareas] = useState(() => {
    const tareasGuardadas = localStorage.getItem("tareas");
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  });

  // 🔹 Guardar tareas en localStorage
  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

  const agregarTarea = () => {
    if (tarea.trim() === "") return;

    setTareas([
      ...tareas,
      {
        id: Date.now(),
        texto: tarea,
        completada: false,
      },
    ]);

    setTarea("");
  };

  const eliminarTarea = (id) => {
    setTareas(tareas.filter((t) => t.id !== id));
  };

  const toggleTarea = (id) => {
    setTareas(
      tareas.map((t) =>
        t.id === id ? { ...t, completada: !t.completada } : t
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">
          📝 PAGOS JUNIO 2026
        </h1>

        {/* Input */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={tarea}
            onChange={(e) => setTarea(e.target.value)}
            placeholder="Escribí una tarea..."
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={agregarTarea}
            className="bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600"
          >
            +
          </button>
        </div>

        {/* Lista */}
        <ul className="space-y-2">
          {tareas.length === 0 && (
            <li className="text-center text-gray-400">
              No hay tareas aún
            </li>
          )}

          {tareas.map((t) => (
            <li
              key={t.id}
              className="flex items-center justify-between bg-gray-100 p-3 rounded-lg"
            >
              <span
                onClick={() => toggleTarea(t.id)}
                className={`cursor-pointer flex-1 ${
                  t.completada
                    ? "line-through text-gray-400"
                    : "text-gray-800"
                }`}
              >
                {t.texto}
              </span>

              <button
                onClick={() => eliminarTarea(t.id)}
                className="text-red-500 hover:text-red-700 ml-2"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
