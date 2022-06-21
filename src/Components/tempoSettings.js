import TempoSlider from "./tempoSlider";
import TempoAdjustBtn from "./tempoAdjustBtn";

function TempoSettings(props) {

    return (
        <div className="tempo-settings">
            <TempoAdjustBtn tempo={props.tempo} setTempo={props.setTempo} className="adjust-tempo-btn decrease-tempo" text="-" />
            <TempoSlider tempo={props.tempo} setTempo={props.setTempo}/>
            <TempoAdjustBtn tempo={props.tempo} setTempo={props.setTempo} className="adjust-tempo-btn increase-tempo" text="+" />
        </div>
    )
};

export default TempoSettings;