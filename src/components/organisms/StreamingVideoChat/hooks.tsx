import React, { useEffect, useMemo, useState } from "react";
import Peer from "skyway-js";

import { AVideoProps } from "../../atoms/AVideo";
import { AVideoStreamProps } from "../../atoms/AVideoStream";
export type StreamType = null | MediaStream;

export const useStreamingVideoChatHooks = () => {
  const [stream, setStream] = useState<StreamType>(null);

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

  // カメラを使用する
  useEffect(() => {
    // (async () => {
    //   try {
    //     const stream = await navigator.mediaDevices.getUserMedia({
    //       video: true,
    //       audio: true,
    //     });
    //
    //     setStream(stream);
    //   } catch (error) {
    //     setStream(null);
    //     console.error("mediaDevice.getUserMedia() error", error);
    //   }
    // })();
  }, []);

  return { threeVideoSources, stream };
};
