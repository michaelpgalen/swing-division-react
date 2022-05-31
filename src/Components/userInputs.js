import { useState } from "react";
import TempoSettings from "./tempoSettings";
import StartStopBtn from "./startStopBtn_scratch";
import RhythmSelector from "./rhythmSelector";

function UserInputs(props) {
    const [beatCount, setBeatCount] = useState(0);
    const [rhythm, setRhythm] = useState('samba');
    console.log('Rhythm Logged from UserInputs:', rhythm)

    return (
        <div className="userInputs">
            <TempoSettings tempo={props.tempo} setTempo={props.setTempo} />
            <StartStopBtn children='Start' setBeatCount={setBeatCount} beatCount={beatCount} rhythm={rhythm} tempo={props.tempo} />
            <RhythmSelector setRhythm={setRhythm} beatCount={setBeatCount} />
        </div>
    )
};

export default UserInputs;