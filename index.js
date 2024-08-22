import { handleSubmit } from './floor.js';

document.addEventListener('submit', (e) => {
    handleSubmit(e)
    document.getElementById('form').remove()
})
