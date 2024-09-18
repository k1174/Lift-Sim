let queue = [];

function updateQueue(btn, floor) {
    for (let i = 0; i < queue.length; i++) {
        if (queue[i].id === btn.id) {
            console.log("Already in queue", btn.id)
            return;
        }
    }

    for (let i = 0; i < liftPosition.length; i++) {
        if (liftPosition[i] == floor && ((liftPositionBtn[i]) == (btn.id.split('-')[0] == 'up' ? 1 : -1))) {
            const lift = document.getElementById(`lift-${i + 1}`)
            if (liftStatus[i] === 0) {
                openDoors(lift)
            }
            return;
        }
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
    let lift = findNearestLift(floor, btn)

    if (lift === 0) {
        return;
    }
    const diff = Math.abs(liftPosition[lift - 1] - floor) ;
    liftStatus[lift - 1] = 1;//changing lift state
    liftPosition[lift - 1] = floor;
    liftPositionBtn[lift - 1] = btn.id.split('-')[0] == 'up' ? 1 : -1;
    move(lift, floor, btn, diff);
    queue.shift();//remove first element of queue
}

let liftPosition = [];//tracking the lift postion
let liftPositionBtn = []//1 up and -1 down
let liftStatus = [];//0-> idle, 1->active

function setLift(n) {
    for (let i = 1; i <= n; i++) {
        liftPosition.push(1);
        liftStatus.push(0);
        liftPositionBtn.push(0);
    }
}

function findNearestLift(floor, btn) {
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

    return lift;
}

//lift movement 
function move(id, floor, btn, diff) {

    const lift = document.getElementById(`lift-${id}`)

    let yaxis = (40 * (floor - 1))
    const btnY = btn.getBoundingClientRect().y;
    const liftY = lift.getBoundingClientRect().y;

    // const diff = Math.abs(btnY - liftY)
    // const duration = (diff / 36) * 2;

    lift.style.transition = `transform ${diff*2}s`
    lift.style.transform = `translateY(-${yaxis}px)`
    // transition-timing-function: linear;
    lift.style.transitionTimingFunction = 'linear';

    setTimeout(() => {
        openDoors(lift)
    }, (diff * 2 ) * 1000 )
}

function openDoors(lift) {
    const liftId = lift.id.split('-')[1]
    liftStatus[liftId - 1] = 1;
    const child = lift.children[0]
    child.classList.add('animate')

    setTimeout(() => {
        liftStatus[liftId - 1] = 0;
        child.classList.remove('animate')
    }, 5000)
}

export { updateQueue, setLift };