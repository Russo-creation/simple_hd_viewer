import { useEffect } from "react";
import { UnsignedByteType, PMREMGenerator } from "three";
import { useThree } from "react-three-fiber";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import HdrFile from "./cave_wall_1k.hdr";

export default () => {
  const { gl, scene } = useThree();
  const pmremGenerator = new PMREMGenerator(gl);
  const loader = new RGBELoader();
  loader.setDataType(UnsignedByteType);
  pmremGenerator.compileEquirectangularShader();

  useEffect(() => {
    //load hdri  from file
    loader.load(HdrFile, (texture) => {
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;

      //setting hdri as global reflection in materials meshes
      scene.environment = envMap;
      //setting hdri as background image of scene
      scene.background = envMap;

      texture.dispose();
      pmremGenerator.dispose();
    });
  }, [scene, loader, pmremGenerator]);

  return null;
};
