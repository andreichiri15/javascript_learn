const button = document.getElementById('btn')

let count = 0

button.addEventListener("click", function() {
    count++
    console.log(`am dat click de ${count} ori`);
    // alert(`Ai dat click de ${count} ori`)
}) 