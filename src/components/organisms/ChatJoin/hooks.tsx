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
  PeerContext,
  RoomContext,
} from "../../pages/App";
import { SEND_TEXT_TYPE } from "../../../constants/SEND_TEXT_TYPE";

export const useChatJoinHooks = (
  setIsJoinRoom: Dispatch<SetStateAction<boolean>>
) => {
  const peer = useContext(PeerContext);
  const { room, setRoom } = useContext(RoomContext);
  const { allStreamStore, setAllStreamStore } = useContext(
    AllStreamStoreContext
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>();

  const roomJoinButtonClickHandler = useCallback(() => {
    // ルーム ID が入力されている場合のみ動作させる
    const roomId = `${inputRef.current?.value}`;

    if (roomId && peer && allStreamStore.localStream) {
      const _room = peer.joinRoom(roomId, {
        mode: "sfu",
        stream: allStreamStore.localStream.stream
          ? allStreamStore.localStream.stream
          : undefined,
      });

      setRoom(_room);
      setIsDialogOpen(true);
    }
  }, [peer, allStreamStore.localStream, setRoom, setIsDialogOpen]);

  const seatJoinButtonClickHandler = useCallback(
    (number: number) => {
      if (allStreamStore.localStream && room) {
        setAllStreamStore({
          localStream: {
            ...allStreamStore.localStream,
            seat: number,
          },
          otherStream: allStreamStore.otherStream,
        });

        room.send({
          type: SEND_TEXT_TYPE.SEAT,
          text: number,
        });

        setIsJoinRoom(true);
      }
    },
    [setIsJoinRoom, allStreamStore, setAllStreamStore, room]
  );

  return {
    inputRef,
    isDialogOpen,
    roomJoinButtonClickHandler,
    seatJoinButtonClickHandler,
  };
};
