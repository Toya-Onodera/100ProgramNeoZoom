import React, { createContext, useEffect } from "react";
import Peer from "skyway-js";

// Components
import { ChatJoin } from "../../organisms/ChatJoin";
import { StreamingVideoChat } from "../../organisms/StreamingVideoChat";

// Hooks
import { PeerType, StreamType, useAppHooks } from "./hooks";

export const PeerContext = createContext<PeerType>(null);
export const StreamContext = createContext<StreamType>(null);

export const App: React.VFC = () => {
  const { peer, stream, isJoinRoom, setIsJoinRoom } = useAppHooks();

  return (
    <StreamContext.Provider value={stream}>
      <PeerContext.Provider value={peer}>
        {isJoinRoom ? (
          <StreamingVideoChat />
        ) : (
          <ChatJoin setIsJoinRoom={setIsJoinRoom} />
        )}
      </PeerContext.Provider>
    </StreamContext.Provider>
  );
};
