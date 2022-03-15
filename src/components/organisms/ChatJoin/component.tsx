import React, { useCallback, useContext, useRef } from "react";

// Components
import { InputForm } from "../../molecules/InputForm";

// Contexts
import { PeerContext } from "../../pages/App/component";

export const ChatJoin: React.VFC = () => {
  const peer = useContext(PeerContext);
  const inputRef = useRef<HTMLInputElement>();

  const onClick = useCallback(() => {
    console.log(peer);
    console.log(inputRef.current?.value);
  }, [peer]);

  return (
    <InputForm
      headingText="Enter a Room"
      buttonText="Join"
      inputRef={inputRef}
      onClick={onClick}
    />
  );
};
