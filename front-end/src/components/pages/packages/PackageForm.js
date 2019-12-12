import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addPackage } from "../../actions/packages";

class PackageForm extends Component {
  state = {
    name: ""
  };
  static propTypes = {
    addPackage: PropTypes.func.isRequired
  };
  onSubmit = event => {
    event.preventDefault();
    this.props.addPackage(this.state.name);
    this.setState({ name: "" });
  };
  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { name } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Create Package</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={this.onChange}
              value={name}
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

export default connect(null, { addPackage })(PackageForm);
