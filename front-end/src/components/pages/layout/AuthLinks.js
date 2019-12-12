import React from "react";
import { connect } from "react-redux";
import ClientOptions from "./ClientOptions";
import AdminOptions from "./AdminOptions";

function AuthLinks(props) {
  return (
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {props.isAdmin ? <AdminOptions /> : <ClientOptions />}
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <div className="form-inline my-2 my-lg-0">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <button
                onClick={props.logoutClick}
                className="btn btn-info text-light"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  isAdmin: state.auth.user.is_admin
});

export default connect(mapStateToProps)(AuthLinks);
