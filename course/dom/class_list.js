const li_div = document.getElementById('li_div')

li_div.classList.add('my--style', 'my--style--2')

li_div.classList.remove('my--style')

// daca nu contine clasa, o baga, daca o are, o scoate (tare csz)
li_div.classList.toggle('my--style')

// verif daca divu contine clasa data
// console.log(li_div.classList.contains('my--style'));