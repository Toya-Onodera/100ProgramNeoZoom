import { useContext, useMemo } from "react";

import { AVideoProps } from "../../atoms/AVideoSource";
import { AVideoStreamProps } from "../../atoms/AVideoStream";

// Contexts
import { AllStreamStoreContext } from "../../pages/App";
import { SEAT_NUMBERS } from "../../../constants/SEAT_NUMBERS";

export const useStreamingVideoChatHooks = () => {
  const { allStreamStore } = useContext(AllStreamStoreContext);

  // SkyWay で取得した Stream 及び、人型オブジェクトを座標を調整する部分
  const multiVideoSources = useMemo<(AVideoProps | AVideoStreamProps)[]>(() => {
    // 自身席が決まるまではビデオを表示する必要がない
    if (allStreamStore.localStream?.seat) {
      const videoWidth = "4";
      const videoHeight = "2.25";
      const positions = ["-4 0 0", "0 0 -4", "4 0 0"];
      const rotations = ["0 90 0", "0 0 0", "0 -90 0"];

      // MEMO: Null にはならないが、コンパイルエラーが発生してしまっている
      // @ts-ignore
      const { seat: targetPosition }: { seat: number } =
        allStreamStore.localStream;

      // 自分の位置を手前中央とし、他のユーザの配置順を決める
      const positionSawFromMe = [1, 2, 3].map((n) => {
        const position = targetPosition + n;
        return position <= SEAT_NUMBERS.HOUR
          ? position
          : position - SEAT_NUMBERS.HOUR;
      });

      // 接続していない場所は黒映像を流す
      return positionSawFromMe
        .map((n) => {
          return (
            allStreamStore.otherStream.find(({ seat }) => n === seat) || {
              stream: null,
            }
          );
        })
        .map((streamInfo, i) => {
          return {
            src: streamInfo.stream,
            position: positions[i],
            rotation: rotations[i],
            width: videoWidth,
            height: videoHeight,
          };
        });
    }

    return [];
  }, [allStreamStore]);

  return { multiVideoSources };
};
