import { useState } from "react";
import {Howl, Howler} from 'howler';

// Add accurate timer constructor function
function Timer(callback, timeInterval, errorCallback) {
    this.timeInterval = timeInterval;
    
    // Add method to start timer
    this.start = () => {
      // Set the expected time. The moment in time we start the timer plus whatever the time interval is. 
      this.expected = Date.now() + this.timeInterval;
      // Start the timeout and save the id in a property, so we can cancel it later
      this.timeout = setTimeout(this.round, this.timeInterval);
      console.log('Timer Started');
    }
    // Add method to stop timer
    this.stop = () => {
      clearTimeout(this.timeout);
      console.log('Timer Stopped');
    }
    
    // Round method that takes care of running the callback and adjusting the time
    this.round = () => {
      // console.log('timeout', this.timeout);
      // The drift will be the current moment in time for this round minus the expected time.
      let drift = Date.now() - this.expected;
      // Run error callback if drift is greater than time interval, and if the callback is provided
      if (drift > this.timeInterval) {
        // If error callback is provided
        if (errorCallback) {
          errorCallback();
        }
      }
      callback();
      // Increment expected time by time interval for every round after running the callback function.
      this.expected += this.timeInterval;
      // console.log('Drift:', drift);
      // console.log('Next round time interval:', this.timeInterval - drift);
      // Run timeout again and set the timeInterval of the next iteration to the original time interval minus the drift.
      this.timeout = setTimeout(this.round, this.timeInterval - drift);
    }
  };


function StartStopBtn(props) {
    const sounds = {
        click3: new Howl({
          src: 'click3.mp3'
        }),
        click4: new Howl({
          src: 'click4.mp3'
        })
      };

    let subdivisions = 9;
    // 1 min = 60_000 ms
    // 60_000 / bpm = duration of quarter note
    // 60_000 / bpm / 4 = duration of 1/16 note
    const msTempo = (60000 / props.tempo) / subdivisions;

    // create drumLoop instance of Timer metronome 
    const drumLoop = new Timer(drumstToPlay, msTempo, () => console.log('error!'));

    const [isRunning, setIsRunning] = useState(false);

    function startMetronome() {
        props.setBeatCount = 0;
        drumLoop.start();
      };
    function stopMetronome() {
        props.setBeatCount = 0;
        drumLoop.stop();
      };
    
    let buttonText = 'START';

    const handleClick = (e) => {
        if (!isRunning) {
            startMetronome();
            buttonText = 'STOP';
            setIsRunning(true);
          } else if (isRunning) {
            stopMetronome();
            buttonText = 'START';
            setIsRunning(false);
          };
    };

    const drumTracks = {
        samba: { 
         subdivisions: 9,  
         trackMatrix: [2,0,1, 0,1,0, 2,0,0],
         },
         drunkFunk: {
           subdivisions: 5,
           trackMatrix: [2,0,1,1,0]
         }
       };
       
    function drumstToPlay() {
         // using drumTracks object
         // samba
         if (props.rhythm === 'samba') {
           subdivisions = drumTracks.samba.subdivisions;
           if (drumTracks.samba.trackMatrix[props.beatCount] === 1) {
             sounds.click3.play();
           }
           if (drumTracks.samba.trackMatrix[props.beatCount] === 2) {
             sounds.click4.play();
           }
         }
         // drunkFunk
         if (props.rhythm === 'drunkFunk') {
           subdivisions = drumTracks.drunkFunk.subdivisions;
           if (drumTracks.drunkFunk.trackMatrix[props.beatCount] === 1) {
             sounds.click3.play();
           }
           if (drumTracks.drunkFunk.trackMatrix[props.beatCount] === 2) {
             sounds.click4.play();
           }
         }  
         props.setBeatCount = (props.beatCount++)
         if (props.beatCount === subdivisions) {props.setBeatCount = 0}
         // console.log('beat count is', beatCount)
       };

    return (
        <div 
        onClick={handleClick}
        className="start-stop">
            {buttonText}
        </div>
    )
};

export default StartStopBtn;