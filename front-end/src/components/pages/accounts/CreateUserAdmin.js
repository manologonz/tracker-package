import React, { Component } from "react";
import { connect } from "react-redux";
import { createAdmin } from "../../actions/auth";

class CreateUserAdmin extends Component {
  state = {
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password_confirmation: "",
    is_admin: true
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onSubmit = event => {
    event.preventDefault();
    const user = this.state;
    this.props.createAdmin(user);
  };
  render() {
    const {
      username,
      email,
      first_name,
      last_name,
      password,
      password_confirmation
    } = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Create Admin User</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                onChange={this.onChange}
                value={username}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={this.onChange}
                value={email}
              />
            </div>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                name="first_name"
                onChange={this.onChange}
                value={first_name}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                name="last_name"
                onChange={this.onChange}
                value={last_name}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="password_confirmation"
                onChange={this.onChange}
                value={password_confirmation}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, { createAdmin })(CreateUserAdmin);
