import { useState } from 'react';

export function normalizeTasks(value) {
  if (!Array.isArray(value) || value.some(t => !t || typeof t.texto !== 'string')) throw new Error('Formato inválido');
  return value.map((t,index)=>({...t,id:t.id ?? `legacy-${index}`,completada:t.completada===true,notas:typeof t.notas==='string'?t.notas:'',categoria:typeof t.categoria==='string'?t.categoria:'Personal',prioridad:['alta','media','baja'].includes(t.prioridad)?t.prioridad:'media',fecha:typeof t.fecha==='string' && /^\d{4}-\d{2}-\d{2}$/.test(t.fecha)?t.fecha:'',creada:Number.isFinite(t.creada)?t.creada:typeof t.id==='number'?t.id:index}));
}
export function useTasks() {
  const [initial] = useState(()=>{
    try { const raw=localStorage.getItem('tareas'); return {tasks:normalizeTasks(raw===null?[]:JSON.parse(raw)),error:''}; }
    catch { return {tasks:[],error:'No se pudieron leer las tareas guardadas. Los datos originales se conservaron. Revisa el almacenamiento del navegador y recarga para continuar.'}; }
  });
  const [tasks,setTasks]=useState(initial.tasks);
  const [error,setError]=useState(initial.error);
  function save(next) {
    if(initial.error)return false;
    try { localStorage.setItem('tareas',JSON.stringify(next)); setTasks(next);setError('');return true; }
    catch {setError('No se pudo guardar el cambio. Comprueba el espacio y los permisos del navegador e inténtalo de nuevo.');return false;}
  }
  return {tasks,save,error};
}
