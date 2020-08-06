import React, { useRef, useState, useEffect } from "react";
import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import file from "./envy 41.glb";

export default function Sphere(props) {
  const { nodes } = useLoader(GLTFLoader, file, (loader) => {});

  console.log(nodes["Sphere.000_0"].geometry);

  return (
    <mesh
      scale={[1.7, 1.7, 1.7]}
      position={[0, -0.75, 0]}
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
        /* normalMap={texture}
          normalScale={[0.5, 0.5]}
          normalMap-wrapS={THREE.RepeatWrapping}
          normalMap-wrapT={THREE.RepeatWrapping}
          normalMap-repeat={[30, 30]}
          normalMap-anisotropy={16} */
      />
    </mesh>
  );
}
