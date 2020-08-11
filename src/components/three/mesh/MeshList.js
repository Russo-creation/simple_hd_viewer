import * as THREE from "three";
import React, { useEffect } from "react";

import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions";

const MeshList = (props) => {
  //loading gltf file from blop zip
  const { nodes } = useLoader(GLTFLoader, props.path, (loader) => {});

  //change in all meshes displaing material side to frontSide
  const meshArray = Object.keys(nodes);
  for (let i = 0; i < meshArray.length; i++) {
    if (typeof nodes[meshArray[i]].material !== "undefined") {
      nodes[meshArray[i]].material.side = THREE.FrontSide;
    }
  }

  //editing specific material in mesh as needed

  nodes["spiderweeb"].material.transparent = true;
  nodes["spiderweeb"].material.depthWrite = false;
  nodes["spiderweeb"].material.side = THREE.DoubleSide;

  nodes["plant"].children[0].material.transparent = true;
  nodes["plant"].children[0].material.depthWrite = false;
  nodes["plant"].children[1].material.transparent = true;
  nodes["plant"].children[1].material.depthWrite = false;

  nodes["atlas"].material.transparent = true;
  nodes["atlas"].material.depthWrite = false;

  nodes["bottle"].material.transparent = true;
  nodes["bottle"].material.opacity = 0.96;

  //send to redux value that loading meshes is finished
  useEffect(() => {
    props.onLoadingSceneFinish();
  });

  //load all meshes from GLTF file
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

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadingSceneFinish: () =>
      dispatch({ type: actionTypes.LoadingSceneFinished }),
  };
};

export default connect(null, mapDispatchToProps)(React.memo(MeshList));
