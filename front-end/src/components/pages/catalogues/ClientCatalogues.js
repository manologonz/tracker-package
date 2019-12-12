import React, { Component } from "react";
import { conect } from "react-redux";
import CatalogueTable from "./CatalogueTable";
import CatalogueForm from "./CatalogueForm";
import AddClientForm from "./AddClientForm";

class ClientCatalogues extends Component {
  render() {
    return (
      <div className="container mt-5">
        <CatalogueForm />
        <AddClientForm />
        <CatalogueTable />
      </div>
    );
  }
}

export default ClientCatalogues;
