import { Children } from 'react';
import './App.css';
import Timer from './Timer.js';
import 'https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js';

function Metronome(props) {

const tempoDisplay = document.querySelector('.tempo');
const tempoText = document.querySelector('.tempo-text');
const decreaseTempoBtn = document.querySelector('.decrease-tempo');
const increaseTempoBtn = document.querySelector('.increase-tempo');
const tempoSlider = document.querySelector('.slider');
const startStopBtn = document.querySelector('.start-stop');
const rhythmSelector = document.querySelector('#rhythmSelector');

const sounds = {
  click3: new Howl({
    src: 'click3.mp3'
  }),
  click4: new Howl({
    src: 'click4.mp3'
  })
}

// 1 min = 60_000 ms
// 60_000 / bpm = duration of quarter note
// 60_000 / bpm / 4 = duration of 1/16 note
let bpm = 100; 
let subdivisions = rhythmSelector.value;
let msTempo = (60000 / bpm) / subdivisions;
let beatCount = 0;

let tempoTextString = 'medium';

// update metronome tempo settings
function updateTempo() {
  if (rhythmSelector.value === 'samba') {
    subdivisions = drumTracks.samba.subdivisions;
  }
  if (rhythmSelector.value === 'drunkFunk') {
    subdivisions = drumTracks.drunkFunk.subdivisions;
  }
  tempoDisplay.textContent = bpm;
  // tempoDisplay.textContent = tempoSlider.value;
  drumLoop.timeInterval = (60000 / bpm) / subdivisions;
  tempoSlider.value = bpm;
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
 }

 function drumstToPlay() {
  // using drumTracks object
  // samba
  if (rhythmSelector.value === 'samba') {
    subdivisions = drumTracks.samba.subdivisions;
    if (drumTracks.samba.trackMatrix[beatCount] === 1) {
      sounds.click3.play();
    }
    if (drumTracks.samba.trackMatrix[beatCount] === 2) {
      sounds.click4.play();
    }
  }
  // drunkFunk
  if (rhythmSelector.value === 'drunkFunk') {
    subdivisions = drumTracks.drunkFunk.subdivisions;
    if (drumTracks.drunkFunk.trackMatrix[beatCount] === 1) {
      sounds.click3.play();
    }
    if (drumTracks.drunkFunk.trackMatrix[beatCount] === 2) {
      sounds.click4.play();
    }
  }  
  beatCount++
  if (beatCount === subdivisions) {beatCount = 0}
  // console.log('beat count is', beatCount)
}

const handleSlider = () => {
  bpm = tempoSlider.value;
  updateTempo();
}

const handleDecreaseTempo = () => {
  if (bpm <= 20) { return };
  bpm--;
  updateTempo();
}

const handleIncreaseTempo = () => {
  if (bpm >= 200) { return };
  bpm++;
  updateTempo();
};

const handleRhythmSelector = () => {
  beatCount = 0;
  updateTempo();
};

// const handleStartStop = () => {
//   if (!isRunning) {
//     startMetronome();
//     startStopBtn.textContent = 'STOP';
//     isRunning = true;
//   } else if (isRunning) {
//     stopMetronome();
//     startStopBtn.textContent = 'START';
//     isRunning = false;
//   }
// };





  return (
    <div className='metronome'>
      <div className="bpm-display">
        <span className="tempo">100</span>
        <span className="bpm">BPM</span>
      </div>
      <div className="tempo-text">Medium</div>
      <div className='tempo-settings'>
        <div onClick={handleDecreaseTempo} className='adjust-tempo-btn decrease-tempo'>-</div>
        <input onInput={handleSlider} type="range" min="20" max="200" step="1" className="slider"/>
        <div onClick={handleIncreaseTempo} className='adjust-tempo-btn increase-tempo'>+</div>
      </div>
      <StartStopBtn />
      <div onClick={handleStartStop} className="start-stop">START</div>
      <div className="rhythms">
          <select onChange={handleRhythmSelector} name="rhythmSelector" id="rhythmSelector">
              <option value="samba">Samba</option>
              <option value="drunkFunk">Drunk Funk</option>
          </select>
      </div>
    </div>
  )
}

function startMetronome() {
  beatCount = 0;
  updateTempo();
  drumLoop.start();
}
function stopMetronome() {
  beatCount = 0;
  drumLoop.stop();
};
const drumLoop = new Timer(drumstToPlay, msTempo, () => console.log('error!')
);

function StartStopBtn(text, ...props) {
  let isRunning = false;

  const handleStartStop = () => {
    if (!isRunning) {
      startMetronome();
      text = 'STOP';
      isRunning = true;
    } else if (isRunning) {
      stopMetronome();
      text = 'START';
      isRunning = false;
    };
  };
  return (
    <div onClick={handleStartStop} className="start-stop" >{text}</div>
  )
}

function App() {
  return (
    <div className='container'>
      <Metronome />
    </div>
  );
}

export default App;
