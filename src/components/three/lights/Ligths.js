import React from "react";

const Lights = () => {
  return (
    <group>
      {/* <pointLight intensity={0.4} /> */}
      {/* <ambientLight intensity={2} /> */}
      {/* <spotLight
        castShadow
        intensity={0.1}
        angle={Math.PI / 7}
        position={[150, 150, 250]}
        penumbra={1}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      /> */}
      <spotLight
        castShadow
        intensity={0.1}
        angle={Math.PI / 7}
        position={[1, 1, 2]}
        penumbra={1}
      />
    </group>
  );
};

export default Lights;
