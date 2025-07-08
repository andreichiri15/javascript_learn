const products = [
    {id:1, name:'Laptop', price: 1000},
    {id:2, name:'Computer', price: 3000},
    {id:3, name:'Phone', price: 600},
]

let idArray = []

for (prod of products) {
    if (prod.price > 900) {
        idArray.push([prod.id, prod.price])
    }
}

const [{id:currid}, ,{name:productName}] = products

console.log(currid, productName)

for (prod of products) {
    prod.price += 0.1 * prod.price
}

console.log(products)