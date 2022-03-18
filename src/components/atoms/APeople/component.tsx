import React from "react";
import { Entity } from "aframe-react";

type Props = {
  width: string;
  height: string;
  position: string;
  depth: string;
  material: string;
  rotation: string;
};

export const APeople: React.VFC<Props> = ({
  width,
  height,
  position,
  depth,
  material,
  rotation,
}) => {
  return (
    <Entity
      primitive="a-box"
      width={width}
      height={height}
      depth={depth}
      rotation={rotation}
      material={material}
      position={position}
    />
  );
};
