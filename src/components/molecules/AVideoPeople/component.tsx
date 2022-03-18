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

    return {
      ...source,
      rotation: rotation,
      position: `${positionX} ${positionY + 2} ${positionZ}`,
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
