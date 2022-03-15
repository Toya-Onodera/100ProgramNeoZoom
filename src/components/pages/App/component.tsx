import React, { createContext } from "react";
import Peer from "skyway-js";

// Components
import { ChatJoin } from "../../organisms/ChatJoin";
import { StreamingVideoChat } from "../../organisms/StreamingVideoChat";

// Hooks
import { useAppHooks } from "./hooks";

export const PeerContext = createContext<Peer | null>(null);

export const App: React.VFC = () => {
  const { isJoinRoom, peer } = useAppHooks();

  return (
    <PeerContext.Provider value={peer}>
      {isJoinRoom ? <StreamingVideoChat /> : <ChatJoin />}
    </PeerContext.Provider>
  );
};
