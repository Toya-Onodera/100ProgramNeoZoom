import React, { useMemo } from "react";

export const useAppHooks = () => {
  const threeVideoSources = useMemo(
    () => [
      {
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        position: "-4 1.5 -5",
        rotation: "0 45 0",
        width: "4",
        height: "2.25",
      },
      {
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        position: "0 1.5 -5",
        rotation: "0 0 0",
        width: "4",
        height: "2.25",
      },
      {
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        position: "4 1.5 -5",
        rotation: "0 -45 0",
        width: "4",
        height: "2.25",
      },
    ],
    []
  );

  return { threeVideoSources };
};
