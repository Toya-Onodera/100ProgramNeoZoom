import "aframe";
import React from "react";
import { Entity } from "aframe-react";

export type SrcType = string | null;

export type Props = {
  height: string;
  position: string;
  src: SrcType;
  width: string;
  rotation: string;
};

export const AVideo: React.VFC<Props> = ({
  height,
  position,
  src,
  rotation,
  width,
}) => (
  <Entity
    primitive="a-video"
    autoPlay={true}
    playsinline={true}
    src={src}
    position={position}
    rotation={rotation}
    width={width}
    height={height}
  />
);
