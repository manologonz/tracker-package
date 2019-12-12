import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { getCatalogues, deleteCatalogue } from "../../actions/catalogues";
import PropTypes from "prop-types";

class CatalogueTable extends Component {
  static propTypes = {
    catalogues: PropTypes.array.isRequired,
    deleteCatalogue: PropTypes.func.isRequired
  };
  componentDidMount() {
    this.props.getCatalogues();
  }
  render() {
    return (
      <div>
        <h2>Client Catalogues</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>slug_name</th>
              <th>Clients Number</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.catalogues.map(catalogue => (
              <tr key={catalogue.slug_name}>
                <td>{catalogue.name}</td>
                <td>{catalogue.slug_name}</td>
                <td>{catalogue.clients.length}</td>
                <td>
                  <button
                    onClick={this.props.deleteCatalogue.bind(
                      this,
                      catalogue.slug_name
                    )}
                    className="btn btn-danger"
                  >
                    delete
                  </button>
                </td>
                <td>
                  <NavLink
                    onClick={this.setUpdateCatalogue}
                    to="/catalogue-edit"
                    className="btn btn-info"
                  >
                    edit
                  </NavLink>
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
  catalogues: state.catalogues.catalogues
});

export default connect(mapStateToProps, { getCatalogues, deleteCatalogue })(
  CatalogueTable
);
