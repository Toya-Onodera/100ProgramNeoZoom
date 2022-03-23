import { useContext, useEffect, useRef, useState } from "react";

// FabeMesh
import { MediaPipeFaceMesh } from "@tensorflow-models/face-landmarks-detection/dist/mediapipe-facemesh";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";

// Component
import { AllStreamStoreContext } from "../../pages/App";

export const useFaceMesh = () => {
  const { allStreamStore } = useContext(AllStreamStoreContext);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [model, setModel] = useState<MediaPipeFaceMesh>();

  useEffect(() => {
    if (allStreamStore.localStream && videoRef.current) {
      videoRef.current.srcObject = allStreamStore.localStream.stream;
    }
  }, [allStreamStore.localStream, videoRef.current]);

  useEffect(() => {
    (async () => {
      const _model = await faceLandmarksDetection.load(
        faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
      );

      setModel(_model);
    })();
  }, []);

  useEffect(() => {
    if (videoRef.current && model) {
      setInterval(async () => {
        const predictions = await model.estimateFaces({
          input: videoRef.current as HTMLVideoElement,
        });

        console.log(predictions);
      }, 1000);
    }
  }, [model, videoRef.current]);

  return { videoRef };
};
