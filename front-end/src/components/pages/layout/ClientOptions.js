import React from "react";
import { NavLink } from "react-router-dom";

function ClientOptions() {
  return (
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <NavLink className="nav-link active" to="/account">
          Account
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link active" to="/packages">
          Packages
        </NavLink>
      </li>
    </ul>
  );
}

export default ClientOptions;
