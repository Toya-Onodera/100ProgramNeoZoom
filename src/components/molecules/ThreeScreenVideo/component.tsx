import "aframe";
import React from "react";

// components
import { AVideo, AVideoProps } from "../../atoms/AVideo";
import { AVideoStream, AVideoStreamProps } from "../../atoms/AVideoStream";
import { useThreeScreenVideo } from "./hooks";

type Props = {
  sources: (AVideoProps | AVideoStreamProps)[];
};

export const ThreeScreenVideo: React.VFC<Props> = ({ sources }) => {
  const { isMediaStream } = useThreeScreenVideo();

  return (
    <>
      {sources &&
        sources.map((source, i) => {
          const { height, src, position, width, rotation } = source;

          return isMediaStream(src) ? (
            <AVideoStream
              key={`AVideoStream-${i}`}
              height={height}
              src={src}
              position={position}
              rotation={rotation}
              width={width}
              elementId={`video-stream-${i}`}
            />
          ) : (
            <AVideo
              key={`AVideo-${i}`}
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
};
