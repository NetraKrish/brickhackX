import React from "react";
import "./Header.css";
export const Navbar = () => {
  return (
    <div>
      <nav id="main-navbar">
        <div className="container">
          <h2> BRICK TASKS  </h2>
          <ul>
            <li>
              <a href="/home">Bored</a>
            </li>
            <li>
              <a href="/home">Drained</a>
            </li>
          
          </ul>
        </div>
      </nav>
    </div>
  );
};