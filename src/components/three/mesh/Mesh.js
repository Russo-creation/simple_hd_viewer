import * as THREE from "three";
import React, { useState, useEffect, useMemo } from "react";

import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import ZipLoader from "zip-loader";
import zipfile from "./room.zip";

export default function Sphere(props) {
  const [Url, setUrl] = useState();
  useEffect(() => {
    /* var loader = new ZipLoader(zipfile);
    loader.load(console.log("tst")).then(() => {
      setUrl(loader.extractAsBlobUrl("envy 41.glb", ""));
    }); */

    ZipLoader.install({ THREE: THREE });

    let zipLoad = new ZipLoader(zipfile);
    zipLoad.on("progress", (event) => {
      console.log(event);
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
}

const Objects = (props) => {
  //loading gltf file from blop zip
  const { nodes } = useLoader(GLTFLoader, props.path, (loader) => {});

  console.log(nodes);

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

  nodes["plant"].children[0].material.transparent = true;
  nodes["plant"].children[0].material.depthWrite = false;
  nodes["plant"].children[1].material.transparent = true;
  nodes["plant"].children[1].material.depthWrite = false;

  nodes["label1"].material.transparent = true;
  nodes["label1"].material.depthWrite = false;

  nodes["label2"].material.transparent = true;
  nodes["label2"].material.depthWrite = false;

  nodes["bottle1"].material.transparent = true;
  nodes["bottle1"].material.depthWrite = false;
  nodes["bottle1"].material.opacity = 0.23;

  return (
    <>
      <mesh
        geometry={nodes["plant"].children[0].geometry}
        material={nodes["plant"].children[0].material}
      ></mesh>
      <mesh
        geometry={nodes["plant"].children[1].geometry}
        material={nodes["plant"].children[1].material}
      ></mesh>
      <mesh
        geometry={nodes["beam"].geometry}
        material={nodes["beam"].material}
      ></mesh>
      <mesh
        geometry={nodes["bottle1"].geometry}
        material={nodes["bottle1"].material}
      ></mesh>
      <mesh
        geometry={nodes["bottle2"].geometry}
        material={nodes["bottle2"].material}
      ></mesh>
      <mesh
        geometry={nodes["coin"].geometry}
        material={nodes["coin"].material}
      ></mesh>
      <mesh
        geometry={nodes["curtine"].geometry}
        material={nodes["curtine"].material}
      ></mesh>

      <mesh
        geometry={nodes["label1"].geometry}
        material={nodes["label1"].material}
      ></mesh>
      <mesh
        geometry={nodes["label2"].geometry}
        material={nodes["label2"].material}
      ></mesh>
      <mesh
        geometry={nodes["liquid1"].geometry}
        material={nodes["liquid1"].material}
      ></mesh>

      <mesh
        geometry={nodes["plug1"].geometry}
        material={nodes["plug1"].material}
      ></mesh>
      <mesh
        geometry={nodes["plug2"].geometry}
        material={nodes["plug2"].material}
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
    </>
  );
};
