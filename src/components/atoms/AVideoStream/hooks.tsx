import React, { createRef } from "react";

export const useAVideoStream = () => {
  const videoRef = createRef<HTMLVideoElement>();

  return { videoRef };
};
