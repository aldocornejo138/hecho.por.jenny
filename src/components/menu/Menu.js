// Menu.js
import React from "react";
import "./Menu.css"; // Import your CSS file

function Menu() {
  return (
    <div className="menu-container">
      <ul className="menu-list">
        <li>
          <a href="#">Custom Bouquets</a>
        </li>
        <li>
          <a href="#">Party Arrangements</a>
        </li>
        <li>
          <a href="#">Proposal Set Ups</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
