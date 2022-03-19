import React, { Dispatch, SetStateAction } from "react";

// Components
import { InputForm } from "../../molecules/InputForm";
import { CheckSeatDialog } from "../CheckSeatDialog";

// Hooks
import { useChatJoinHooks } from "./hooks";

type Props = {
  setIsJoinRoom: Dispatch<SetStateAction<boolean>>;
};

export const ChatJoin: React.VFC<Props> = ({ setIsJoinRoom }) => {
  const {
    inputRef,
    isDialogOpen,
    roomJoinButtonClickHandler,
    seatJoinButtonClickHandler,
  } = useChatJoinHooks(setIsJoinRoom);

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
        seats={[1, 2, 3, 4]} // FIXME: ルーム入室時に座れる席の提示を行うのでそれでデータを作成する
        onClick={seatJoinButtonClickHandler}
      />
    </>
  );
};
