import React from "react";
import { Entity } from "aframe-react";

type Props = {
  color: string;
  intensity: string;
  position: string;
};

export const ALight: React.VFC<Props> = ({ color, intensity, position }) => {
  return (
    <Entity
      primitive="a-light"
      type="ambient"
      color={color}
      intensity={intensity}
      position={position}
    />
  );
};
