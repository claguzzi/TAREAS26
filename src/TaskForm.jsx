import { useState } from 'react';
const empty = { texto: '', notas: '', prioridad: 'media', categoria: 'Personal', fecha: '' };
import { alerts } from './alerts';
export default function TaskForm({ task, onSubmit, onCancel }) {
  const [values, setValues] = useState(task || empty);
  const change = e => setValues({ ...values, [e.target.name]: e.target.value });
  function submit(e) { e.preventDefault(); if (!values.texto.trim()) { alerts.fire({ icon: 'warning', titleText: 'Escribe una tarea', text: 'Añade un título para poder guardarla.' }).then(() => document.querySelector('input[name="texto"]')?.focus()); return; } if (onSubmit({ texto: values.texto.trim(), notas: values.notas.trim(), prioridad: values.prioridad, categoria: values.categoria, fecha: values.fecha })) setValues(empty); }
  return <form onSubmit={submit} noValidate>
    <label>Tarea<input name="texto" value={values.texto} onChange={change} placeholder="Por ejemplo, pagar la luz" maxLength={200} required /></label>
    <label>Notas <span>opcional</span><textarea name="notas" value={values.notas} onChange={change} placeholder="Añade los detalles que necesites…" maxLength={2000} rows={3} /></label>
    <div className="form-row"><label>Prioridad<select name="prioridad" value={values.prioridad} onChange={change}><option value="baja">Baja</option><option value="media">Media</option><option value="alta">Alta</option></select></label><label>Categoría<select name="categoria" value={values.categoria} onChange={change}>{['Personal', 'Trabajo', 'Hogar', 'Pagos', 'Estudio'].map(c => <option key={c}>{c}</option>)}</select></label></div>
    <label>Fecha límite <span>opcional</span><input type="date" name="fecha" value={values.fecha} onChange={change} /></label>
    <button className="primary" type="submit">{task ? 'Guardar cambios' : '+ Agregar tarea'}</button>
    {task && <button className="cancel" type="button" onClick={onCancel}>Cancelar edición</button>}
  </form>;
}
