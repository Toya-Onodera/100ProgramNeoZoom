import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useRef,
} from "react";

// Components
import { InputForm } from "../../molecules/InputForm";

// Contexts
import { PeerContext, AllStreamStoreContext } from "../../pages/App";
import { RoomContext } from "../../pages/App/component";

type Props = {
  setIsJoinRoom: Dispatch<SetStateAction<boolean>>;
};

export const ChatJoin: React.VFC<Props> = ({ setIsJoinRoom }) => {
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
  }, [peer, allStreamInfo.localStream]);

  return (
    <InputForm
      headingText="Enter a Room"
      buttonText="Join"
      inputRef={inputRef}
      onClick={onClick}
    />
  );
};
