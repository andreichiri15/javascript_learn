const footerHeading = document.querySelector('footer h4')

const heading1 = document.querySelector('header #heading1')

const nav__Items = document.querySelectorAll('ul .nav--items')

for (item of nav__Items) {
    // console.log(item);
    item.style.backgroundColor = '#fefae0'
    var color = window.getComputedStyle(item).color
    item.style.border = '2px solid ' + color
    
    item.style.borderRadius = '10%'
}

// get set attributes

const anchors = document.querySelectorAll('a')

anchors.forEach((anchor)=>{
    let href = anchor.getAttribute('href')
    href = "https://www." + href

    anchor.setAttribute('href', href)
})
