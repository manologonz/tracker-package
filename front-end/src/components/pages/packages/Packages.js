import React, { Component } from "react";
import PackageForm from "./PackageForm";
import PackageTable from "./PackageTable";

class Packages extends Component {
  render() {
    return (
      <div className="container mt-5">
        <PackageForm />
        <PackageTable />
      </div>
    );
  }
}

export default Packages;
