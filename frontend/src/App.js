import { Calender } from "./Calender";
import {DndContext} from '@dnd-kit/core';
import "./styles.css";
import {Navbar} from "./header";


export default function App() {
  return (
 
    <div className="App">
    <Navbar/>

   <Calender />

    </div>
  );
 
}
