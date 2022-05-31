function RhythmSelector(props) {
    const handleSelectionChange = (e) => {
        props.setRhythm(e.target.value);
        // props.setBeatCount = 0;
        console.log('rhythm selector onChange handled')
        console.log(e.target.value)
    };

    return (
        <div className="rhythms">
            <select onChange={handleSelectionChange} name="rhythmSelector" id="rhythmSelector">
                <option value="samba">Samba</option>
                <option value="drunkFunk">Drunk Funk</option>
            </select>
        </div>
    )
};

export default RhythmSelector;