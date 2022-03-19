import "aframe";
import React, { useEffect } from "react";
import { Entity } from "aframe-react";
import { useAVideoStream } from "./hooks";

export type Props = {
  height: string;
  position: string;
  src: SrcType;
  width: string;
  rotation: string;
  elementId?: string;
};

export type SrcType = MediaStream | null;

export const AVideoStream: React.VFC<Props> = ({
  height,
  position,
  src,
  rotation,
  width,
  elementId,
}) => {
  const { videoRef } = useAVideoStream();

  useEffect(() => {
    if (src) {
      videoRef.current!.srcObject = src;
    }
  }, [src, videoRef]);

  return (
    <>
      <Entity primitive="a-assets">
        <video
          id={elementId}
          ref={videoRef}
          autoPlay
          playsInline
          crossOrigin="anonymous"
        />
      </Entity>

      <Entity
        primitive="a-video"
        src={`#${elementId}`}
        position={position}
        rotation={rotation}
        width={width}
        height={height}
      />
    </>
  );
};
