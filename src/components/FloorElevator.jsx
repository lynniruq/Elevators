import {useState} from "react";
import "../style/Box.css"

export default function FloorElevator(props) {

    return (
        <div className={'floor-container'} id={'floor'+props.floorNumber}>
            <label className={'floor-number'}>{props.floorNumber}</label>
            <div className={'box-container'} />
            <div className={'box-container'}/>
            <div className={'box-container'}/>
            <div className={'box-container'}/>
            <div className={'box-container'}/>
            <button type={"button"} className={'button-class ' + props.status}
            onClick={() => props.onFloorClick(props.status)}>
                {props.status}
            </button>

        </div>
    );
}