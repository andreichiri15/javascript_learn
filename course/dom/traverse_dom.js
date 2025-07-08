const root = document.getRootNode()

const htmlElement = root.childNodes[1]

console.log(htmlElement.childNodes);

const head = htmlElement.childNodes[0]

//access title
console.log(head.childNodes[7]);

console.log(head.children);

const desc = document.getElementById('desc')

const parentDiv = desc.parentNode

parentDiv.style.fontSize = '18px'
parentDiv.style.fontFamily = 'verdana'

const sibling = parentDiv.nextElementSibling;
// const sibling = parentDiv.nextSibling.nextSibling;

console.log(sibling);
console.log(parentDiv.nextSibling.nextSibling);

