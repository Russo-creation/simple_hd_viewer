import * as THREE from "three";
import React, { useState, useEffect, useMemo } from "react";

import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import ZipLoader from "zip-loader";
import zipfile from "./room.zip";

import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions";

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
      //console.log(event);
      props.onLoadingProgress((event.loaded / event.total) * 100);
    });

    zipLoad.on("load", (event) => {
      setUrl(zipLoad.extractAsBlobUrl("room.glb", ""));
    });

    zipLoad.load();
  }, []);

  return (
    <group rotation={[0, -Math.PI / 2.7, 0]}>
      {Url ? <Objects path={Url} /> : null}
    </group>
  );
};

const Objects = (props) => {
  //loading gltf file from blop zip
  const { nodes } = useLoader(GLTFLoader, props.path, (loader) => {});

  // console.log(nodes);

  /* const material = useMemo(
    () => new THREE.MeshPhongMaterial({ color: "white", refractionRatio: 0.8 }),
    []
  ); */

  //change in all meshes displaing side to front
  const meshArray = Object.keys(nodes);
  for (let i = 0; i < meshArray.length; i++) {
    if (typeof nodes[meshArray[i]].material !== "undefined") {
      nodes[meshArray[i]].material.side = THREE.FrontSide;
    }
  }

  //editing specific material in mesh

  nodes["spiderweeb"].material.transparent = true;
  nodes["spiderweeb"].material.depthWrite = false;
  //nodes["spiderweeb"].material.alphaTest = 0.01;
  nodes["spiderweeb"].material.side = THREE.DoubleSide;

  nodes["plant"].children[0].material.transparent = true;
  nodes["plant"].children[0].material.depthWrite = false;
  nodes["plant"].children[1].material.transparent = true;
  nodes["plant"].children[1].material.depthWrite = false;

  nodes["atlas"].material.transparent = true;
  nodes["atlas"].material.depthWrite = false;

  nodes["bottle"].material.transparent = true;
  nodes["bottle"].material.opacity = 0.96;

  return (
    <>
      <mesh
        geometry={nodes["atlas"].geometry}
        material={nodes["atlas"].material}
      ></mesh>
      <mesh
        geometry={nodes["plant"].children[0].geometry}
        material={nodes["plant"].children[0].material}
      ></mesh>
      <mesh
        geometry={nodes["plant"].children[1].geometry}
        material={nodes["plant"].children[1].material}
      ></mesh>
      <mesh
        geometry={nodes["bottle"].geometry}
        material={nodes["bottle"].material}
      ></mesh>
      <mesh
        geometry={nodes["spiderweeb"].geometry}
        material={nodes["spiderweeb"].material}
      ></mesh>

      <mesh
        geometry={nodes["beam"].geometry}
        material={nodes["beam"].material}
      ></mesh>
      <mesh
        geometry={nodes["curtine"].geometry}
        material={nodes["curtine"].material}
      ></mesh>

      <mesh
        geometry={nodes["label"].geometry}
        material={nodes["label"].material}
      ></mesh>

      <mesh
        geometry={nodes["liquid"].geometry}
        material={nodes["liquid"].material}
      ></mesh>

      <mesh
        geometry={nodes["plug"].geometry}
        material={nodes["plug"].material}
      ></mesh>
      <mesh
        geometry={nodes["rust_steel"].geometry}
        material={nodes["rust_steel"].material}
      ></mesh>
      <mesh
        geometry={nodes["tweeter"].geometry}
        material={nodes["tweeter"].material}
      ></mesh>

      <mesh
        geometry={nodes["bulding"].children[0].geometry}
        material={nodes["bulding"].children[0].material}
      ></mesh>
      <mesh
        geometry={nodes["bulding"].children[1].geometry}
        material={nodes["bulding"].children[1].material}
      ></mesh>
      <mesh
        geometry={nodes["window"].geometry}
        material={nodes["window"].material}
      ></mesh>
      <mesh
        geometry={nodes["neckless"].geometry}
        material={nodes["neckless"].material}
      ></mesh>
      <mesh
        geometry={nodes["pistol_body"].geometry}
        material={nodes["pistol_body"].material}
      ></mesh>
      <mesh
        geometry={nodes["pistol_detals"].geometry}
        material={nodes["pistol_detals"].material}
      ></mesh>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loadingTotalSize: state.loader.loadingTotalSize,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadingProgress: (value) =>
      dispatch({ type: actionTypes.LoadingSceneProgress, progress: value }),
    onLoadingSceneFinish: () =>
      dispatch({ type: actionTypes.LoadingSceneFinished }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Sphere));
