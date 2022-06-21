function TempoAdjustBtn({tempo, setTempo, className, text}) {
    
    const handleClick = (e) => {
        if (text === '+') {
            setTempo(tempo+1);
        };
        if (text === '-') {
            setTempo(tempo-1);
        };
        console.log(text)
    };

    return (
        <div onClick={handleClick} className={className} children={text}></div>
    )
};

export default TempoAdjustBtn;