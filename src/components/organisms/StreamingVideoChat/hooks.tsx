import { useContext, useMemo } from "react";

import { AVideoProps } from "../../atoms/AVideoSource";
import { AVideoStreamProps } from "../../atoms/AVideoStream";

// Contexts
import { AllStreamStoreContext } from "../../pages/App";

export const useStreamingVideoChatHooks = () => {
  const { allStreamStore } = useContext(AllStreamStoreContext);

  const multiVideoSources = useMemo<(AVideoProps | AVideoStreamProps)[]>(() => {
    const videoWidth = "4";
    const videoHeight = "2.25";
    const positions = ["0 0 -4", "-4 0 0", "4 0 0"];
    const rotations = ["0 0 0", "0 45 0", "0 -45 0"];

    return allStreamStore.otherStream.map((streamInfo, i) => {
      return {
        src: streamInfo ? streamInfo?.stream : null,
        position: positions[i],
        rotation: rotations[i],
        width: videoWidth,
        height: videoHeight,
      };
    });
  }, [allStreamStore]);

  return { multiVideoSources };
};
