import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import "./styles.css";
export function ToDo() {
   // const requestEndPoint = "https://netrakris.kintone.com/k/v1/record.json?app=1"
    const [tasks, setTasks] = useState([
        {
        id: 1,
        text: 'Doctor Appointment',
        completed: true
        },
        {
        id: 2,
        text: 'Meeting at School',
        completed: false
        }
        ]);

//   useEffect(() => {
//     fetch(requestEndPoint,
//       {
//         method: 'GET',
       
//         headers:{'Access-Control-Allow-Origin':'GET',
//         'X-Cybozu-API-Token':'Q6qmbTJh3YFL2LONmd2YMgJiDNy7hb1EmNhHb3nS',
//         'Content-Type':'application/json'
//         }
//       }
//     )
//     .then(response => response.json())
//     .then((data) => {
//       console.log('Success:', data);
//       //setTasks(data?.record);
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });
//   }, [setTasks]);
    
    const [text, setText] = useState('');
   function addTask(text) {
    const newTask = {
    id: Date.now(),
    text,
    completed: false
    };
    setTasks([...tasks, newTask]);
    setText('');
    }
   function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
    }
   function toggleCompleted(id) {
    setTasks(tasks.map(task => {
    if (task.id === id) {
    return {...task, completed: !task.completed};
    } else {
    return task;
    } 
    }));
    }
   return (
    <div >
    {tasks.map(task => (
    <TodoItem
    key={task.id} 
    task={task}
    deleteTask={deleteTask}
    toggleCompleted={toggleCompleted} 
    />
    ))}
    <div className="add-todo">
   <input className='input-style'
    value={text}
    onChange={e => setText(e.target.value)} 
    />
   <button onClick={() => addTask(text)}>Add</button>
   </div>
    </div>

    );
   }
































