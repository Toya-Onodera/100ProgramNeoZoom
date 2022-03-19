import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

// Context
import { AllStreamStoreContext, PeerContext } from "../../pages/App";
import { RoomContext } from "../../pages/App/component";

export const useChatJoinHooks = (
  setIsJoinRoom: Dispatch<SetStateAction<boolean>>
) => {
  const allStreamInfo = useContext(AllStreamStoreContext);
  const peer = useContext(PeerContext);
  const { setRoom } = useContext(RoomContext);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>();

  const roomJoinButtonClickHandler = useCallback(() => {
    // ルーム ID が入力されている場合のみ動作させる
    const roomId = `${inputRef.current?.value}`;

    if (roomId && peer && allStreamInfo.localStream) {
      const room = peer.joinRoom(roomId, {
        mode: "sfu",
        stream: allStreamInfo.localStream.stream
          ? allStreamInfo.localStream.stream
          : undefined,
      });

      setRoom(room);
      setIsDialogOpen(true);
    }
  }, [peer, allStreamInfo.localStream, setRoom, setIsDialogOpen]);

  const seatJoinButtonClickHandler = useCallback(
    (number: number) => {
      console.log(number);
      setIsJoinRoom(true);
    },
    [setIsJoinRoom]
  );

  return {
    inputRef,
    isDialogOpen,
    roomJoinButtonClickHandler,
    seatJoinButtonClickHandler,
  };
};
