import { useMemo, useEffect } from "react";
import { useLoader, useThree, useFrame } from "react-three-fiber";
import {
  SMAAImageLoader,
  BlendFunction,
  KernelSize,
  BloomEffect,
  EffectComposer,
  EffectPass,
  RenderPass,
  SMAAEffect,
  TextureEffect,
  VignetteEffect,
  BokehEffect,
} from "postprocessing";

import { TextureLoader } from "three";

import scratchesTextureURL from "./scratches.jpg";

// Fix smaa loader signature
// Will not be neccessary next version: https://github.com/vanruesc/postprocessing/commit/f05bb85fc9548458ee5e4a24026f308f0a8b72d4
const _load = SMAAImageLoader.prototype.load;
SMAAImageLoader.prototype.load = function (_, set) {
  return _load.bind(this)(set);
};

export default function Effects() {
  const scratchesTexture = useLoader(TextureLoader, scratchesTextureURL);
  const { gl, scene, camera, size } = useThree();
  const smaa = useLoader(SMAAImageLoader);
  const composer = useMemo(() => {
    const composer = new EffectComposer(gl);
    composer.addPass(new RenderPass(scene, camera));

    //antyaliasing postprocessing

    const smaaEffect = new SMAAEffect(...smaa);
    smaaEffect.colorEdgesMaterial.setEdgeDetectionThreshold(0.1);

    //scratches texture postprocessing

    const textureEffect = new TextureEffect({
      blendFunction: BlendFunction.COLOR_DODGE,
      texture: scratchesTexture,
    });
    textureEffect.blendMode.opacity.value = 0.15;

    //vignerre postprocessing

    const vignetteEffect = new VignetteEffect({
      eskil: false,
      offset: 0.35,
      darkness: 0.75,
    });

    //bloom postprocessing

    const bloom = new BloomEffect({
      blendFunction: BlendFunction.SCREEN,
      kernelSize: KernelSize.MEDIUM,
      luminanceThreshold: 0.1,
      height: 600,
    });
    bloom.blendMode.opacity.value = 0.2;

    //DOF postprocessing

    const bokehEffect = new BokehEffect({
      focus: 0.009,
      dof: 0.002,
      aperture: 0.5,
      maxBlur: 0.01,
    });

    //passing postprocesing

    composer.addPass(new EffectPass(camera, bokehEffect));
    const effectPass = new EffectPass(
      camera,
      textureEffect,
      smaaEffect,
      bloom,
      vignetteEffect
    );
    effectPass.renderToScreen = true;
    composer.addPass(effectPass);
    return composer;
  }, []);
  useEffect(() => void composer.setSize(size.width, size.height), [size]);
  return useFrame((_, delta) => composer.render(delta), 1);
}
