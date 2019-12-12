import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

class Alerts extends Component {
  state = {
    error: "no error"
  };
  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      this.setState({
        error
      });
    }
  }
  render() {
    return (
      <div className="alert alert-danger">
        <p>{this.state.error.status.join()}</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.errors
});

export default connect(mapStateToProps)(Alerts);
