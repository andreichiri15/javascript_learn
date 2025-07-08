header = document.createElement('h2')

document.body.insertAdjacentElement('afterbegin', header)

header.textContent = 'Salut'

$(document).ready(function() {
    // $('h2').click((e) => {
    //     $('h2').hide('slow')
    //     // console.log('object');
    // })

    $('#button2').click((e) => {
        
    })
})

$('#input2').blur((e) => {
    $('#input2').css("background-color", "red");
})



