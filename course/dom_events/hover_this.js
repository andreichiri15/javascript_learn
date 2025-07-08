const div = document.getElementById('container')

console.log(div);

div.addEventListener('mouseenter', function() {
    console.log('am intrat in div');
})

div.addEventListener('mouseleave', function() {
    console.log('am iesit din div');
})

const button = document.getElementById('btn')

currentState = 1

button.addEventListener('click', function() {
    div.style.color = currentState ? 'crimson' : 'black'

    currentState = !currentState
})