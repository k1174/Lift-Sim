import { updateQueue, setLift } from './state.js';


const status = document.getElementById("top")
const floors = document.getElementById("building")

function handleSubmit(e) {
    e.preventDefault();
    const noOfFloors = e.target.floors.value;
    const noOFLifts = e.target.lifts.value;

    setLift(noOFLifts)

    var h3 = document.createElement("h3");
    h3.textContent = `Floors : ${noOfFloors} and Lifts : ${noOFLifts}`;
    status.appendChild(h3)

    
    for (let i = noOfFloors; i > 0; i--) {
        floors.appendChild(createFloor(i));
    }
}

function createFloor(n) {
    var floor = document.createElement('div')
    floor.id = n;
    floor.classList.add("floor")
    var obj = document.createElement('div')
    obj.classList.add("flex")
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
        // console.log(button.id)
        updateQueue(button, id)
        
    })
    return button;
}

export { handleSubmit }