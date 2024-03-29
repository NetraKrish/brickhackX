import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import "./styles.css";
export function TodoItem({ task, deleteTask, toggleCompleted }) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: task.id,
        data:task
      }); 
      const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      } : undefined;
      
    
function handleChange() {
 toggleCompleted(task.id);
 }
 
 return (
  <div>
 <div  className="todo-item">
 <input 
 type="checkbox"
 checked={task.completed}
 onChange={handleChange}
 />
 <div className ="todo-text" ref={setNodeRef} style={style}  {...listeners} {...attributes}>
<p>{task.text}</p>
</div>
<button className="spade" onClick={() => deleteTask(task.id)}>
cdefg
 </button>
 </div>
 </div>
 );
}
export default TodoItem;