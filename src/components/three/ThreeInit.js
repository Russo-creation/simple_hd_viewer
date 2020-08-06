import React, { useRef, useEffect, Suspense } from "react";
import * as THREE from "three";
import {
  Canvas,
  Dom,
  extend,
  useThree,
  useLoader,
  useFrame,
} from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Lights from "./lights/Ligths";

import Mesh from "./mesh/Mesh";
import HDRI from "./hdri/HDRI";

import Effects from "./effects/Effects.js";

extend({ OrbitControls });

function Controls(props) {
  const { camera, gl } = useThree();
  const ref = useRef();
  useFrame(() => ref.current.update());
  return (
    <orbitControls
      ref={ref}
      target={[0, 0, 0]}
      {...props}
      args={[camera, gl.domElement]}
    />
  );
}

const ThreeInit = () => {
  return (
    <>
      <Canvas
        style={{
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          outline: "none",
          border: "none",
        }}
        concurrent
        pixelRatio={window.devicePixelRatio}
        camera={{ position: [0, 0, 6.5] }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.outputEncoding = THREE.sRGBEncoding;
        }}
      >
        <Controls
          enableDamping
          enableZoom={true}
          enablePan={true}
          dampingFactor={0.05}
          rotateSpeed={1.1}
        />

        <Lights />

        <Suspense fallback={<Dom center>loading...</Dom>}>
          <HDRI />
          <Mesh />
          <Effects />
        </Suspense>
      </Canvas>
    </>
  );
};

export default ThreeInit;
