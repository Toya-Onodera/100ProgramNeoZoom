import React from "react";
import { Entity } from "aframe-react";

type Props = {
  color: string;
  position: string;
  radius: string;
  rotation: string;
  height: string;
};

export const ATable: React.VFC<Props> = ({
  color,
  position,
  radius,
  rotation,
  height,
}) => {
  return (
    <Entity
      primitive="a-cylinder"
      color={color}
      position={position}
      radius={radius}
      rotation={rotation}
      height={height}
    />
  );
};
