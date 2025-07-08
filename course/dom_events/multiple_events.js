const btns = document.querySelector('#my_buttons').children

for (let btn of btns) {
    btn.addEventListener('click', function() {
        var buttonId = btn.id

        // console.log(`Clicked on button ${buttonId}`);
        console.log("Clicked on button " + this.id);
        // console.log(`Clicked on button`);
    })
}

// event.target

for (let btn of btns) {
    btn.addEventListener('click', (e) => {
        console.log(e);
    })
}