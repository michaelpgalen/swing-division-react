import { Children } from 'react';
import { useState } from 'react';
import './App.css';
import 'https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js';
import OutputDisplay from './Components/outputDisplay';
import UserInputs from './Components/userInputs';


function App() {
  const [tempo, setTempo] = useState(100);

  return (
    <div className='metronome'>
      <OutputDisplay tempo={tempo}/>
      <UserInputs tempo={tempo} setTempo={setTempo}/>
    </div>
  );
}

export default App;
