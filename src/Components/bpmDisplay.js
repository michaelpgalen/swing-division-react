function BpmDisplay(props) {

    return (
        <div className="bpm-display">
            <span className="tempo">{props.tempo}</span>
            <span className="bpm">BPM</span>
        </div>
    )
};

export default BpmDisplay;