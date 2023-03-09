import {useEffect, useState} from "react";
import "../style/Box.css"
import FloorElevator from "../components/FloorElevator";
import ElevatorDefault from "../components/ElevatorDefault";
import Elevator from "../view/Elevator";

export default function ElevatorView() {
    const [status0, setStatus0] = useState('Call');
    const [status1, setStatus1] = useState('Call');
    const [status2, setStatus2] = useState('Call');
    const [status3, setStatus3] = useState('Call');
    const [status4, setStatus4] = useState('Call');
    const [status5, setStatus5] = useState('Call');
    const [status6, setStatus6] = useState('Call');
    const [status7, setStatus7] = useState('Call');
    const [status8, setStatus8] = useState('Call');
    const [status9, setStatus9] = useState('Call');
    const url = "https://tonejs.github.io/audio/berklee/gong_1.mp3";
    const audio = new Audio(url);
    const [elevators, setElevators] = useState([{
        elevatorID: 1,
        currentFloor: 0,
        status: 'available',
        destinationFloor: null,
        queue: [],
        translate:-70,
        left:'190px',
        color:'#000000',
        animationName:''

    }, {
        elevatorID: 2,
        currentFloor: 0,
        status: 'available',
        destinationFloor: null,
        queue: [],
        translate:-70,
        left:"350px",
        color:'#000000',
        animationName:''
    }, {
        elevatorID: 3,
        currentFloor: 0,
        status: 'available',
        destinationFloor: null,
        queue: [],
        translate:-70,
        left:"510px",
        color:'#000000',
        animationName:''
    }, {
        elevatorID: 4,
        currentFloor: 0,
        status: 'available',
        destinationFloor: null,
        queue: [],
        translate:-70,
        left:'670px',
        color:'#000000',
        animationName:''
    }, {
        elevatorID: 5,
        currentFloor: 0,
        status: 'available',
        destinationFloor: null,
        queue: [],
        translate:-70,
        left:'840px',
        color:'#000000',
        animationName:''
    }]);


    const onFloorClick = async (floorStatus, set, floorNumber) => {
        if (floorStatus !== 'Waiting' || floorStatus !== 'Arrived') {
            set("Waiting")
            let elevator = receiveFloorCall(floorNumber)
            let index = elevators.findIndex((element) => element.elevatorID === elevator.elevatorID)
            elevator.color = '#ff0000';
            elevators[index] = elevator
            setElevators(elevators);
            if (elevator) {
                await moveElevator(elevator, set)
            }
        }

    }
    const receiveFloorCall = (floor) => {
        let minDistance = Infinity;
        let closestElevator = null;

        for (let i = 0; i < elevators.length; i++) {
            const distance = Math.abs(elevators[i].currentFloor - floor);
            if (distance < minDistance && elevators[i].status === 'available') {
                minDistance = distance;
                closestElevator = elevators[i];
            }
        }

        if (closestElevator === null) {
            elevators[0].queue.push(floor);
            return;
        }
        let index = elevators.findIndex((element) => element.elevatorID === closestElevator.elevatorID)

        closestElevator.destinationFloor = floor;
        closestElevator.status = 'occupied';
        elevators[index] = closestElevator
        setElevators(elevators);
        return closestElevator;
    }
    const moveElevator = async (elevator, set) => {
        // const time = Math.abs(elevator.currentFloor - elevator.destinationFloor) * 2;
        let index
        const element = document.getElementById(elevator.elevatorID)
        element.classList.add('animated');
        let cssClass = document.querySelector(".animated");
        setTimeout(async () => {
            let btm = elevator.translate + ((-81) * (elevator.destinationFloor - elevator.currentFloor))
            const timing = {
                duration: 500,
                easing: 'linear',
                iterations:1
            };
            let animate = [
                {transform: `translateY(${elevator.translate}px`, opacity: 1},
                {transform: `translateY(${btm}px)`, opacity: 1},

            ];
            await cssClass.animate(animate, timing);
            elevator.translate = btm
            elevator.currentFloor = elevator.destinationFloor;
            elevator.destinationFloor = null;
            elevator.color = '#00e68a';
            element.classList.remove('animated');
            await audio.play();
            if (elevator.queue.length > 0) {
                elevator.destinationFloor = elevator.queue.shift();
                await moveElevator(elevator);
            } else {
                elevator.status = 'available';
            }
            index = elevators.findIndex((element) => element.elevatorID === elevator.elevatorID)
            elevators[index] = elevator
            setElevators(elevators);
            set("Arrived")

        }, 2000);
        setTimeout(async () => {
            set("Call")
            elevator.color = '#000000'
            elevator.animationName = ''
            elevators[index] = elevator
            setElevators(elevators);
        }, 3000);

    }
    return (
        <div className={'container'}>
            <FloorElevator floorNumber={'9th'} status={status9} onFloorClick={() => onFloorClick(status9, setStatus9,9)}/>
            <FloorElevator floorNumber={'8th'} status={status8} onFloorClick={() => onFloorClick(status8, setStatus8,8)}/>
            <FloorElevator floorNumber={'7th'} status={status7} onFloorClick={() => onFloorClick(status7, setStatus7,7)}/>
            <FloorElevator floorNumber={'6th'} status={status6} onFloorClick={() => onFloorClick(status6, setStatus6,6)}/>
            <FloorElevator floorNumber={'5th'} status={status5} onFloorClick={() => onFloorClick(status5, setStatus5,5)}/>
            <FloorElevator floorNumber={'4th'} status={status4} onFloorClick={() => onFloorClick(status4, setStatus4,4)}/>
            <FloorElevator floorNumber={'3rd'} status={status3} onFloorClick={() => onFloorClick(status3, setStatus3,3)}/>
            <FloorElevator floorNumber={'2nd'} status={status2} onFloorClick={() => onFloorClick(status2, setStatus2,2)}/>
            <FloorElevator floorNumber={'1st'} status={status1} onFloorClick={() => onFloorClick(status1, setStatus1,1)}/>
            <FloorElevator floorNumber={'Ground Floor'} status={status0} onFloorClick={() => onFloorClick(status0, setStatus0,0)}/>
            {elevators.map(elevator =><Elevator elevatorID={elevator.elevatorID} left={elevator.left} translate={elevator.translate+'px'} color={elevator.color} animationName={elevator.animationName}/>)}
        </div>
    );
}