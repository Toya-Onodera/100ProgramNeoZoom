import React from "react";

// Components
import { ChatJoin } from "../../organisms/ChatJoin";
import { StreamingVideoChat } from "../../organisms/StreamingVideoChat";

// Hooks
import { useAppHooks } from "./hooks";

export const App: React.VFC = () => {
  const { isJoinRoom } = useAppHooks();

  return isJoinRoom ? <StreamingVideoChat /> : <ChatJoin />;
};
