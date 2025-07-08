const list_of_ul = document.querySelector('div ul')

const child = list_of_ul.children[list_of_ul.children.length - 1]

const copiedNode = child.cloneNode(true)

console.log(copiedNode);

list_of_ul.insertAdjacentElement("afterbegin", copiedNode)

copiedNode.textContent += 'copied'

const newNavbarNode = navbar.children[0].cloneNode(true)

navbar.insertAdjacentElement("beforeend", newNavbarNode);

newNavbarNode.children[0].textContent = 'Careers'
