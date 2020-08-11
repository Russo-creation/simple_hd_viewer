import React from "react";
import ThreeInit from "../components/three/ThreeInit";
import Loader from "../components/hud/Loader";

import { connect } from "react-redux";

const App = (props) => {
  const { loadingFnished } = props;

  return (
    <div className="App">
      <ThreeInit />
      {!loadingFnished ? <Loader /> : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loadingFnished: state.loader.loadingFnished,
  };
};

export default connect(mapStateToProps)(React.memo(App));

//export default App;
