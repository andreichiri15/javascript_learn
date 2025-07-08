var ul_list2 = document.querySelector('div ul')

const newItem = document.createElement("li")

// ul_list2.appendChild(newItem) -> adauga la sfarsit (ultimul copil)

ul_list2.prepend(newItem) // -> aduaga la inceput (primul copil)

newItem.innerText = 'Ceaules'

const anotherItem = document.createElement('li')

anotherItem.textContent = 'Random text'

ul_list2.before(anotherItem)

console.log(document.getElementById('li_div').children);

// Insert adjacent elements

// afterend, beforeend, beforebegin, afterbegin

// inserting html directly
ul_list2.insertAdjacentHTML("beforebegin", "<li>Adjacent</li>")

const anotherAnotherItem = document.createElement('li')

// creating an element beforehand and adding it with insertAdjacent
ul_list2.insertAdjacentElement("afterbegin", anotherAnotherItem)

anotherAnotherItem.textContent = 'Servus'
