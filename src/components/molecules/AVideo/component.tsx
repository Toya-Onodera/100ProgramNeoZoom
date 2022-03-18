import React, { useMemo } from "react";

// components
import {
  AVideoSource,
  AVideoProps,
  AVideoType,
} from "../../atoms/AVideoSource";

import {
  AVideoStream,
  AVideoStreamProps,
  AVideoStreamType,
} from "../../atoms/AVideoStream";

export type VideoSource = AVideoProps | AVideoStreamProps;

type Props = {
  source: VideoSource;
};

export const AVideo: React.VFC<Props> = ({ source }) => {
  const isMediaStream = (
    src: AVideoType | AVideoStreamType
  ): src is MediaStream => typeof src !== "string" && src !== null;

  const key = useMemo<number>(() => {
    return new Date().getUTCMilliseconds();
  }, []);

  const { height, src, position, width, rotation } = source;
  return (
    <>
      {isMediaStream(src) ? (
        <AVideoStream
          elementId={`AVideoStream-${key}`}
          height={height}
          src={src}
          position={position}
          rotation={rotation}
          width={width}
        />
      ) : (
        <AVideoSource
          height={height}
          src={src}
          position={position}
          rotation={rotation}
          width={width}
        />
      )}
    </>
  );
};
