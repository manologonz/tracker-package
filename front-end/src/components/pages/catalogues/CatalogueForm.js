import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addCatalogue } from "../../actions/catalogues";

class CatalogueForm extends Component {
  state = {
    name: "",
    slug_name: ""
  };
  static propTypes = {
    addCatalogue: PropTypes.func.isRequired
  };
  onSubmit = event => {
    event.preventDefault();
    this.props.addCatalogue(this.state.name, this.state.slug_name);
    this.setState({
      name: "",
      slug_name: ""
    });
  };
  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { name, slug_name } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Create Catalogue</h2>
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
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { addCatalogue })(CatalogueForm);
