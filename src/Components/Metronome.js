// this script is not used. It was an experiment from a new tutorial

import { useEffect, useState } from "react";
import repique1 from "./repique1.mp3";
import repique2 from "./repique2.mp3";
import repique3 from "./repique3.mp3";
import repique4 from "./repique4.mp3";

const FIRST_BEAT = 1;
const DEFAULT_BPM = 60;
const DEFAULT_BEATS_PER_MEASURE = 4;

export const useMetronome = (
  initialBpm = DEFAULT_BPM,
  initialTickSounds = [repique1, repique2, repique3, repique4]
) => {
  const [isTicking, setIsTicking] = useState(false);
  const [bpm, setBpm] = useState(initialBpm);

  const [sounds, setSounds] = useState(initialTickSounds);

  const startMetronome = () => {
    setIsTicking(true);
  };

  const stopMetronome = () => {
    setIsTicking(false);
  };

  useEffect(() => {
    let interval;
    let beat = 1;
    const repique1 = new Audio(sounds[0]);
    const repique2 = new Audio(sounds[1]);
    const repique3 = new Audio(sounds[2]);
    const repique4 = new Audio(sounds[3]);

    const resetSounds = () => {
        repique1.pause();
        repique1.currentTime = 0;
        repique2.pause();
        repique2.currentTime = 0;
        repique3.pause();
        repique3.currentTime = 0;
        repique4.pause();
        repique4.currentTime = 0;
    };
    const tick = () => {
      resetSounds();
      if (beat === FIRST_BEAT) {
        repique1.play();
        console.log("repique1");
      }
      if (beat === 20) {repique2.play();}
      if (beat === 35) {repique3.play();} 
      if (beat === 53) {repique4.play();}

      if (beat === 80) {
        beat = FIRST_BEAT;
      } else {
        beat++;
      }
    };

    if (isTicking) {
      tick();
      interval = setInterval(tick, (60 / bpm / 80) * 1000);
    }

    return () => clearInterval(interval);
  }, [isTicking, bpm, sounds]);

  return {
    startMetronome,
    stopMetronome,
    isTicking,
    setBpm,
    bpm,
    setSounds
  };
};
