import React, { useCallback, useRef } from "react";

// Components
import { InputForm } from "../../molecules/InputForm";

export const ChatJoin: React.VFC = () => {
  const inputRef = useRef<HTMLInputElement>();
  const onClick = useCallback(() => {
    console.log(inputRef.current?.value);
  }, []);

  return (
    <InputForm
      headingText="Enter a Room"
      buttonText="Join"
      inputRef={inputRef}
      onClick={onClick}
    />
  );
};
