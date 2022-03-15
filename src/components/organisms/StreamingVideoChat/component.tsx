import "aframe";
import React from "react";
import { Scene } from "aframe-react";

// Components
import { ASky } from "../../atoms/ASky";
import { ThreeScreenVideo } from "../../molecules/ThreeScreenVideo";

// Hooks
import { useStreamingVideoChatHooks } from "./hooks";

export const StreamingVideoChat: React.VFC = () => {
  const { threeVideoSources } = useStreamingVideoChatHooks();

  return (
    <Scene>
      <ASky material="color: #cccccc" />
      <ThreeScreenVideo sources={threeVideoSources} />
    </Scene>
  );
};
