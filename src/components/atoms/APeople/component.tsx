import React from "react";
import { Entity } from "aframe-react";

type Props = {
  width?: string;
  height?: string;
  position?: string;
  depth?: string;
  material?: string;
  rotation?: string;
  scale?: string;
};

export const APeople: React.VFC<Props> = ({
  width,
  height,
  position,
  depth,
  material,
  rotation,
  scale,
}) => {
  return (
    <>
      <Entity primitive="a-assets">
        <Entity
          primitive="a-asset-item"
          id="tree"
          src="/assets/3d_models/people/scene.gltf"
        />
      </Entity>

      <Entity
        primitive="a-gltf-model"
        src="/assets/3d_models/people/scene.gltf"
        widtg={width}
        height={height}
        depth={depth}
        rotation={rotation}
        material={material}
        position={position}
        scale={scale}
      />
    </>
  );
};
