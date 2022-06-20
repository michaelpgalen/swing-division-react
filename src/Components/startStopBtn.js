import { useEffect, useState, useRef } from "react";
import repique1 from  "./sounds/repique1.mp3";
import repique2 from  "./sounds/repique2.mp3";
import repique3 from  "./sounds/repique3.mp3";
import repique4 from  "./sounds/repique4.mp3";
import cabasa from  "./sounds/cabasa.wav";
import clap from  "./sounds/clap.wav";
import kickCabasa from  "./sounds/kickCabasa.wav";

function StartStopBtn(props) {

  // 1 min = 60_000 ms
  // 60_000 / bpm = duration of quarter note
  // 60_000 / bpm / 4 = duration of 1/16 note
  const subdivisions = props.subdivisions;
  let msTempo = (60000 / props.tempo) / subdivisions;
  let beatCount = 0;
  let measure = 0;

  const playRepique1 = () => {
    new Audio(repique1).play();
  };
  const playRepique2 = () => {
    new Audio(repique2).play();
  };
  const playRepique3 = () => {
    new Audio(repique3).play();
  };
  const playRepique4 = () => {
    new Audio(repique4).play();
  };
  const playCabasa = () => {
    new Audio(cabasa).play();
  };
  const playClap = () => {
    new Audio(clap).play();
  };
  const playKickCabasa = () => {
    new Audio(kickCabasa).play();
  };

  const drumTracks = {
    samba: { 
      subdivisions: 80,
      trackMatrix: [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,2, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,3, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,4,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0]
    },
    drunkFunk: {
      subdivisions: 5,
      trackMatrix: {
        m0:[3,0,1,1,0],
        m1:[2,0,1,1,0]
      }
    }
  };

  const [isRunning, setIsRunning] = useState(false);

  let expected;

  useEffect(() => {
    let timeout;

    // Round method that takes care of running the callback and adjusting the time
    const round = () => {
      console.log('round started');
      // The drift will be the current moment in time for this round minus the expected time.
      let drift = Date.now() - expected;
      // Run error callback if drift is greater than time interval, and if the callback is provided
      if (drift > msTempo) {
        console.log('drift error!')
      };
      drumstToPlay();
      // Increment expected time by time interval for every round after running the callback function.
      expected += msTempo;
      // Run timeout again and set the timeInterval of the next iteration to the original time interval minus the drift.
      timeout = setTimeout(round, msTempo - drift);
    };

    // Add method to start timer
    if (isRunning) {
      // Set the expected time. The moment in time we start the timer plus whatever the time interval is. 
      expected = Date.now() + msTempo;
      // Start the timeout and save the id in a property, so we can cancel it later
      timeout = setTimeout(round, msTempo);
      console.log('Timer Started');
    };
    // Add method to stop timer
    if (!isRunning) {
      console.log('Timer Stopped');
    };

    console.log('subdivisions:', subdivisions);
    console.log('msTempo: ', msTempo);

    return () => clearTimeout(timeout);
  }, [isRunning, subdivisions, msTempo, beatCount]);
 
  function drumstToPlay() {
    if (props.rhythm === 'samba') {
      // subdivisions = drumTracks.samba.subdivisions;
      if (drumTracks.samba.trackMatrix[beatCount] === 1) {
        playRepique1();
      };
      if (drumTracks.samba.trackMatrix[beatCount] === 2) {
        playRepique2();
      };
      if (drumTracks.samba.trackMatrix[beatCount] === 3) {
        playRepique3();
      };
      if (drumTracks.samba.trackMatrix[beatCount] === 4) {
        playRepique4();
      };
    }
    // drunkFunk
    if (props.rhythm === 'drunkFunk') {
      // subdivisions = drumTracks.drunkFunk.subdivisions;
      if (measure === 0) {
        if (drumTracks.drunkFunk.trackMatrix.m0[beatCount] === 1) {
          playCabasa();
        };
        if (drumTracks.drunkFunk.trackMatrix.m0[beatCount] === 2) {
          playClap();
        };
        if (drumTracks.drunkFunk.trackMatrix.m0[beatCount] === 3) {
          playKickCabasa();
        }
      }
      if (measure === 1) {
        if (drumTracks.drunkFunk.trackMatrix.m1[beatCount] === 1) {
          playCabasa();
        };
        if (drumTracks.drunkFunk.trackMatrix.m1[beatCount] === 2) {
          playClap();
        };
        if (drumTracks.drunkFunk.trackMatrix.m1[beatCount] === 3) {
          playKickCabasa();
        }
      }  
    }
    console.log('drumsToPlay ran');
    beatCount++
    measure++
    if (beatCount === subdivisions) {beatCount = 0}
    if (measure === 2) {measure = 0}
    // console.log('beat count is', beatCount)
  };

  const handleClick = (e) => {
    if (isRunning) {
      console.log('clicked stop');
      setIsRunning(!isRunning);
    } else {
      console.log('clicked start');
      setIsRunning(!isRunning);
      };
  };
  
  return (
      <div 
      onClick={handleClick}
      className="start-stop"
      children={isRunning ? 'STOP' : 'START'}>
      </div>
  )
};

export default StartStopBtn;