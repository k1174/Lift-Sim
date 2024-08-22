let queue = [];

function updateQueue(btn, floor) {
    for (let i = 0; i < queue.length; i++) {
        if (queue[i].id.split('-')[1] === btn.id.split('-')[1]) {
            console.log("Already in queue", btn.id)
            return;
        }
    }
    
    if (liftPosition.includes(floor)) {
        const lift = document.getElementById(`lift-${liftPosition.indexOf(floor) + 1}`)
        if (liftStatus[liftPosition.indexOf(floor)] === 0) {
            openDoors(lift)
        }
        return;
    }
    queue.push(btn)
}

setInterval(() => {
    if (queue.length > 0) {
        let btn = queue[0];
        let floor = parseInt(btn.id.split('-')[1])
        liftSystem(btn, floor)
    }
}, 100)

function liftSystem(btn, floor) {
    let lift = findNearestLift(floor)
    if (lift === 0) {
        return;
    }
    move(lift, floor, btn);
    queue.shift();//remove first element of queue
}

let liftPosition = [];//tracking the lift postion
let liftStatus = [];//0-> idle, 1->active

function setLift(n) {
    for (let i = 1; i <= n; i++) {
        liftPosition.push(0);
        liftStatus.push(0);
    }
}

function findNearestLift(floor) {
    let min = 100;
    let lift = 0;

    for (let i = 0; i < liftPosition.length; i++) {
        //if lift is idle and nearest
        if (liftStatus[i] === 0 && Math.abs(liftPosition[i] - floor) < min) {
            min = Math.abs(liftPosition[i] - floor)
            lift = i + 1;
        }
    }
    if (lift === 0) return 0;//no idle lift

    liftStatus[lift - 1] = 1;//changing lift state
    liftPosition[lift - 1] = floor;

    return lift;
}

//lift movement 
function move(id, floor, btn) {
    const lift = document.getElementById(`lift-${id}`)
   
    let yaxis = (40 * (floor - 1))
    const btnY = btn.getBoundingClientRect().y;
    const liftY = lift.getBoundingClientRect().y;

    const diff = Math.abs(btnY - liftY)
    const duration = (diff / 36) * 2;

    lift.style.transition = `transform ${duration}s`
    lift.style.transform = `translateY(-${yaxis}px)`

    setTimeout(() => {
        openDoors(lift)
    }, (diff / 36) * 1000 * 2)
}

function openDoors(lift) {
    const liftId = lift.id.split('-')[1]
    liftStatus[liftId - 1] = 1;
    const child = lift.children[0]
    child.classList.add('animate')

    setTimeout(() => {
        liftStatus[liftId - 1] = 0;
        child.classList.remove('animate')
    }, 4000)
}

export { updateQueue, setLift };