import {useState} from "react";

let subdivisions = 9;
// 1 min = 60_000 ms
// 60_000 / bpm = duration of quarter note
// 60_000 / bpm / 4 = duration of 1/16 note
let msTempo = (60000 / props.tempo) / subdivisions;
let beatCount = 0;

function drumstToPlay() {
  // using drumTracks object
  // samba
  // subdivisions = drumTracks.samba.subdivisions;
  if (drumTracks.samba.trackMatrix[beatCount] === 1) {
    playRepique1();
  }
  beatCount++
  if (beatCount === subdivisions) {beatCount = 0}
  // console.log('beat count is', beatCount)
};

function StartMetronome() {
  beatCount = 0;
  // updateTempo();
  Samba.start();
  // console.log(bpm);
}
function StopMetronome() {
  beatCount = 0;
  Samba.stop();
}

const drumTracks = {
    samba: { 
     subdivisions: 9,  
     trackMatrix: [1,0,1, 0,1,0, 1,0,0],
     },
     drunkFunk: {
       subdivisions: 5,
       trackMatrix: [2,0,1,1,0]
     }
   };

// Add accurate timer constructor function
function Samba(drumstToPlay, msTempo) {
  // this.timeInterval is nos msTempo 
  // this.timeInterval = timeInterval;
    
    // Add method to start timer
    const start = () => {
      // Set the expected time. The moment in time we start the timer plus whatever the time interval is. 
      let expected = Date.now() + msTempo;
      // Start the timeout and save the id in a property, so we can cancel it later
      let timeout = setTimeout(round, msTempo);
      //use state hook to hold the state o the timeoutID
      // setTimeoutId(this.timeout);
      console.log('Timer Started');
    }
    // Add method to stop timer
    const stop = () => {
      clearTimeout(timeout);
      console.log('Timer Stopped');
    }
    
    // Round method that takes care of running the callback and adjusting the time
    const round = () => {
      // console.log('timeout', this.timeout);
      // The drift will be the current moment in time for this round minus the expected time.
      let drift = Date.now() - expected;
      // Run error callback if drift is greater than time interval, and if the callback is provided
      if (drift > msTempo) {
        console.log('drift error!')
      };
      drumstToPlay();
      // Increment expected time by time interval for every round after running the callback function.
      expected += msTempo;
      // console.log('Drift:', drift);
      // console.log('Next round time interval:', this.timeInterval - drift);
      // Run timeout again and set the timeInterval of the next iteration to the original time interval minus the drift.
      timeout = setTimeout(round, msTempo - drift);
    }
  }

  export default Timer;