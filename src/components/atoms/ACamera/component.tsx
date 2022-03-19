import React from "react";
import { Entity } from "aframe-react";

type Props = {
  position: string;
  cursorOpacity: string;
  cursorScale: string;
  cursorVisible: string;
  cursorColor: string;
};

export const ACamera: React.VFC<Props> = ({
  position,
  cursorOpacity,
  cursorScale,
  cursorVisible,
  cursorColor,
}) => {
  return (
    <Entity
      primitive="a-camera"
      position={position}
      cursor-visible={cursorOpacity}
      cursor-scale={cursorScale}
      cursor-color={cursorVisible}
      cursor-opacity={cursorColor}
    />
  );
};
