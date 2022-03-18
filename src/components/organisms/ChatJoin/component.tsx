import React, { Dispatch, SetStateAction } from "react";

// Components
import { InputForm } from "../../molecules/InputForm";

// Hooks
import { useChatJoinHooks } from "./hooks";

type Props = {
  setIsJoinRoom: Dispatch<SetStateAction<boolean>>;
};

export const ChatJoin: React.VFC<Props> = ({ setIsJoinRoom }) => {
  const { inputRef, onClick } = useChatJoinHooks(setIsJoinRoom);

  return (
    <InputForm
      headingText="Enter a Room"
      buttonText="Join"
      inputRef={inputRef}
      onClick={onClick}
    />
  );
};
