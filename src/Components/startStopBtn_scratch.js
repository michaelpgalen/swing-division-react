import { useEffect, useState } from "react";
// import repique1 from "./repique1.mp3";
// import repique2 from "./repique2.mp3";
// import repique3 from "./repique3.mp3";
// import repique4 from "./repique4.mp3";
// import {Howl, Howler} from 'howler';

function StartStopBtn(props) {
  const repique1 = new Audio('./repique1.mp3');

    let subdivisions = 80;
    // 1 min = 60_000 ms
    // 60_000 / bpm = duration of quarter note
    // 60_000 / bpm / 4 = duration of 1/16 note
    // const msTempo = (60000 / props.tempo) / subdivisions;

    const [isRunning, setIsRunning] = useState(false);

    let buttonText = 'START';

    const handleClick = (e) => {
        if (!isRunning) {
            // startMetronome();
            console.log('metronome started');
            repique1.play();
            buttonText = 'STOP';
            setIsRunning(true);
          } else if (isRunning) {
            // stopMetronome();
            console.log('metronome stopped');
            buttonText = 'START';
            setIsRunning(false);
          };
    };

    // const drumTracks = {
    //     samba: { 
    //      subdivisions: 9,  
    //      trackMatrix: [2,0,1, 0,1,0, 2,0,0],
    //      },
    //      drunkFunk: {
    //        subdivisions: 5,
    //        trackMatrix: [2,0,1,1,0]
    //      }
    //    };
       
        // function metronome(callback, msTempo, options) {
        //   const start = () {
        //     // start metronome. 
        //   };
        // }

    // function drumstToPlay() {
    //      // using drumTracks object
    //      // samba
    //      if (props.rhythm === 'samba') {
    //        subdivisions = drumTracks.samba.subdivisions;
    //        if (drumTracks.samba.trackMatrix[props.beatCount] === 1) {
    //          sounds.click3.play();
    //        }
    //        if (drumTracks.samba.trackMatrix[props.beatCount] === 2) {
    //          sounds.click4.play();
    //        }
    //      }
    //      // drunkFunk
    //      if (props.rhythm === 'drunkFunk') {
    //        subdivisions = drumTracks.drunkFunk.subdivisions;
    //        if (drumTracks.drunkFunk.trackMatrix[props.beatCount] === 1) {
    //          sounds.click3.play();
    //        }
    //        if (drumTracks.drunkFunk.trackMatrix[props.beatCount] === 2) {
    //          sounds.click4.play();
    //        }
    //      }  
    //      props.setBeatCount = (props.beatCount++)
    //      if (props.beatCount === subdivisions) {props.setBeatCount = 0}
    //      // console.log('beat count is', beatCount)
    //    };

    return (
        <div 
        onClick={handleClick}
        className="start-stop">
            {buttonText}
        </div>
    )
};

export default StartStopBtn;