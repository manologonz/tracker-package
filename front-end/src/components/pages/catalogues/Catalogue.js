import React, { Component } from "react";
import { connect } from "react-redux";

class Catalogue extends Component {
  render() {
    return (
      <div className="container">
        <div className="card card-body mt-4 mb-4">
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  catalogue: state.edit_catalogue
});

export default connect()(Catalogue);
