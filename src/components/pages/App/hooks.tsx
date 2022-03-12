import { useEffect, useMemo } from "react";
import Peer from "skyway-js";

export const useAppHooks = () => {
  const peer = useMemo(() => {
    return process.env.REACT_APP_SKYWAY_API_KEY
      ? new Peer({ key: process.env.REACT_APP_SKYWAY_API_KEY as string })
      : null;
  }, [process.env.REACT_APP_SKYWAY_API_KEY]);

  const isJoinRoom = useMemo(() => {
    return peer ? !!Object.keys(peer.rooms).length : false;
  }, [peer]);

  useEffect(() => {
    console.log(isJoinRoom);
  }, [isJoinRoom]);

  return { peer, isJoinRoom };
};
