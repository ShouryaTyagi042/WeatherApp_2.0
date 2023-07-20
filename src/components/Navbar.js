import React from "react";
import Icon from "../clouds.png";
import "../css/Navbar.css";

function Navbar() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-red-400 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <img src={Icon} alt="WeatherIcon"></img>
        <span className="font-semibold text-xl tracking-tight">
          Weather App
        </span>
      </div>
    </nav>
  );
}
export default Navbar;
