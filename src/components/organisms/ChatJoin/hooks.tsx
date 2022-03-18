import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useRef,
} from "react";
import { AllStreamStoreContext, PeerContext } from "../../pages/App";
import { RoomContext } from "../../pages/App/component";

export const useChatJoinHooks = (
  setIsJoinRoom: Dispatch<SetStateAction<boolean>>
) => {
  const allStreamInfo = useContext(AllStreamStoreContext);
  const peer = useContext(PeerContext);
  const { setRoom } = useContext(RoomContext);

  const inputRef = useRef<HTMLInputElement>();

  const onClick = useCallback(() => {
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
      setIsJoinRoom(true);
    }
  }, [peer, allStreamInfo.localStream, setRoom, setIsJoinRoom]);

  return {
    inputRef,
    onClick,
  };
};
