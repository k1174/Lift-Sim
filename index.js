import { handleSubmit } from './floor.js';

document.addEventListener('submit', (e) => {
    handleSubmit(e)
    const form = document.getElementById('form')
    form.style.display = "none"
})
