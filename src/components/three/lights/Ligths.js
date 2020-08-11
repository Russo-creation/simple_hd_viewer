import React from "react";

const Lights = () => {
  return (
    <group>
      <spotLight
        castShadow
        intensity={0.2}
        angle={Math.PI / 7}
        position={[2, 15, 2]}
      />
    </group>
  );
};

export default Lights;
