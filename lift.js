const liftSystem = document.getElementById('lift-system')


function createLift(n) {
    const doors = document.createElement('div')
    const lift = document.createElement('div')
    lift.id = `lift-${n}`
    lift.classList.add('lift')
    lift.appendChild(doors);
    return lift;
}

function createLifts(n) {
    for (let i = 1; i <= n; i++) {
        liftSystem.appendChild(createLift(i));
    }
}

export { createLifts }