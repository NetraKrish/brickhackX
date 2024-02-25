import React from "react";
import "./Header.css";
export const Navbar = () => {
  var randomTasks= ["listen to music", "write a poem", "call a friend", "try a new recipe","organize your room","Do push ups or actually don't"]
  function generateRandomTask()
  {
    window.confirm(randomTasks[Math.floor(Math.random() * randomTasks.length)]);
  }
  var randomQuotes= ["Take a deep breath. You're doing great.",
  "Remember to take breaks and recharge.",
  "It's okay to feel drained sometimes. Take it easy.",
  "You're stronger than you think, even when you feel drained.",
  "Self-care is important. Take time for yourself.",
  "Listen to your body and rest when you need to.",
  "You're not alone. Reach out if you need support.",
  "This too shall pass. Hang in there.",
  "You're capable of overcoming this feeling of being drained.",
  "It's okay to ask for help if you're feeling overwhelmed.",]
  function generateRandomQuote()
  {
    window.confirm(randomQuotes[Math.floor(Math.random() * randomQuotes.length)]);
  }
  return (
    <div>
      <nav id="main-navbar">
        <div className="container">
          <div className="logo-container">
            <span className="logo">dsdssff</span>
          <h2> BRICK TASKS  </h2>
          </div>
          <ul>
            <li>
              <button onClick ={generateRandomTask} className="navbar-button"> Bored</button>
             
            </li>
            <li>
            <button onClick ={generateRandomQuote} className="navbar-button"> Drained</button>
            </li>
          
          </ul>
        </div>
      </nav>
    </div>
  );
};