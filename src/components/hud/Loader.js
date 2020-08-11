import React from "react";
import "../../scss/loader.scss";

import { connect } from "react-redux";

const convertKBtoMB = (value) => {
  return (value * 0.000001).toFixed(2);
};

const Loader = (props) => {
  const { loadingTotalSize, loadingLoadedSize, loadingProgress } = props;

  return (
    <div id="loadingWindowContener">
      <div id="centeringCage">
        <div id="wait">please wait...</div>
        <div id="infoText">Loading 3D assets</div>

        <div id="loadbarCage">
          <div
            id="loadbarPtogress"
            style={{ width: loadingProgress + "%" }}
          ></div>
        </div>

        <div id="loadingSize">
          {convertKBtoMB(loadingTotalSize)} / {convertKBtoMB(loadingLoadedSize)}{" "}
          MB
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loadingTotalSize: state.loader.loadingTotalSize,
    loadingLoadedSize: state.loader.loadingLoadedSize,
    loadingProgress: state.loader.loadingProgress,
  };
};

export default connect(mapStateToProps)(React.memo(Loader));
