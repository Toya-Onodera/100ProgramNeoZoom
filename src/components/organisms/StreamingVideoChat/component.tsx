import "aframe";
import React, { useContext } from "react";
import { Scene } from "aframe-react";

// Components
import { ASky } from "../../atoms/ASky";
import { ThreeScreenVideo } from "../../molecules/ThreeScreenVideo";

// Hooks
import { useStreamingVideoChatHooks } from "./hooks";

// Contexts
import { StreamContext } from "../../pages/App";

export const StreamingVideoChat: React.VFC = () => {
  const stream = useContext(StreamContext);

  // FIXME: ここは stream を動的に表示する処理に変更する
  const { threeVideoSources } = useStreamingVideoChatHooks(stream);

  return (
    <Scene>
      <ASky material="color: #cccccc" />
      <ThreeScreenVideo sources={threeVideoSources} />
    </Scene>
  );
};
