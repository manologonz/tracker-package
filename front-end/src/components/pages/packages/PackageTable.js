import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPackages, deletePackage } from "../../actions/packages";

class PackageTable extends Component {
  static propTypes = {
    packags: PropTypes.array.isRequired,
    getPackages: PropTypes.func.isRequired
  };
  componentDidMount() {
    this.props.getPackages();
  }
  render() {
    return (
      <div>
        <h2>Table</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>State</th>
              <th>Transit Place</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.packags.map(pack => (
              <tr key={pack.id}>
                <td>{pack.id}</td>
                <td>{pack.name}</td>
                <td>{pack.state}</td>
                <td>{pack.transit_place}</td>
                <td>
                  <button
                    onClick={this.props.deletePackage.bind(this, pack.id)}
                    className="btn btn-danger"
                  >
                    cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  packags: state.packags.packags
});

export default connect(mapStateToProps, { getPackages, deletePackage })(
  PackageTable
);
