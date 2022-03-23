import React from "react";
import styled from "styled-components";

// Hooks
import { useFaceMesh } from "./hooks";

export const FaceMesh: React.VFC = () => {
  const { videoRef } = useFaceMesh();

  return <Wrapper ref={videoRef} aria-hidden="true" autoPlay playsInline />;
};

const Wrapper = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  transform: scaleX(-1);
  visibility: hidden;
  pointer-events: none;
`;
