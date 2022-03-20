import "aframe";
import React from "react";
import { Scene } from "aframe-react";

// Components
import { ASky } from "../../atoms/ASky";
import { ALight } from "../../atoms/ALight";
import { ACamera } from "../../atoms/ACamera";
import { ATable } from "../../atoms/ATable";
import { AVideoPeople } from "../../molecules/AVideoPeople";

// Hooks
import { useStreamingVideoChatHooks } from "./hooks";

export const StreamingVideoChat: React.VFC = () => {
  // FIXME: ここは stream を動的に表示する処理に変更する
  const { multiVideoSources } = useStreamingVideoChatHooks();

  return (
    <Scene
      stats
      vr-mode-ui="enabled: false"
      light="defaultLightsEnabled: false"
    >
      <ASky material="color: #cccccc" />
      <ALight color="#FFFFFF" intensity="1.5" position="0 5 0" />

      <ATable
        color="#060"
        radius="3"
        height="0.5"
        position="0 -1 0"
        rotation="0 0 0"
      />

      {/* 自身の視点 */}
      <ACamera
        position="0 2 5"
        cursorVisible="true"
        cursorScale="2"
        cursorColor="#0095DD"
        cursorOpacity="0.5"
      />

      {multiVideoSources &&
        multiVideoSources.map((videoSource, i) => (
          <AVideoPeople
            key={`AVideoPeople-${i}`}
            source={videoSource}
            width="1"
            height="2"
            depth="1"
            position={videoSource.position}
            rotation={videoSource.rotation}
            material="color: #ffb0b0"
            scale="3 3 3"
          />
        ))}
    </Scene>
  );
};
