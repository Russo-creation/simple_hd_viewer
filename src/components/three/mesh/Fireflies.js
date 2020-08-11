import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";

import Curve from "./Curve";

const Fireflies = () => {
  //position={[-0.9027987733512952, 0.2278872503416854, -0.675830604006972]}

  const curveGeometry = new THREE.TubeBufferGeometry(Curve(), 100, 1, 1, true);

  const group = useRef();

  useFrame((state, delta) => {
    var time = Date.now();
    var looptime = 20 * 1000;
    var t = (time % looptime) / looptime;

    var pos = curveGeometry.parameters.path.getPointAt(t);

    pos.x += -902.7987733512952; //left right
    pos.y += 150.8872503416854; //top bottom
    pos.z += -705.830604006972; //forweward backword
    pos.multiplyScalar(0.001);

    group.current.position.copy(pos);
  });

  return (
    <>
      <group ref={group}>
        <FirefliesSet />
      </group>
    </>
  );
};

const FirefliesSet = () => {
  return (
    <>
      <mesh>
        <sphereBufferGeometry attach="geometry" args={[0.001, 10, 10]} />
        <meshLambertMaterial
          attach="material"
          emissive="#ff840b"
          color="white"
        />
      </mesh>
      <pointLight intensity={0.9} distance={0.3} decay={2} />
    </>
  );
};

export default Fireflies;
