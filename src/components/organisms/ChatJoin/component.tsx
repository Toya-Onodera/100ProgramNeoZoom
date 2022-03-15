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
import { PeerContext, StreamContext } from "../../pages/App";

type Props = {
  setIsJoinRoom: Dispatch<SetStateAction<boolean>>;
};

export const ChatJoin: React.VFC<Props> = ({ setIsJoinRoom }) => {
  const peer = useContext(PeerContext);
  const stream = useContext(StreamContext);
  const inputRef = useRef<HTMLInputElement>();

  const onClick = useCallback(() => {
    // ルーム ID が入力されている場合のみ動作させる
    const roomId = `${inputRef.current?.value}`;

    if (roomId && peer && stream) {
      peer.joinRoom(roomId, { stream: stream });
      setIsJoinRoom(true);
    }
  }, [peer, stream]);

  return (
    <InputForm
      headingText="Enter a Room"
      buttonText="Join"
      inputRef={inputRef}
      onClick={onClick}
    />
  );
};
