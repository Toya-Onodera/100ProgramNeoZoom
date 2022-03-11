import "aframe";
import React from "react";

// components
import { AVideo, AVideoProps } from "../../atoms/AVideo";

type Props = {
  sources: AVideoProps[];
};

export const ThreeScreenVideo: React.VFC<Props> = ({ sources }) => (
  <>
    {sources &&
      sources.map((source) => {
        const { height, src, position, width, rotation } = source;
        return (
          <AVideo
            height={height}
            src={src}
            position={position}
            rotation={rotation}
            width={width}
          />
        );
      })}
  </>
);
