import "aframe";
import React from "react";
import { Scene } from "aframe-react";

import { ASky } from "../../atoms/ASky";
import { ThreeScreenVideo } from "../../molecules/ThreeScreenVideo";
import { useAppHooks } from "./hooks";

export const App = () => {
  const { threeVideoSources } = useAppHooks();

  return (
    <Scene>
      <ASky material="color: #cccccc" />
      <ThreeScreenVideo sources={threeVideoSources} />
    </Scene>
  );
};
