import React, { Component } from "react";

import "./ErrorBoundary.css";
import ErrorIndicator from "../ErrorIndicator";

class ErrorBoundary extends Component {
  state = {
    hasError: false
  };

  componentDidCatch(error, info) {
    debugger;

    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
