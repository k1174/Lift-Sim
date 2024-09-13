import { updateQueue, setLift } from './state.js';


const status = document.getElementById("top")
const floors = document.getElementById("building")

function handleSubmit(e) {
    e.preventDefault();
    const noOfFloors = parseInt(e.target.floors.value);
    const noOFLifts = e.target.lifts.value;

    
    var h3 = document.createElement("h3");
    h3.textContent = `Floors : ${noOfFloors} and Lifts : ${noOFLifts}`;
    status.appendChild(h3)
    
    setLift(noOFLifts)

    //floor creation
    if(noOfFloors > 0){
            for (let i = noOfFloors; i > 0; i--) {
            floors.appendChild(createFloor(i));
        }
        //removing ground floor up button
        document.getElementById("down-1").remove();
        // removing top floor down button
        const top = "up-"+noOfFloors;
        document.getElementById(top).remove();
    }

    //lift creation
    if(noOfFloors > 1){
        createLifts(noOFLifts)
    }
}

function createFloor(n) {
    var floor = document.createElement('div')
    floor.id = n;
    floor.classList.add("floor")
    var obj = document.createElement('div')
    obj.classList.add("flex")
    obj.innerHTML = `<span style="margin-right:6px">${n} <span/>`;
    obj.appendChild(buttonElement(n, "up"))
    obj.appendChild(buttonElement(n, "down"))
    floor.appendChild(obj)
    floor.appendChild(document.createElement('hr'))
    return floor;
}

function buttonElement(id, dir) {
    var button = document.createElement('button')
    button.id = `${dir}-${id}`;
    button.classList.add(dir);
    button.innerHTML = dir;
    button.addEventListener('click', (e)=>{

        updateQueue(button, id)
        
    })
    return button;
}

const liftSystem = document.getElementById('lift-system')

function createLifts(n) {
    for (let i = 1; i <= n; i++) {
        const doors = document.createElement('div')
        const lift = document.createElement('div')
        lift.id = `lift-${i}`
        lift.classList.add('lift')
        lift.appendChild(doors);
        liftSystem.appendChild(lift);
    }
}

export { handleSubmit }