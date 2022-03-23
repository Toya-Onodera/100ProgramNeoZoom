import React, { createContext } from "react";

// Components
import { ChatJoin } from "../../organisms/ChatJoin";
import { StreamingVideoChat } from "../../organisms/StreamingVideoChat";
import { FaceMesh } from "../../organisms/FeshMesh";

// Hooks
import {
  PeerType,
  RoomContextType,
  useAppHooks,
  AllStreamInfoContextType,
} from "./hooks";

export const PeerContext = createContext<PeerType>(null);

export const AllStreamStoreContext = createContext<AllStreamInfoContextType>({
  allStreamStore: {
    localStream: null,
    otherStream: [],
  },
  setAllStreamStore: () => {},
});

export const RoomContext = createContext<RoomContextType>({
  room: null,
  setRoom: () => {},
});

export const App: React.VFC = () => {
  const {
    peer,
    isJoinRoom,
    setIsJoinRoom,
    roomValue,
    allStreamStoreValue,
    setRoomId,
  } = useAppHooks();

  return (
    <AllStreamStoreContext.Provider value={allStreamStoreValue}>
      <PeerContext.Provider value={peer}>
        <RoomContext.Provider value={roomValue}>
          {isJoinRoom ? (
            <StreamingVideoChat />
          ) : (
            <ChatJoin setIsJoinRoom={setIsJoinRoom} setRoomId={setRoomId} />
          )}

          <FaceMesh />
        </RoomContext.Provider>
      </PeerContext.Provider>
    </AllStreamStoreContext.Provider>
  );
};
