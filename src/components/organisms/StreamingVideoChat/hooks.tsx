import React, { useMemo } from "react";

import { AVideoProps } from "../../atoms/AVideo";
import { AVideoStreamProps } from "../../atoms/AVideoStream";
import { StreamType } from "../../pages/App/hooks";

export const useStreamingVideoChatHooks = (stream: StreamType) => {
  const threeVideoSources = useMemo<(AVideoProps | AVideoStreamProps)[]>(
    () => [
      {
        src: stream,
        position: "-4 1.5 -5",
        rotation: "0 45 0",
        width: "4",
        height: "2.25",
      },
      {
        src: stream,
        position: "0 1.5 -5",
        rotation: "0 0 0",
        width: "4",
        height: "2.25",
      },
      {
        src: stream,
        position: "4 1.5 -5",
        rotation: "0 -45 0",
        width: "4",
        height: "2.25",
      },
    ],
    [stream]
  );

  return { threeVideoSources };
};
