import * as THREE from "three";
import React, { useState, useEffect, useMemo } from "react";

import ZipLoader from "zip-loader";
import zipfile from "./room.zip";

import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions";

import MeshList from "./MeshList";

const Sphere = (props) => {
  const [Url, setUrl] = useState();
  useEffect(() => {
    /* var loader = new ZipLoader(zipfile);
    loader.load(console.log("tst")).then(() => {
      setUrl(loader.extractAsBlobUrl("envy 41.glb", ""));
    }); */

    ZipLoader.install({ THREE: THREE });

    let zipLoad = new ZipLoader(zipfile);
    zipLoad.on("progress", (event) => {
      props.onLoadingProgress(event.loaded, event.total);
      // props.onLoadingProgress((event.loaded / event.total) * 100);
    });

    zipLoad.on("load", (event) => {
      setUrl(zipLoad.extractAsBlobUrl("room.glb", ""));
    });

    zipLoad.load();
  }, []);

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

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Sphere));
