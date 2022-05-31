import TempoSlider from "./tempoSlider";
import TempoAdjustBtn from "./tempoAdjustBtn";

function TempoSettings(props) {

    return (
        <div className="tempo-settings">
            <TempoAdjustBtn className="adjust-tempo-btn decrease-tempo" children="-" />
            <TempoSlider tempo={props.tempo} setTempo={props.setTempo}/>
            <TempoAdjustBtn className="adjust-tempo-btn increase-tempo" children="+" />
        </div>
    )
};

export default TempoSettings;