
function TempoSlider({tempo, setTempo, ...props}) {
    
    const handleSliderChange = (e) => {
        setTempo(e.target.value);
        // console.log('tempo slider changed. New value = ', e.target.value)
    };

    return (
        <input onChange={handleSliderChange}
        defaultValue={tempo} type="range" min="50" max="150" step="1" className="slider"></input>
    )
};

export default TempoSlider;