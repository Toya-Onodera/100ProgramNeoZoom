import { useEffect, useRef, useState } from "react";
import Peer, { MediaConnection } from "skyway-js";

export type PeerType = null | Peer;
export type StreamType = null | MediaStream;

export const useAppHooks = () => {
  const [stream, setStream] = useState<StreamType>(null);
  const [isJoinRoom, setIsJoinRoom] = useState<boolean>(false);

  // カメラを使用する
  // TODO: カメラの起動タイミングを調整する必要がありそう
  useEffect(() => {
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        setStream(stream);
      } catch (error) {
        setStream(null);
        console.error("mediaDevice.getUserMedia() error", error);
      }
    })();
  }, []);

  const { current: peer } = useRef<Peer>(
    new Peer({ key: process.env.REACT_APP_SKYWAY_API_KEY as string })
  );

  peer?.on("call", (mediaConnection: MediaConnection) => {
    console.log(mediaConnection);
  });

  peer?.on("error", (error) => {
    console.log(`${error.type}: ${error.message}`);
    // => room-error: Room name must be defined.
  });

  return { stream, peer, isJoinRoom, setIsJoinRoom };
};
