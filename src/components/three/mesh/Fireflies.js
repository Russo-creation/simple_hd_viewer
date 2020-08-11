import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";

import Curve from "./Curve";

const curveMoving = (curveGeometry, speed, direction) => {
  //checking what position in curve expected
  var time = Date.now();
  var looptime = speed * 1000;
  var t = (time % looptime) / looptime;

  //invert direction if needed
  if (!direction) {
    t = 1 - t;
  }

  //getting exact position at cuve in time
  var pos = curveGeometry.parameters.path.getPointAt(t);

  //making small transition to displaying
  pos.x += -902.7987733512952; //left right
  pos.y += 150.8872503416854; //top bottom
  pos.z += -705.830604006972; //forweward backword
  pos.multiplyScalar(0.001);

  //retrunging calculated position
  return pos;
};

const Fireflies = () => {
  //converting curve to TubeBufferGeometry
  const curveGeometry = new THREE.TubeBufferGeometry(Curve(), 100, 1, 1, true);

  //creating references
  const group1 = useRef();
  const group2 = useRef();
  const group3 = useRef();

  //update mesh in evry frame
  useFrame((state, delta) => {
    // 1st fireflie
    group1.current.position.copy(curveMoving(curveGeometry, 20, true));
    // 2st fireflie
    group2.current.position.copy(curveMoving(curveGeometry, 10, true));
    // 3st fireflie
    group3.current.position.copy(curveMoving(curveGeometry, 15, false));
  });

  return (
    <>
      <group ref={group1}>
        <FirefliesSet />
      </group>
      <group ref={group2}>
        <FirefliesSet />
      </group>
      <group ref={group3}>
        <FirefliesSet />
      </group>
    </>
  );
};

const FirefliesSet = () => {
  //create mesh that imitates fireflie
  return (
    <>
      <mesh>
        <sphereBufferGeometry attach="geometry" args={[0.001, 6, 6]} />
        <meshLambertMaterial
          attach="material"
          emissive="#ff840b"
          color="white"
          opacity={0.6}
          transparent={true}
        />
      </mesh>
      <pointLight intensity={0.9} distance={0.25} decay={2} />
    </>
  );
};

export default Fireflies;
