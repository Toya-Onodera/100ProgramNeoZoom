import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

// Context
import {
  AllStreamStoreContext,
  FirebaseRoomData,
  StreamInfo,
  PeerContext,
  RoomContext,
} from "../../pages/App";

// Firebase
import { realtimeDatabaseGet, realtimeDatabaseSet } from "../../../firebase";

export const useChatJoinHooks = (
  setIsJoinRoom: Dispatch<SetStateAction<boolean>>,
  setRoomId: Dispatch<SetStateAction<string>>
) => {
  const peer = useContext(PeerContext);
  const { room, setRoom } = useContext(RoomContext);
  const { allStreamStore, setAllStreamStore } = useContext(
    AllStreamStoreContext
  );

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [canSitDownPositions, setCanSitDownPositions] = useState<number[]>([]);
  const [roomSeatData, setRoomSeatData] = useState<FirebaseRoomData[]>([]);

  const inputRef = useRef<HTMLInputElement>();

  const roomJoinButtonClickHandler = useCallback(async () => {
    // ルーム ID が入力されている場合のみ動作させる
    const roomId = `${inputRef.current?.value}`;

    if (roomId && peer && allStreamStore.localStream) {
      const _room = peer.joinRoom(roomId, {
        mode: "sfu",
        stream: allStreamStore.localStream.stream
          ? allStreamStore.localStream.stream
          : undefined,
      });

      setRoomId(roomId);

      // 既に座っている座席を取得する (Firebase)
      // FIXME: 同時に座席に座られた場合、バグるので対応する必要あり
      const targetRoomSeatData: FirebaseRoomData[] = await new Promise(
        (resolve) => {
          realtimeDatabaseGet(roomId).then((snapshot) => {
            if (snapshot.exists()) {
              resolve(Object.values(snapshot.val()));
            } else {
              resolve([]);
            }
          });
        }
      );

      setAllStreamStore({
        localStream: allStreamStore.localStream,
        otherStream: allStreamStore.otherStream.reduce(
          (prev: StreamInfo[], current) => {
            // seat の値がすでに存在している場合は更新しない
            if ("seat" in current) {
              return [...prev, current];
            }

            // seat が付与されていない場合は更新
            const isSeatKey = targetRoomSeatData.some(
              (seatData) => seatData?.peerId === current.id
            );

            if (isSeatKey) {
              return [
                ...prev,
                {
                  ...current,
                  // @ts-ignore
                  seat: targetRoomSeatData.find(
                    (seatData) => seatData.peerId === current.id
                  ).seat,
                },
              ];
            } else {
              return [...prev, current];
            }
          },
          []
        ),
      });

      setRoomSeatData(targetRoomSeatData);

      // 座られていない座席を選択肢にする
      const extractSeatPositions = [1, 2, 3, 4].filter(
        (position) =>
          !targetRoomSeatData.some((seatData) => seatData.seat === position)
      );

      setCanSitDownPositions(extractSeatPositions);

      // ルーム情報を state に保存して座席指定ダイアログを表示する
      setRoom(_room);
      setIsDialogOpen(true);
    }
  }, [
    peer,
    allStreamStore,
    setAllStreamStore,
    setRoom,
    setIsDialogOpen,
    setCanSitDownPositions,
    setRoomSeatData,
    setRoomId,
  ]);

  const seatJoinButtonClickHandler = useCallback(
    async (number: number) => {
      // ルーム ID が入力されている場合のみ動作させる
      const roomId = `${inputRef.current?.value}`;

      if (allStreamStore.localStream && room && peer) {
        setAllStreamStore({
          localStream: {
            ...allStreamStore.localStream,
            seat: number,
          },
          otherStream: allStreamStore.otherStream,
        });

        await realtimeDatabaseSet(roomId, [
          ...roomSeatData,
          {
            seat: number,
            peerId: peer.id,
          },
        ]);

        setIsJoinRoom(true);
      }
    },
    [setIsJoinRoom, allStreamStore, setAllStreamStore, roomSeatData, room, peer]
  );

  return {
    inputRef,
    isDialogOpen,
    canSitDownPositions,
    roomJoinButtonClickHandler,
    seatJoinButtonClickHandler,
  };
};
