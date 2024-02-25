import { Calender } from "./Calender";
import { ToDo} from "./ToDo";
import {DndContext} from '@dnd-kit/core';
import "./styles.css";
import {Navbar} from "./header";
import {CalendarTodo} from "./calendartodo";


export default function App() {
  return (
 
    <div className="App">
    <Navbar/>

   <Calender />

    </div>
  );
 
}
