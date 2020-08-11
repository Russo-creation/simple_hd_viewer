import React from "react";
import ThreeInit from "../components/three/ThreeInit";
import Loader from "../components/hud/Loader";

import { connect } from "react-redux";

const App = (props) => {
  console.log(props.loadingProgress);
  return (
    <div className="App">
      <ThreeInit />
      <Loader />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loadingProgress: state.loader.loadingProgress,
  };
};

export default connect(mapStateToProps)(React.memo(App));

//export default App;
