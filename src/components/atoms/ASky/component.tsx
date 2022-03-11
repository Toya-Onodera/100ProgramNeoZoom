import "aframe";
import React from "react";
import { Entity } from "aframe-react";

type Props = {
  material: string;
};

export const ASky: React.VFC<Props> = ({ material }) => (
  <Entity primitive="a-sky" material={material} />
);
