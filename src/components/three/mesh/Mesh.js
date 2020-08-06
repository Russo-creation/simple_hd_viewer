import React, { useMemo } from "react";
import * as THREE from "three";

const Mesh = () => {
  /* const boxMateral = () => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#2a2a2a"),
      roughness: 1,
      metalness: 0.0,
    });
  }; */

  const color = new THREE.Color("#2a2a2a");

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({ color, roughness: 1, metalness: 0.5 }),
    [color]
  );

  return (
    <mesh position={[0, 0, 0]} material={material}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
    </mesh>
  );
};

export default Mesh;
