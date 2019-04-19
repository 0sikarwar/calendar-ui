import React, { Component } from "react"; //eslint-disable-line
import { connect } from "react-redux";

import "Sagas/loginUser";

class Startup extends Component {
  componentDidMount() {
    // dispatch actions on application start
  }

  render() {
    return this.props.children;
  }
}

const mapActionToProps = {
};

// connected to redux and we can fetch data in application starting in this component
export default connect(
  null,
  mapActionToProps
)(Startup);
