
export default function  Main(props) {



    return(
        <div className={'container'}>
            <p>Please select number of floors and number of elevators</p>
            <label>Floors</label>
            <input type="number" id="tentacles" name="tentacles"
                   className={'button-class-main'}
                   min="3" max="100" onChange={(e) => props.onChange(e,'Floor')}/>
            <label>Elevators</label>
            <input type="number" id="tentacles" name="tentacles"
                   className={'button-class-main'}
                   min="1" max="100" onChange={(e) => props.onChange(e,'Elevator')}/>
            <button type={"button"} className={'button-class-main button-main'}
                    onClick={() => props.onClick()}>
                Submit
            </button>
        </div>
    );
}