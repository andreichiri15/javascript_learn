// Select element using query selector

const heading1 = document.querySelector('#heading1')

console.log(heading1);

const sameClassComponentsQuery = document.querySelectorAll('.text')

console.log(sameClassComponentsQuery);

for (elem of sameClassComponentsQuery) {
    console.log(elem.innerHTML);
}

const navItems = document.querySelectorAll('.nav--items')

let navbar = document.querySelector('#navbar')

let value = Number(window.getComputedStyle(navbar).fontSize.slice(0,2))

for (item of navItems) {
    item.style.fontSize = `${value}px`

    value += 10
}

console.log(navItems);