import React, { Component } from "react"; //eslint-disable-line
import { connect } from "react-redux";

import "./sagas/loginUser";
import "./sagas/registerUser";
import { ContextProvider } from "./appContex";
import ErrorBoundary from "./ErrorBoundary";

class Startup extends Component {
  state = {}
  componentDidMount() {
    // dispatch actions on application start
  }
  updateState = (key,value) => {
    this.setState({
      [key]: value   
    })
  }

  render() {
    return (
      <ErrorBoundary>
        <ContextProvider value={{state:this.state,updateValue:this.updateState}}>
          {this.props.children}
        </ContextProvider>
      </ErrorBoundary>
    )
  }
}

const mapActionToProps = {
};

// connected to redux and we can fetch data in application starting in this component
export default connect(
  null,
  mapActionToProps
)(Startup);
