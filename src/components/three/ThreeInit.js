import React, { useRef, Suspense } from "react";
import * as THREE from "three";
import { Canvas, Dom, extend, useThree, useFrame } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Lights from "./lights/Ligths";

import Mesh from "./mesh/Mesh";
import HDRI from "./hdri/HDRI";
import Fireflies from "./mesh/Fireflies";

import Effects from "./effects/Effects.js";

import { ReactReduxContext, Provider } from "react-redux";

extend({ OrbitControls });

function Controls(props) {
  const { camera, gl } = useThree();
  const ref = useRef();
  useFrame(() => ref.current.update());
  //useFrame(() => console.log(ref.current.object.position)); //camera position
  //useFrame(() => console.log(ref.current.object.rotation));

  return (
    <orbitControls
      ref={ref}
      target={[-1.0112384843663136, 0.06762010421780972, -0.6420848982973388]}
      {...props}
      args={[camera, gl.domElement]}
    />
  );
}

const ThreeInit = () => {
  return (
    <ReactReduxContext.Consumer>
      {({ store }) => (
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
              -0.703155642813053,
              0.06158084870789878,
              -0.7431460650269648,
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
          <Provider store={store}>
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
              <Fireflies />
            </Suspense>
          </Provider>
        </Canvas>
      )}
    </ReactReduxContext.Consumer>
  );
};

export default ThreeInit;
