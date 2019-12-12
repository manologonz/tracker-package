import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getRepPackags,
  deletePackageAdmin,
  setStorage,
  setTransit,
  setDelivered
} from "../../actions/reportpackages";

class AdminPackageTable extends Component {
  componentDidMount() {
    this.props.getRepPackags();
  }
  render() {
    return (
      <div className="container mt-5">
        <div className="row mb-3">
          <div className="col-md-4">
            <h4>In Storage: {this.props.in_storage}</h4>
          </div>
          <div className="col-md-4">
            <h4>In Transit: {this.props.in_transit}</h4>
          </div>
          <div className="col-md-4">
            <h4>Delivered: {this.props.delivered}</h4>
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>State</th>
              <th>Transit Place</th>
              <th>Owner</th>
              <th />
              <th />
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
                <td>{pack.package_client}</td>
                <td>
                  <button
                    onClick={this.props.setStorage.bind(this, pack.id)}
                    className="btn btn-success"
                  >
                    Set Storage
                  </button>
                </td>
                <td>
                  <button
                    onClick={this.props.setTransit.bind(this, pack.id)}
                    className="btn btn-success"
                  >
                    Set Transit
                  </button>
                </td>
                <td>
                  <button
                    onClick={this.props.setDelivered.bind(this, pack.id)}
                    className="btn btn-success"
                  >
                    Set Delivered
                  </button>
                </td>
                <td>
                  <button
                    onClick={this.props.deletePackageAdmin.bind(this, pack.id)}
                    className="btn btn-danger"
                  >
                    delete
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
  in_storage: state.report_packags.total_packags["in_storage"],
  in_transit: state.report_packags.total_packags["in_transit"],
  delivered: state.report_packags.total_packags["delivered"],
  packags: state.report_packags.admin_packages
});

export default connect(mapStateToProps, {
  getRepPackags,
  deletePackageAdmin,
  setStorage,
  setDelivered,
  setTransit
})(AdminPackageTable);
