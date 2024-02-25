import { Calender } from "./Calender";
import { ToDo} from "./ToDo";
import {DndContext} from '@dnd-kit/core';
import "./styles.css";



export function CalendarTodo() {
  return (

 <div className ="grid-container-element">
    <DndContext onDragEnd={handleDragEnd} drop={something}>
     
      <Calender className ="grid-child-element" />
      <ToDo className ="grid-child-element"/>
    
      </DndContext>
    </div>

  );
  function handleDragEnd(event) {
    const {active, over} = event;
    console.log(active.data.current);
   

 
    if (over) {
    }
  }
  function something(){

  }
}
