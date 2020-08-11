import React, { Component } from "react";
import ThreeInit from "../components/three/ThreeInit";
import Loader from "../components/hud/Loader";

import { Spring } from "react-spring/renderprops";

import { connect } from "react-redux";

class App extends Component {
  state = { displayLoadingWindow: true };

  componentDidUpdate() {
    //change state to display loading window with delay
    if (this.props.loadingFnished) {
      setTimeout(() => {
        this.setState({
          displayLoadingWindow: false,
        });
      }, 1000);
    }
  }

  render() {
    const { loadingFnished } = this.props;

    return (
      <div className="App">
        <ThreeInit />

        {this.state.displayLoadingWindow ? (
          !loadingFnished ? (
            <Loader />
          ) : (
            <Spring from={{ opacity: 1 }} to={{ opacity: 0 }} duration={1000}>
              {(props) => (
                <div style={props}>
                  <Loader />
                </div>
              )}
            </Spring>
          )
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loadingFnished: state.loader.loadingFnished,
    displayWindow: state.loader.displayWindow,
  };
};

export default connect(mapStateToProps)(React.memo(App));
