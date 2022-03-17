import React, { useMemo } from "react";

import { AVideoProps } from "../../atoms/AVideo";
import { AVideoStreamProps } from "../../atoms/AVideoStream";
import { AllStreamInfo } from "../../pages/App/hooks";

export const useStreamingVideoChatHooks = (allStreamInfo: AllStreamInfo) => {
  const threeVideoSources = useMemo<(AVideoProps | AVideoStreamProps)[]>(
    () => [
      {
        src: allStreamInfo.localStream
          ? allStreamInfo.localStream.stream
          : null,
        position: "-4 1.5 -5",
        rotation: "0 45 0",
        width: "4",
        height: "2.25",
      },
      {
        src: allStreamInfo.localStream
          ? allStreamInfo.localStream.stream
          : null,
        position: "0 1.5 -5",
        rotation: "0 0 0",
        width: "4",
        height: "2.25",
      },
      {
        src: allStreamInfo.localStream
          ? allStreamInfo.localStream.stream
          : null,
        position: "4 1.5 -5",
        rotation: "0 -45 0",
        width: "4",
        height: "2.25",
      },
    ],
    [allStreamInfo]
  );

  return { threeVideoSources };
};
