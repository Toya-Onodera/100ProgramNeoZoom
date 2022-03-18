import "aframe";
import React, { useContext } from "react";
import { Scene } from "aframe-react";

// Components
import { ASky } from "../../atoms/ASky";
import { ACamera } from "../../atoms/ACamera";
import { ATable } from "../../atoms/ATable";
import { APeople } from "../../atoms/APeople";
import { ThreeScreenVideo } from "../../molecules/ThreeScreenVideo";

// Hooks
import { useStreamingVideoChatHooks } from "./hooks";

// Contexts
import { AllStreamStoreContext } from "../../pages/App";

export const StreamingVideoChat: React.VFC = () => {
  // const allStreamStore = useContext(AllStreamStoreContext);

  // FIXME: ここは stream を動的に表示する処理に変更する
  // const { threeVideoSources } = useStreamingVideoChatHooks(allStreamStore);

  return (
    <Scene>
      <ASky material="color: #cccccc" />
      {/*<ThreeScreenVideo sources={threeVideoSources} />*/}

      <ATable
        color="#060"
        radius="3"
        height="0.5"
        position="0 -1 0"
        rotation="0 0 0"
      />

      {/* 自身の視点 */}
      <ACamera
        position="0 1 4"
        cursorVisible="true"
        cursorScale="2"
        cursorColor="#0095DD"
        cursorOpacity="0.5"
      />

      {/*<!-- 参加者1 -->*/}
      <APeople
        width="1"
        height="2"
        depth="1"
        position="0 0 -4"
        rotation="0 0 0"
        material="color: #ffb0b0"
        scale="3 3 3"
      />

      {/*<!-- 参加者2 -->*/}
      <APeople
        width="1"
        height="2"
        depth="1"
        position="-4 0 0"
        rotation="0 90 0"
        material="color: #fcf876"
        scale="3 3 3"
      />

      {/*<!-- 参加者3 -->*/}
      <APeople
        width="3"
        height="5"
        depth="1"
        rotation="0 -90 0"
        position="4 0 0"
        material="color: #4CC3D9"
        scale="3 3 3"
      />
    </Scene>
  );
};
