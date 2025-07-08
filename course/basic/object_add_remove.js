const obj = {
    name:'Andrei',
    age:22,
    "my hobbies": ['learning', 'football', 'gaming']
}

// cu dot notation n-as putea face asta

for (hobby of obj["my hobbies"]) {
    console.log(hobby)
}

//add remove

const car = {}

car.name = 'Dacia'
car.model = 'Spring'
car.year = 2023

car['color'] = 'White'

console.log(car)

delete car.color // sau car['color']

console.log(car)
