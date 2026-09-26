import { useState } from 'react';
import TaskForm from './TaskForm';
import { useTasks } from './useTasks';

const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
export default function App() {
  const { tasks, save, error } = useTasks();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Todas');
  const [sort, setSort] = useState('recent');
  const [editing, setEditing] = useState(null);
  const [deleted, setDeleted] = useState(null);
  const completed = tasks.filter(t => t.completada).length;
  const isOverdue = t => !t.completada && t.fecha && t.fecha < today();
  const visible = tasks.filter(t => `${t.texto} ${t.notas} ${t.categoria}`.toLocaleLowerCase().includes(search.toLocaleLowerCase()) && (filter === 'Todas' || (filter === 'Pendientes' && !t.completada) || (filter === 'Completadas' && t.completada) || (filter === 'Vencidas' && isOverdue(t)))).sort((a,b) => sort === 'date' ? (a.fecha || '9999').localeCompare(b.fecha || '9999') : sort === 'priority' ? ['alta','media','baja'].indexOf(a.prioridad) - ['alta','media','baja'].indexOf(b.prioridad) : b.creada - a.creada);
  function submit(values) {
    if (!save(editing ? tasks.map(t => t.id === editing.id ? {...t,...values} : t) : [...tasks,{...values,id:crypto.randomUUID(),completada:false,creada:Date.now()}])) return false;
    setEditing(null);
    return true;
  }
  function remove(task) {
    if (save(tasks.filter(t => t.id !== task.id))) { setDeleted(task); if(editing?.id === task.id) setEditing(null); }
  }
  return <>
    <header className="topbar"><a className="brand" href="#"><span>✓</span> al día.</a><span className="local-badge">● Tu espacio personal</span></header>
    <main>
      <section className="intro"><p className="eyebrow">UN POCO DE ORDEN, MÁS TRANQUILIDAD</p><h1>Haz espacio para lo importante.</h1><p>Organiza tus pendientes y avanza a tu ritmo.</p></section>
      {error && <p role="alert" className="error">{error}</p>}
      <section className="stats" aria-label="Resumen">
        <div><span>Pendientes</span><strong>{tasks.length-completed}<small>por resolver</small></strong></div>
        <div><span>Completadas</span><strong>{completed}<small>¡bien hecho!</small></strong></div>
        <div><span>Vencidas</span><strong>{tasks.filter(isOverdue).length}<small>requieren atención</small></strong></div>
        <div><span>Tu progreso · {tasks.length ? Math.round(completed/tasks.length*100) : 0}%</span><progress value={completed} max={tasks.length || 1}/><small>{completed} de {tasks.length} completadas</small></div>
      </section>
      <div className="workspace">
        <aside className="panel composer"><p className="eyebrow">UN PASO A LA VEZ</p><h2>{editing ? 'Editar tarea' : '¿Qué tienes pendiente?'}</h2><TaskForm key={editing?.id || 'new'} task={editing} onSubmit={submit} onCancel={() => setEditing(null)}/><p className="storage-note">Tus tareas se guardan en este navegador con localStorage.</p></aside>
        <section className="panel task-panel" aria-label="Lista de tareas">
          <div className="list-heading"><h2>Mis tareas <span>{tasks.length}</span></h2><select aria-label="Ordenar tareas" value={sort} onChange={e=>setSort(e.target.value)}><option value="recent">Más recientes</option><option value="date">Vencimiento</option><option value="priority">Prioridad</option></select></div>
          <input type="search" aria-label="Buscar tareas" placeholder="Buscar por tarea, nota o categoría…" value={search} onChange={e=>setSearch(e.target.value)}/>
          <div className="filters" aria-label="Filtrar tareas">{['Todas','Pendientes','Completadas','Vencidas'].map(f=><button key={f} aria-pressed={filter===f} onClick={()=>setFilter(f)}>{f}</button>)}</div>
          <ul className="task-list">{visible.map(t=><li key={t.id} className={`task ${t.completada?'completed':''}`}>
            <input type="checkbox" checked={t.completada} aria-label={`Completar ${t.texto}`} onChange={()=>save(tasks.map(item=>item.id===t.id?{...item,completada:!item.completada}:item))}/>
            <div className="task-content"><h3>{t.texto}</h3>{t.notas && <p>{t.notas}</p>}<div className="meta"><span className={`priority ${t.prioridad}`}>● {t.prioridad}</span><span>{t.categoria}</span>{t.fecha && <span className={isOverdue(t)?'overdue':''}>{new Date(`${t.fecha}T12:00:00`).toLocaleDateString('es',{day:'numeric',month:'short',year:'numeric'})}{isOverdue(t)?' · Vencida':''}</span>}</div></div>
            <div className="actions"><button onClick={()=>setEditing(t)} aria-label={`Editar ${t.texto}`}>Editar</button><button onClick={()=>remove(t)} aria-label={`Eliminar ${t.texto}`}>×</button></div>
          </li>)}</ul>
          {!visible.length && <div className="empty"><span>✓</span><h3>{tasks.length?'Sin tareas en esta vista':'Un nuevo comienzo'}</h3><p>{tasks.length?'Prueba con otra búsqueda o cambia el filtro.':'Agrega tu primera tarea y empieza a liberar espacio mental.'}</p></div>}
          <footer className="list-footer">{visible.length} tareas visibles <span>Pequeños pasos, grandes avances.</span></footer>
        </section>
      </div>
      {deleted && <div className="toast" role="status">Tarea eliminada<button onClick={()=>{if(save([...tasks,deleted]))setDeleted(null);}}>Deshacer</button><button aria-label="Cerrar aviso" onClick={()=>setDeleted(null)}>×</button></div>}
    </main><footer className="page-footer">Hecho para tu día a día. Sin cuentas, sin complicaciones.</footer>
  </>;
}
