const car = {
    name: 'Dacia',
    model: 'Spring',
    year: '2002',
    color: 'white'
}

for (let key in car) {
    console.log(key)
}

console.log(Object.keys(car))

for (let key of Object.keys(car)) {
    console.log(key)
}

// array of objects

const array = [
    car, {name:'BMW', model:"M5"}
]

for (let elem of array) {
    console.log(elem.name)
}