const navItems = document.querySelectorAll('.nav--items')

const heading = document.getElementById('heading1')

heading.style.backgroundColor = 'rgb(' + [253, 165, 165].join(',') + ')' 

const divContainer = document.getElementById('container')

divContainer.style.border = '2px solid red'
divContainer.style.padding = Number(window.getComputedStyle(divContainer).padding.slice(0, 1)) * 3 + "px"
divContainer.style.borderRadius = '10px'

