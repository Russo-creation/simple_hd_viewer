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
    <group position={[0, 0, 0]}>{Url ? <Objects path={Url} /> : null}</group>
  );
}

const Objects = (props) => {
  const { nodes } = useLoader(GLTFLoader, props.path, (loader) => {});

  console.log(nodes);

  const material = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "blue" }),
    []
  );

  return (
    <>
      <mesh
        scale={[1.0, 1.0, 1.0]}
        position={[0, 0, 0]}
        geometry={nodes["wall"].geometry}
        rotation={[0, 0, 0]}
        material={material}
      ></mesh>
      <mesh
        scale={[1.0, 1.0, 1.0]}
        position={[0, 0, 0]}
        geometry={nodes["window"].geometry}
        rotation={[0, 0, 0]}
        material={material}
      ></mesh>
      <mesh
        scale={[1.0, 1.0, 1.0]}
        position={[0, 0, 0]}
        geometry={nodes["plant"].geometry}
        rotation={[0, 0, 0]}
        material={material}
      ></mesh>
      <mesh
        scale={[1.0, 1.0, 1.0]}
        position={[0, 0, 0]}
        geometry={nodes["blind"].geometry}
        rotation={[0, 0, 0]}
        material={material}
      ></mesh>
      <mesh
        scale={[1.0, 1.0, 1.0]}
        position={[0, 0, 0]}
        geometry={nodes["table"].geometry}
        rotation={[0, 0, 0]}
        material={material}
      ></mesh>
    </>
  );
};
