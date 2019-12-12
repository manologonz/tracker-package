import React, { Component } from "react";
import { connect } from "react-redux";
import { addClient } from "../../actions/catalogues";

class AddClientForm extends Component {
  state = {
    username: "",
    slug_name: ""
  };
  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  onSubmit = event => {
    event.preventDefault();
    this.props.addClient(this.state.slug_name, this.state.username);
    this.setState({
      username: "",
      slug_name: ""
    });
  };
  render() {
    const { username, slug_name } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add Client to Catalogue</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <h4>in:</h4>
          </div>
          <div className="form-group">
            <label>slug_name</label>
            <input
              className="form-control"
              type="text"
              name="slug_name"
              onChange={this.onChange}
              value={slug_name}
            />
          </div>
          <div className="form-group">
            <h4>add:</h4>
          </div>
          <div className="form-group">
            <label>username</label>
            <input
              className="form-control"
              type="text"
              name="username"
              onChange={this.onChange}
              value={username}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { addClient })(AddClientForm);
