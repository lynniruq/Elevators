class Elevator {
    constructor(id) {
        this.elevatorID = id;
        this.currentFloor = 0;
        this.status = 'available';
        this.destinationFloor = null;
        this.queue = [];
    }
}

const elevators = [];
for (let i = 0; i < 5; i++) {
    elevators.push(new Elevator(i));
}

function receiveFloorCall(floor) {
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
        // all elevators are occupied
        elevators[0].queue.push(floor);
        return;
    }

    closestElevator.destinationFloor = floor;
    closestElevator.status = 'occupied';
}

function moveElevator(elevator) {
    const time = Math.abs(elevator.currentFloor - elevator.destinationFloor) * 2;
    setTimeout(() => {
        elevator.currentFloor = elevator.destinationFloor;
        elevator.destinationFloor = null;

        if (elevator.queue.length > 0) {
            // serve queued requests
            elevator.destinationFloor = elevator.queue.shift();
            moveElevator(elevator);
        } else {
            elevator.status = 'available';
        }
    }, time * 1000);
}
