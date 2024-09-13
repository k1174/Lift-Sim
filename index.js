import { handleSubmit } from './floor.js';

document.addEventListener('submit', (e) => {
    if(e.target.floors.value > 1 ){
        
        handleSubmit(e)
        document.getElementById('form').remove()
    }
    else{
        alert("Floors should be greater than 1")
    }
})
