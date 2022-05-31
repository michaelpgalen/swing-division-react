import { useState } from "react";
import {Howl, Howler} from 'howler';
import { useMetronome } from "./Metronome";


function StartStopBtn(props) {
  let bpm = props.tempo;
  let currentBeat = 1;
  let subdivisions = 80;
  const [isTicking, setIsTicking] = useState(false)

  const repique1 = new Audio('./repique1.mp3');
  const repique2 = new Audio('./repique2.mp3');
  const repique3 = new Audio('./repique3.mp3');
  const repique4 = new Audio('./repique4.mp3');

  const tick = () => {
    if (currentBeat === 1) {
      repique1.play();
    }
    if (currentBeat === 20) {
      repique2.play();
    }
    if (currentBeat === 35) {
      repique3.play();
    }
    if (currentBeat === 53) {
      repique4.play();
    }
    currentBeat++;
    if (currentBeat === 81) {
      currentBeat = 1;
    }
  }

  const timerID = () => {
    setTimeout(() => {
    tick();
    timerID()},
    (60 / bpm / subdivisions) * 80)
  };

  const startMetronome = () => {
    timerID();
    setIsTicking(true);
    console.log('metronome started')
  }

  const stopMetronome  = () => {
    clearTimeout(timerID);
    setIsTicking(false);
    currentBeat = 1;
  }

    return (
        <div 
        onClick={isTicking ? stopMetronome : startMetronome}
        className="start-stop">
            {isTicking ? "STOP" : "START"}
        </div>
    )
};

export default StartStopBtn;