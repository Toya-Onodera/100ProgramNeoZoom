import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Peer, {
  DataConnection,
  MediaConnection,
  MeshRoom,
  SfuRoom,
} from "skyway-js";

export type PeerType = null | Peer;
export type StreamType = null | MediaStream;
export type RoomType = SfuRoom | MeshRoom | null;
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
    peer.on("call", (mediaConnection: MediaConnection) => {
      console.log(mediaConnection);
    });

    peer.on("connection", (dataConnection: DataConnection) => {
      console.log(dataConnection);
    });

    peer.on("error", (error) => {
      console.log(`${error.type}: ${error.message}`);
      // => room-error: Room name must be defined.
    });
  }, [peer]);

  useEffect(() => {
    if (room) {
      room.on("open", () => {
        console.log("open", room);
      });

      room.on("peerJoin", () => {
        console.log("peerJoin", room);
      });

      room.on("peerLeave", (peerId: string) => {
        console.log("peerLeave", peerId);
      });

      room.on("stream", (stream) => {
        console.log("stream", stream);

        const userStreamInfo = {
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
  }, [room]);

  return { allStreamStore, peer, isJoinRoom, setIsJoinRoom, roomValue };
};
