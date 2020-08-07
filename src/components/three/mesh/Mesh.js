import * as THREE from "three";
import React, { useState, useEffect } from "react";

import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import ZipLoader from "zip-loader";
import zipfile from "./envy 41.zip";

export default function Sphere(props) {
  const [Url, setUrl] = useState();
  useEffect(() => {
    var loader = new ZipLoader(zipfile);
    loader.load().then(() => {
      setUrl(loader.extractAsBlobUrl("envy 41.glb", ""));
    });
  }, []);

  return (
    <group position={[0, 0, 0]}>{Url ? <Objects path={Url} /> : null}</group>
  );
}

const Objects = (props) => {
  const { nodes } = useLoader(GLTFLoader, props.path, (loader) => {});

  return (
    <mesh
      scale={[1.0, 1.0, 1.0]}
      position={[0, 0, 0]}
      geometry={nodes["Sphere.000_1"].geometry}
      rotation={[-0.61, 0, 0]}
    >
      <meshPhysicalMaterial
        attach="material"
        clearcoat={0.2}
        clearcoatRoughness={0.6}
        metalness={0.5}
        roughness={0.5}
        color="black"
      />
    </mesh>
  );
};
