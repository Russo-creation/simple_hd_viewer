import React from "react";

export default function Sphere(props) {
  return (
    <mesh>
      <sphereBufferGeometry attach="geometry" args={[1.5, 64, 64]} />
      <meshPhysicalMaterial
        attach="material"
        clearcoat={1.0}
        clearcoatRoughness={0}
        metalness={0.9}
        roughness={0.1}
        color={"blue"}
        /* normalMap={normalMap}
          normalScale={[0.3, 0.3]}
          normalMap-wrapS={THREE.RepeatWrapping}
          normalMap-wrapT={THREE.RepeatWrapping}
          normalMap-repeat={[20, 20]} */
        //normalMap-anisotropy={16}
      />
    </mesh>
  );
}
