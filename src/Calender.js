import { useRef, useState } from "react";
import "./styles.css";
import {TodoItem} from "./TodoItem";
import {
  SevenColGrid,
  Wrapper,
  HeadDays,
  DateControls,
  StyledEvent,
  SeeMore,
  PortalWrapper
} from "./Calender.styled";
import {useDroppable,DndContext} from '@dnd-kit/core';
import { DAYS, MOCKAPPS } from "./conts";
import {
  datesAreOnSameDay,
  getDarkColor, getDaysInMonth,
  getMonthYear,
  getSortedDays,
  nextMonth,
  prevMonth,
  range,
  sortDays
} from "./utils";

export const Calender = () => {
  
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
  const [currentDate, setCurrentDate] = useState(new Date(2024, 1, 24));
  const [events, setEvents] = useState(MOCKAPPS);
  const dragDateRef = useRef();
  const dragindexRef = useRef();
  const [showPortal, setShowPortal] = useState(false);
  const [portalData, setPortalData] = useState({});

  const addEvent = (date, event) => {
   
    if (!event.target.classList.contains("StyledEvent")) {
      const text = window.prompt("name");
      if (text) {
        date.setHours(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        setEvents((prev) => [
          ...prev,
          { date, title: text, color: getDarkColor() }
        ]);
      }
    }
  };
  function handleDragEnd(event) {
    const {active, over} = event;
   var task = active.data.current;
   if(over!=null){
  var thedate= new Date(Date.parse(over.id));
  var tdate = new Date(thedate.getFullYear(),thedate.getMonth()+1,thedate.getDate())
  var txt = task.text;

    if (over) {
      console.log("hi");
      setEvents((prev) => [
        ...prev,
        { date: tdate, title: txt, color: getDarkColor() }
      ]);
      deleteTask(task.id);}
    console.log(tasks);
    }

  }
  function Droppable(props) {
    
    const {isOver,setNodeRef} = useDroppable({
      id: props.id,
    });
   

    return (
      <div ref={setNodeRef}>
        {props.children}
       
      </div>
    );
  }
  const drag = (index, e) => {
    dragindexRef.current = { index, target: e.target };
  };

  const onDragEnter = (date, e) => {
    e.preventDefault();
    dragDateRef.current = { date, target: e.target.id };
  };

  const drop = (ev) => {
    ev.preventDefault();

    setEvents((prev) =>
      prev.map((ev, index) => {
        if (index === dragindexRef.current.index) {
          ev.date = dragDateRef.current.date;
        }
        return ev;
      })
    );
  };

  const handleOnClickEvent = (event) => {
    setShowPortal(true);
    setPortalData(event);
  };

  const handlePotalClose = () => setShowPortal(false);

  const handleDelete = () => {
    setEvents((prevEvents) =>
      prevEvents.filter((ev) => ev.title !== portalData.title)
    );
    handlePotalClose();
  };
  const handleTime = () => {
    const time = window.prompt("Enter the time for the task (HH:MM format):");
  
    var date = new Date(portalData.date);
    console.log(date);
    if(time)
    {
      const [hoursStr, minutesStr] = time.split(":");
      const hours = parseInt(hoursStr, 10);
      const minutes = parseInt(minutesStr, 10);
      date.setHours(hours);
      date.setMilliseconds(minutes*60*1000)
      console.log(date);
      setEvents((prevEvents) =>
  prevEvents.map((ev) => {
    if (ev.title === portalData.title) {
      // Update the time property of the matching event
      ev.date = date; // Replace newTimeValue with the desired new time
    }
    return ev;
  })
);
    }
  };
  return (

    < DndContext  onDragEnd={handleDragEnd}>
      <div className="grid-container-element">
   
    <Wrapper className="grid-chid-element" >
      <DateControls>
        <ion-icon
          onClick={() => prevMonth(currentDate, setCurrentDate)}
          name="arrow-back-circle-outline"
        ></ion-icon>
        {getMonthYear(currentDate)}
        <ion-icon
          onClick={() => nextMonth(currentDate, setCurrentDate)}
          name="arrow-forward-circle-outline"
        ></ion-icon>
      </DateControls>
      <SevenColGrid >
        {DAYS.map((day) => (
          <HeadDays className="nonDRAG">{day}</HeadDays>
        ))}
      </SevenColGrid>

      <SevenColGrid
      
        fullheight={true}
        is28Days={getDaysInMonth(currentDate) === 28}
      >
        {getSortedDays(currentDate).map((day) => (
           <Droppable className="dropper" id={`${currentDate.getFullYear()}/${currentDate.getMonth()}/${day}`} key={`${currentDate.getFullYear()}/${currentDate.getMonth()}/${day}`}>
        
          <div className="brick"
            id={`${currentDate.getFullYear()}/${currentDate.getMonth()}/${day}`}
            onDragEnter={(e) =>
              onDragEnter(
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  day
                ),
                e
              )
            }
            
            onDragOver={(e) => e.preventDefault()}
            onDragEnd={drop}
            onClick={(e) =>
              addEvent(
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  day
                ),
                e
              )
            }
          >
            <span
              className={`nonDRAG ${
                datesAreOnSameDay(
                  new Date(),
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    day
                  )
                )
                  ? "active"
                  : ""
              }`}
            >
              {day}
            </span>
            <EventWrapper>
              {events.map(
                (ev, index) =>
                  datesAreOnSameDay(
                    ev.date,
                    new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth(),
                      day
                    )
                  ) && (
                    <StyledEvent
                      onDragStart={(e) => drag(index, e)}
                      onClick={() => handleOnClickEvent(ev)}
                      draggable
                      className="StyledEvent"
                      id={`${ev.color} ${ev.title}`}
                      key={ev.title}
                      bgColor={ev.color}
                    >
                      {ev.title}
                    </StyledEvent>
                  )
              )}
            </EventWrapper>
          </div>
             
         </Droppable>
        ))}
      </SevenColGrid>
      {showPortal && (
        <Portal
          {...portalData}
          handleDelete={handleDelete}
          handleTime={handleTime}
          handlePotalClose={handlePotalClose}
        />
      )}
    </Wrapper>
 

    <div className="grid-child-element">
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
    
    </div>
    </DndContext>
  );
};

const EventWrapper = ({ children }) => {
  if (children.filter((child) => child).length)
    return (
      <>
        {children}
        {children.filter((child) => child).length > 2 && (
          <SeeMore
            onClick={(e) => {
              e.stopPropagation();
              console.log("clicked p");
            }}
          >
            see more...
          </SeeMore>
        )}
      </>
    );
};

const Portal = ({ title, date, handleDelete, handleTime, handlePotalClose }) => {
  return (
    <PortalWrapper>
      <h2>{title}</h2>
      <p>{date.toString()}</p>
      <ion-icon onClick={handleDelete} name="trash-outline"></ion-icon>
      <ion-icon onClick={handleTime} name="time-outline"></ion-icon>
      <ion-icon onClick={handlePotalClose} name="close-outline"></ion-icon>
    </PortalWrapper>
  );
};
