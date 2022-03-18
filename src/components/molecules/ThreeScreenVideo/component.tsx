import React from "react";

// components
import { AVideo, VideoSource } from "../AVideo";

type Props = {
  sources: VideoSource[];
};

export const ThreeScreenVideo: React.VFC<Props> = ({ sources }) => {
  return (
    <>
      {sources &&
        sources.map((source, i) => {
          return (
            <AVideo
              source={source}
              key={`AVideo-${i}`}
              elementId={`a-video-${i}`}
            />
          );
        })}
    </>
  );
};
