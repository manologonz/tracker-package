import React from "react";
import { NavLink } from "react-router-dom";

function AdminOptions() {
  return (
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <NavLink className="nav-link active" to="/account">
          Account
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link active" to="/packages-admin">
          Client Packages
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link active" to="/catalogues">
          Clients Catalogue
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link active" to="/admin-create">
          Create Admin
        </NavLink>
      </li>
    </ul>
  );
}

export default AdminOptions;
