import { AVideoType } from "../../atoms/AVideo";
import { AVideoStreamType } from "../../atoms/AVideoStream";

export const useThreeScreenVideo = () => {
  const isMediaStream = (
    src: AVideoType | AVideoStreamType
  ): src is MediaStream => typeof src !== "string" && src !== null;

  return {
    isMediaStream,
  };
};
