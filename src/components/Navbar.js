import React from "react";
import Icon from "../clouds.png";
import "../css/Navbar.css";

function Navbar() {
  return (
    <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <img src={Icon}></img>
        <span class="font-semibold text-xl tracking-tight">Weather App</span>
      </div>
    </nav>
  );
}
export default Navbar;
