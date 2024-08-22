import { handleSubmit } from './floor.js';
import { createLifts } from './lift.js';

document.addEventListener('submit', (e) => {
    handleSubmit(e)
    const noOFLifts = e.target.lifts.value;

    createLifts(noOFLifts)

    const form = document.getElementById('form')
    form.style.display = "none"
})