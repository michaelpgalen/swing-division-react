import BpmDisplay from "./bpmDisplay";
import TempoText from "./tempoText";

function OutputDisplay(props) {

    return (
        <div>
            <BpmDisplay tempo={props.tempo} />
            <TempoText />
        </div>
    )
};

export default OutputDisplay;