import * as THREE from "three";
import React, { useState, useEffect } from "react";

import ZipLoader from "zip-loader";
import zipfile from "./room.zip";

import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions";

import MeshList from "./MeshList";

const MeshLoader = (props) => {
  const [Url, setUrl] = useState();
  useEffect(() => {
    //Zip initailization
    ZipLoader.install({ THREE: THREE });

    let zipLoad = new ZipLoader(zipfile);
    //Zip progress events
    zipLoad.on("progress", (event) => {
      //update progress value to redux
      props.onLoadingProgress(event.loaded, event.total);
    });

    //ZIp loaded event
    zipLoad.on("load", (event) => {
      //change state when loaded and set url as blob
      setUrl(zipLoad.extractAsBlobUrl("room.glb", ""));
    });

    zipLoad.load();
  }, []);

  //display all loaded meshes from zip
  return (
    <group rotation={[0, -Math.PI / 2.7, 0]}>
      {Url ? <MeshList path={Url} /> : null}
    </group>
  );
};

const mapStateToProps = (state) => {
  return {
    loadingTotalSize: state.loader.loadingTotalSize,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadingSceneFinish: () =>
      dispatch({ type: actionTypes.LoadingSceneFinished }),
    onLoadingProgress: (loaded, total) =>
      dispatch({
        type: actionTypes.LoadingSceneProgress,
        loadedSize: loaded,
        totalSize: total,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(MeshLoader));
