import "aframe";
import React, { useContext } from "react";
import { Scene, Entity } from "aframe-react";

// Components
import { ASky } from "../../atoms/ASky";
import { ThreeScreenVideo } from "../../molecules/ThreeScreenVideo";

// Hooks
import { useStreamingVideoChatHooks } from "./hooks";

// Contexts
import { AllStreamStoreContext } from "../../pages/App";

export const StreamingVideoChat: React.VFC = () => {
  const allStreamStore = useContext(AllStreamStoreContext);

  // FIXME: ここは stream を動的に表示する処理に変更する
  const { threeVideoSources } = useStreamingVideoChatHooks(allStreamStore);

  return (
    <Scene>
      <ASky material="color: #cccccc" />
      {/*<ThreeScreenVideo sources={threeVideoSources} />*/}

      {/* 円卓 */}
      <Entity
        primitive="a-cylinder"
        color="#060"
        radius="3"
        height="0.5"
        position="0 -1 0"
        rotation="0 0 0"
      />

      {/* 自身の視点 */}
      <Entity
        primitive="a-camera"
        position="0 10 0"
        cursor-visible="true"
        cursor-scale="2"
        cursor-color="#0095DD"
        cursor-opacity="0.5"
      />

      {/*<!-- 参加者1 -->*/}
      <Entity
        primitive="a-box"
        width="1"
        height="2"
        depth="1"
        rotation="0 0 0"
        position="4 0 0"
        material="color: #4CC3D9"
      />

      {/*<!-- 参加者2 -->*/}
      <Entity
        primitive="a-box"
        width="1"
        height="2"
        depth="1"
        position="-4 0 0"
        rotation="0 0 0"
        material="color: #fcf876"
      />

      {/*<!-- 参加者3 -->*/}
      <Entity
        primitive="a-box"
        width="1"
        height="2"
        depth="1"
        position="0 0 -4"
        rotation="0 0 0"
        material="color: #ffb0b0"
      />
    </Scene>
  );
};
