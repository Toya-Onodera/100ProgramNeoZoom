import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Peer, { SfuRoom } from "skyway-js";
import { SEND_TEXT_TYPE } from "../../../constants/SEND_TEXT_TYPE";

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
  seat?: number;
};

export type AllStreamInfo = {
  localStream: StreamInfo | null;
  otherStream: StreamInfo[];
};

export type AllStreamInfoContextType = {
  allStreamStore: AllStreamInfo;
  setAllStreamStore: Dispatch<SetStateAction<AllStreamInfo>>;
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
  }, [peer]);

  // Context で利用できるようにまとめておく
  const allStreamStoreValue = { allStreamStore, setAllStreamStore };
  const roomValue = { room, setRoom };

  // const dataConnection = peer.connect("peerID");

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

      // 新規ユーザが参加してきた際に自身の座席情報を送信する
      room.on("peerJoin", () => {
        if (allStreamStore.localStream?.seat) {
          room.send({
            type: SEND_TEXT_TYPE.SEAT,
            text: allStreamStore.localStream.seat,
          });
        }
      });

      room.on(
        "data",
        ({
          src: peerId,
          data,
        }: {
          src: string;
          data: {
            type: string;
            text: string;
          };
        }) => {
          console.log("data", peerId, data);
          const { type } = data;

          switch (type) {
            case SEND_TEXT_TYPE.SEAT:
              const { text: seat } = data;
              setAllStreamStore({
                localStream: allStreamStore.localStream,
                otherStream: allStreamStore.otherStream.map((e) => {
                  // 送り元の Peer ID が同じオブジェクトの seat のみ更新を行う
                  if (e.id === peerId) {
                    return {
                      ...e,
                      seat: parseInt(seat),
                    };
                  }
                  return e;
                }),
              });

              break;
          }
        }
      );
    }
  }, [room]);

  return {
    peer,
    isJoinRoom,
    setIsJoinRoom,
    roomValue,
    allStreamStoreValue,
  };
};
