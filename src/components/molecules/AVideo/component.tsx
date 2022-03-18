import React from "react";

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
  elementId?: string;
};

export const AVideo: React.VFC<Props> = ({ source, elementId }) => {
  const isMediaStream = (
    src: AVideoType | AVideoStreamType
  ): src is MediaStream => typeof src !== "string" && src !== null;

  const { height, src, position, width, rotation } = source;
  return (
    <>
      {isMediaStream(src) ? (
        <AVideoStream
          elementId={elementId}
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
