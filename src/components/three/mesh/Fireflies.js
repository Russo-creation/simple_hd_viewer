import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";

import Curve from "./Curve";

const curveMoving = (
  curveGeometry,
  speed,
  direction,
  tanslationX,
  tanslationY,
  tanslationZ
) => {
  var time = Date.now();
  var looptime = speed * 1000;
  var t = (time % looptime) / looptime;

  if (!direction) {
    t = 1 - t;
  }

  var pos = curveGeometry.parameters.path.getPointAt(t);

  pos.x += tanslationX; //left right
  pos.y += tanslationY; //top bottom
  pos.z += tanslationZ; //forweward backword
  pos.multiplyScalar(0.001);

  return pos;
};

const Fireflies = () => {
  //position={[-0.9027987733512952, 0.2278872503416854, -0.675830604006972]}

  const curveGeometry = new THREE.TubeBufferGeometry(Curve(), 100, 1, 1, true);

  const group1 = useRef();
  const group2 = useRef();
  const group3 = useRef();

  useFrame((state, delta) => {
    // 1st fireflie
    group1.current.position.copy(
      curveMoving(
        curveGeometry,
        20,
        true,
        -902.7987733512952,
        150.8872503416854,
        -705.830604006972
      )
    );
    // 2st fireflie
    group2.current.position.copy(
      curveMoving(
        curveGeometry,
        10,
        true,
        -902.7987733512952,
        150.8872503416854,
        -705.830604006972
      )
    );
    // 3st fireflie
    group3.current.position.copy(
      curveMoving(
        curveGeometry,
        15,
        false,
        -902.7987733512952,
        150.8872503416854,
        -705.830604006972
      )
    );
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
