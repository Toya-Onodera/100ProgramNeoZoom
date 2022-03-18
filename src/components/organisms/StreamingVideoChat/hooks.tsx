import { useMemo } from "react";

import { AVideoProps } from "../../atoms/AVideoSource";
import { AVideoStreamProps } from "../../atoms/AVideoStream";
import { AllStreamInfo } from "../../pages/App/hooks";

export const useStreamingVideoChatHooks = (allStreamInfo: AllStreamInfo) => {
  const threeVideoSources = useMemo<(AVideoProps | AVideoStreamProps)[]>(() => {
    const videoWidth = "4";
    const videoHeight = "2.25";

    const positions = ["-4 1.5 -5", "0 1.5 -5", "4 1.5 -5"];
    const rotations = ["0 45 0", "0 0 0", "0 -45 0"];

    return [
      ...[allStreamInfo.localStream, ...allStreamInfo.otherStream].map(
        (streamInfo, i) => {
          return {
            src: streamInfo ? streamInfo?.stream : null,
            position: positions[i],
            rotation: rotations[i],
            width: videoWidth,
            height: videoHeight,
          };
        }
      ),
    ];
  }, [allStreamInfo]);

  return { threeVideoSources };
};
