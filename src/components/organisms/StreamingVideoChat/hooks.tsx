import { useContext, useMemo } from "react";

import { AVideoProps } from "../../atoms/AVideoSource";
import { AVideoStreamProps } from "../../atoms/AVideoStream";

// Contexts
import { StreamInfo, AllStreamStoreContext } from "../../pages/App";
import { SEAT_NUMBERS } from "../../../constants/SEAT_NUMBERS";

export const useStreamingVideoChatHooks = () => {
  const { allStreamStore } = useContext(AllStreamStoreContext);

  const multiVideoSources = useMemo<(AVideoProps | AVideoStreamProps)[]>(() => {
    // 自身席が決まるまではビデオを表示する必要がない
    if (allStreamStore.localStream?.seat) {
      const videoWidth = "4";
      const videoHeight = "2.25";
      const positions = ["-4 0 0", "0 0 -4", "4 0 0"];
      const rotations = ["0 45 0", "0 0 0", "0 -45 0"];

      // MEMO: Null にはならないが、コンパイルエラーが発生してしまっている
      // @ts-ignore
      const { seat: targetPosition }: { seat: number } =
        allStreamStore.localStream;

      // seat の値が格納されている座席のみに配置を行う
      const seatSeatStreams = allStreamStore.otherStream.filter(
        (e): e is Required<StreamInfo> => Boolean(e.seat)
      );

      //console.log(seatSeatStreams);
      // TODO: roomID を取得したら seat を Firebase から取得する動作を実装する必要がある

      // 自分の位置を手前中央とし、他のユーザの配置順を決める
      const positionSawFromMe = [1, 2, 3]
        .map((n) => {
          const position = targetPosition + n;
          return position <= SEAT_NUMBERS.HOUR
            ? position
            : position - SEAT_NUMBERS.HOUR;
        })
        .filter((n) =>
          seatSeatStreams.some(({ seat }) => {
            return n === seat;
          })
        );

      // const correctionCoordinates = positionSawFromMe.map(
      //   (positionNumber, i) => {
      //     return {
      //       src: allStreamStore.otherStream.find(
      //         ({ seat }) => seat === positionNumber
      //       ).stream,
      //       positions: positions[i],
      //       rotations: rotations[i],
      //     };
      //   }
      // );

      // @ts-ignore
      return allStreamStore.otherStream
        .filter((e): e is Required<StreamInfo> => Boolean(e.seat))
        .map((streamInfo, i) => {
          return {
            src: streamInfo ? streamInfo?.stream : null,
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
