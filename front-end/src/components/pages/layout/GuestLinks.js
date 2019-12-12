import React from "react";
import { NavLink, Redirect } from "react-router-dom";

function GuestLinks(props) {
  return (
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <div className="form-inline my-2 my-lg-0">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>
          <li className="nav-item active">
            <NavLink className="nav-link" to="/register">
              SignUp
            </NavLink>
            <Redirect exact from="/" to="/" />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default GuestLinks;
