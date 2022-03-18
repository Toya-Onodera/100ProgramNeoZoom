import React, { createContext } from "react";

// Components
import { ChatJoin } from "../../organisms/ChatJoin";
import { StreamingVideoChat } from "../../organisms/StreamingVideoChat";

// Hooks
import { AllStreamInfo, PeerType, RoomContextType, useAppHooks } from "./hooks";

export const PeerContext = createContext<PeerType>(null);

export const AllStreamStoreContext = createContext<AllStreamInfo>({
  localStream: null,
  otherStream: [],
});

export const RoomContext = createContext<RoomContextType>({
  room: null,
  setRoom: () => {},
});

export const App: React.VFC = () => {
  const { peer, allStreamStore, isJoinRoom, setIsJoinRoom, roomValue } =
    useAppHooks();

  return (
    <AllStreamStoreContext.Provider value={allStreamStore}>
      <PeerContext.Provider value={peer}>
        <RoomContext.Provider value={roomValue}>
          {isJoinRoom ? (
            <StreamingVideoChat />
          ) : (
            <ChatJoin setIsJoinRoom={setIsJoinRoom} />
          )}
        </RoomContext.Provider>
      </PeerContext.Provider>
    </AllStreamStoreContext.Provider>
  );
};
