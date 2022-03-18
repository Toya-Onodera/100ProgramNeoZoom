import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Peer, { SfuRoom } from "skyway-js";

export type PeerType = null | Peer;
export type StreamType = null | MediaStream;
export type RoomType = SfuRoom | null;
export type RoomContextType = {
  room: RoomType;
  setRoom: Dispatch<SetStateAction<RoomType>>;
};

export type StreamInfo = {
  id: string;
  stream: StreamType;
};

export type AllStreamInfo = {
  localStream: StreamInfo | null;
  otherStream: StreamInfo[];
};

export const useAppHooks = () => {
  const [allStreamStore, setAllStreamStore] = useState<AllStreamInfo>({
    localStream: null,
    otherStream: [],
  });

  const [isJoinRoom, setIsJoinRoom] = useState<boolean>(false);
  const [room, setRoom] = useState<RoomType>(null);

  const { current: peer } = useRef<Peer>(
    new Peer({ key: process.env.REACT_APP_SKYWAY_API_KEY as string })
  );

  // カメラを使用する
  // TODO: カメラの起動タイミングを調整する必要がありそう
  useEffect(() => {
    (async () => {
      try {
        const localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        const localStreamInfo = {
          id: peer.id,
          stream: localStream,
        };

        setAllStreamStore({
          localStream: localStreamInfo,
          otherStream: [],
        });
      } catch (error) {
        setAllStreamStore({
          localStream: null,
          otherStream: [],
        });

        console.error("mediaDevice.getUserMedia() error", error);
      }
    })();
  }, []);

  // Context で利用できるようにまとめておく
  const roomValue = { room, setRoom };

  useEffect(() => {
    if (room) {
      room.on("open", () => {
        console.log("open", room);

        // 接続時に既にユーザが複数人いる場合の処理
        const { remoteStreams } = room;

        if (remoteStreams) {
          const remoteStreamsInfo = Object.values(remoteStreams).map(
            (stream) => {
              return {
                id: stream.peerId,
                stream: stream,
              };
            }
          );

          setAllStreamStore({
            localStream: allStreamStore.localStream,
            otherStream: remoteStreamsInfo,
          });
        }
      });

      room.on("stream", (stream) => {
        console.log("stream", stream);

        const userStreamInfo: StreamInfo = {
          id: stream.peerId,
          stream: stream,
        };

        setAllStreamStore({
          localStream: allStreamStore.localStream,
          otherStream: [...allStreamStore.otherStream, userStreamInfo],
        });
      });

      room.on("data", ({ src, data }) => {
        console.log("data", src, data);
      });
    }
  }, [room, allStreamStore]);

  return { allStreamStore, peer, isJoinRoom, setIsJoinRoom, roomValue };
};
