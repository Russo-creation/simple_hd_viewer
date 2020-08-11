import React from "react";
import ThreeInit from "../components/three/ThreeInit";
import Loader from "../components/hud/Loader";

import { connect } from "react-redux";

const App = (props) => {
  const {
    loadingFnished,
    loadingTotalSize,
    loadingLoadedSize,
    loadingProgress,
  } = props;

  console.log(
    loadingFnished,
    loadingTotalSize,
    loadingLoadedSize,
    loadingProgress
  );
  return (
    <div className="App">
      <ThreeInit />
      <Loader />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loadingFnished: state.loader.loadingFnished,
    loadingTotalSize: state.loader.loadingTotalSize,
    loadingLoadedSize: state.loader.loadingLoadedSize,
    loadingProgress: state.loader.loadingProgress,
  };
};

export default connect(mapStateToProps)(React.memo(App));

//export default App;
