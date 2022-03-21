import React, { Dispatch, SetStateAction } from "react";

// Components
import { InputForm } from "../../molecules/InputForm";
import { CheckSeatDialog } from "../CheckSeatDialog";

// Hooks
import { useChatJoinHooks } from "./hooks";

type Props = {
  setIsJoinRoom: Dispatch<SetStateAction<boolean>>;
  setRoomId: Dispatch<SetStateAction<string>>;
};

export const ChatJoin: React.VFC<Props> = ({ setIsJoinRoom, setRoomId }) => {
  const {
    inputRef,
    isDialogOpen,
    canSitDownPositions,
    roomJoinButtonClickHandler,
    seatJoinButtonClickHandler,
  } = useChatJoinHooks(setIsJoinRoom, setRoomId);

  return (
    <>
      <InputForm
        headingText="Enter a Room"
        buttonText="Join"
        inputRef={inputRef}
        onClick={roomJoinButtonClickHandler}
      />

      <CheckSeatDialog
        isOpen={isDialogOpen}
        seats={canSitDownPositions}
        onClick={seatJoinButtonClickHandler}
      />
    </>
  );
};
