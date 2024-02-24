import { Calender } from "./Calender";
import { ToDo } from "./ToDo";
import {DndContext} from '@dnd-kit/core';
import "./styles.css";


export default function App() {
  return (

    <div className="App grid-container-element">

    <DndContext>
      <Calender className ="grid-child-element"/>
      <ToDo className ="grid-child-element"/>
    
      </DndContext>
    </div>
  );
}
