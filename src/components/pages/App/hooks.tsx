import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import Peer, { SfuRoom } from "skyway-js";
import { useBeforeunload } from "react-beforeunload";

// Firebase
import { realtimeDatabaseOnValue } from "../../../firebase";

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

export type FirebaseRoomData = {
  peerId: string;
  seat: number;
};

export const useAppHooks = () => {
  const [allStreamStore, setAllStreamStore] = useState<AllStreamInfo>({
    localStream: null,
    otherStream: [],
  });

  const [isJoinRoom, setIsJoinRoom] = useState<boolean>(false);
  const [room, setRoom] = useState<RoomType>(null);
  const [roomId, setRoomId] = useState<string>("");

  const { current: peer } = useRef<Peer>(
    new Peer({ key: process.env.REACT_APP_SKYWAY_API_KEY as string })
  );

  // カメラを使用する
  // TODO: カメラの起動タイミングを調整する必要がありそう
  useEffect(() => {
    peer &&
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

  // FIXME: デバック用
  useEffect(
    () => console.log("allStreamStore", allStreamStore),
    [allStreamStore]
  );

  useEffect(() => {
    // 接続時に既にユーザが複数人いる場合の処理
    if (room) {
      const { remoteStreams } = room;

      if (remoteStreams) {
        const remoteStreamsInfo = Object.values(remoteStreams).map((stream) => {
          return {
            id: stream.peerId,
            stream: stream,
          };
        });

        setAllStreamStore((prev) => {
          return {
            localStream: prev.localStream,
            otherStream: remoteStreamsInfo,
          };
        });
      }
    }

    room?.on("stream", (stream) => {
      console.log("stream", stream);

      const userStreamInfo: StreamInfo = {
        id: stream.peerId,
        stream: stream,
      };

      setAllStreamStore((prev) => {
        return {
          localStream: prev.localStream,
          otherStream: [...prev.otherStream, userStreamInfo],
        };
      });
    });

    room?.on(
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
      }
    );
  }, [room]);

  useEffect(() => {
    roomId &&
      realtimeDatabaseOnValue(roomId, (snapshot) => {
        setAllStreamStore((prev) => {
          const roomSeatData = snapshot.val() as FirebaseRoomData[];

          const updatedOtherStream: StreamInfo[] = prev.otherStream.map(
            ({ stream, id, seat }) => {
              return {
                id: id,
                stream: stream,
                // @ts-ignore
                seat: Object.values(roomSeatData).find(
                  ({ peerId }) => peerId === id
                ).seat,
              } as StreamInfo;
            }
          );

          return {
            ...prev,
            otherStream: updatedOtherStream,
          };
        });
      });
  }, [roomId]);

  // TODO: ページを閉じたとき or 違うサイトに遷移したときに Firebase 上のルームデータを削除する
  // // フロントで完結は無理だと思っている -> (例) バックエンドサーバたてて ws で常時接続して、接続が切れたら db から削除みたいな処理しないと厳しそう
  // useBeforeunload(async (event) => {
  //   // ひとまずページ離脱時に確認だけ行う処理を追加しておく
  //   event.preventDefault();
  //   return false;
  // });

  return {
    peer,
    isJoinRoom,
    setIsJoinRoom,
    roomValue,
    allStreamStoreValue,
    roomId,
    setRoomId,
  };
};
