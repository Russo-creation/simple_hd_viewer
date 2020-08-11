import React, { useRef, Suspense } from "react";
import * as THREE from "three";
import { Canvas, Dom, extend, useThree, useFrame } from "react-three-fiber";
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
  // useFrame(() => console.log(ref.current.object.position)); //camera position
  //useFrame(() => console.log(ref.current.object.rotation));

  return (
    <orbitControls
      ref={ref}
      target={[-0.9167080496646348, -0.021711392885923757, -0.6397823492796839]}
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
        camera={{
          position: [
            -0.6182916979852157,
            0.003437048993761152,
            -0.6852449367690211,
          ],
          near: 0.01,
          far: 20,
        }}
        gl={{ antialias: false }}
        onCreated={({ gl }) => {
          gl.setClearColor("black");
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.outputEncoding = THREE.sRGBEncoding;
          gl.toneMappingExposure = 0.7;
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
