"use client";
import { useEffect, useState } from "react";

export default function Recorder() {
  const [currentVolume, setCurrentVolume] = useState<number>(0);
  const [volumes, setVolumes] = useState<number[]>([]);

  useEffect(() => {
    const startRecording = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      const audioContext = new AudioContext();
      const mediaStreamAudioSourceNode =
        audioContext.createMediaStreamSource(stream);
      const analyserNode = audioContext.createAnalyser();
      mediaStreamAudioSourceNode.connect(analyserNode);

      const pcmData = new Float32Array(analyserNode.fftSize);
      const onFrame = () => {
        analyserNode.getFloatTimeDomainData(pcmData);
        let sumSquares = 0.0;
        for (const amplitude of pcmData) {
          sumSquares += amplitude * amplitude;
        }
        const value = Math.sqrt(sumSquares / pcmData.length);

        const volume = Math.round(value * 100);

        setCurrentVolume(volume);
        setVolumes((prev) => {
          const newVolumes = prev.slice(0, 200);
          newVolumes.unshift(volume);
          return newVolumes;
        });

        window.requestAnimationFrame(onFrame);
      };
      window.requestAnimationFrame(onFrame);
    };
    startRecording();
  }, [setCurrentVolume, setVolumes]);

  return (
    <div className="flex">
      <div className="flex-1">
        <div className="text-black">loudness: {currentVolume}</div>
      </div>
      <div className="flex-1">
        <div className="h-[100px] w-[200px] relative bg-green-500">
          {volumes.map((volume, index) => (
            <div
              key={index}
              style={{
                left: `${index}px`,
                bottom: `${volume}px`,
              }}
              className={`absolute d h-2 w-2 rounded bg-red-400`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
