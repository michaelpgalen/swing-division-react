
function TempoSlider(tempo, ...props) {
    
    const handleSliderChange = (e) => {
        props.setTempo(e.target.value);
        console.log('tempo slider changed. New value = ', e.target.value)
    };

    return (
        <input onChange={handleSliderChange}
        defaultValue={tempo} type="range" min="20" max="200" step="1" className="slider"></input>
    )
};

export default TempoSlider;