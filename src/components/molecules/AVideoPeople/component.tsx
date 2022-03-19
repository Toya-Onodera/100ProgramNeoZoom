import React, { useMemo } from "react";

// Components
import { AVideo, VideoSource } from "../AVideo";
import { APeople } from "../../atoms/APeople";

type Props = {
  source: VideoSource;
  width: string;
  height: string;
  position: string;
  depth: string;
  material: string;
  rotation: string;
  scale: string;
};

const splitStrCoordinate = (str: string): number[] =>
  str.split(" ").map((str) => parseInt(str));

export const AVideoPeople: React.VFC<Props> = ({
  source,
  height,
  position,
  width,
  rotation,
  scale,
  depth,
  material,
}) => {
  // FIXME: ThreeScreenVideo で使用する Props を無理やり加工してカメラ映像の位置を設定している
  // 最終的には平面にカメラを描画ではなく、立方体に描画するほうが良さそう
  const videoPlacement = useMemo(() => {
    const [positionX, positionY, positionZ] = splitStrCoordinate(position);
    const [rotationX, rotationY, rotationZ] = splitStrCoordinate(rotation);

    const theta = 5 * (Math.PI / 180);
    const phi = rotationY * (Math.PI / 180);
    const radius = 2.7;

    // 極座標変換を行っている
    // ただし、算出される値はカメラ原点 [0, 0, 0] の値なので人形の座標を入れて値を作る
    const [polarX, polarY, polarZ] = [
      radius * Math.sin(theta) * Math.sin(phi) + positionX,
      radius * Math.cos(theta) + positionY,
      radius * Math.sin(theta) * Math.cos(phi) + positionZ,
    ];

    return {
      ...source,
      rotation: rotation,
      position: `${polarX} ${polarY} ${polarZ}`,
    };
  }, [source, position, rotation]);

  return (
    <>
      <AVideo source={videoPlacement} />
      <APeople
        width={width}
        height={height}
        depth={depth}
        rotation={rotation}
        material={material}
        position={position}
        scale={scale}
      />
    </>
  );
};
