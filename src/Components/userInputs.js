import { useState } from "react";
import TempoSettings from "./tempoSettings";
import StartStopBtn from "./startStopBtn";
import RhythmSelector from "./rhythmSelector";

function UserInputs(props) {
    const [beatCount, setBeatCount] = useState(0);
    const [rhythm, setRhythm] = useState('samba');
    let subdivisions = (rhythm === 'samba') ? 80 : 5;

    return (
        <div className="userInputs">
            <TempoSettings tempo={props.tempo} setTempo={props.setTempo} />
            <StartStopBtn children='Start' setBeatCount={setBeatCount} beatCount={beatCount} rhythm={rhythm} tempo={props.tempo} subdivisions={subdivisions} />
            <RhythmSelector setRhythm={setRhythm} beatCount={setBeatCount} />
        </div>
    )
};

export default UserInputs;