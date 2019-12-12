import React, { Component } from "react";
import { connect } from "react-redux";
import { updateUser, deleteAccount } from "../../actions/auth";

class UserInfo extends Component {
  state = {
    username: this.props.user.username,
    first_name: this.props.user.first_name,
    last_name: this.props.user.last_name,
    email: this.props.user.email
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const user = this.state;
    this.props.updateUser(user);
  };

  deleteAcc = () => {
    this.props.deleteAccount(this.state.username);
  };

  render() {
    const { username, first_name, last_name, email } = this.state;
    return (
      <div className="container">
        <div className="card card-body mt-4 mb-4">
          <h2>User Information</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                className="form-control"
                type="text"
                name="username"
                readOnly="true"
                value={username}
              />
            </div>
            <div className="form-group">
              <label>First Name</label>
              <input
                className="form-control"
                type="text"
                name="first_name"
                onChange={this.onChange}
                value={first_name}
              />
              <div className="form-group">
                <label>LastName</label>
                <input
                  className="form-control"
                  type="text"
                  name="last_name"
                  onChange={this.onChange}
                  value={last_name}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  onChange={this.onChange}
                  value={email}
                />
              </div>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <button
          onClick={this.deleteAcc}
          type="button"
          className="btn btn-danger"
        >
          Delete Account
        </button>
      </div>
    );
  }
}

const mapSateToProps = state => ({
  user: state.auth.user
});

export default connect(mapSateToProps, { updateUser, deleteAccount })(UserInfo);
