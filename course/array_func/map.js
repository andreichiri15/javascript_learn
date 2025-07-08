array = [1, 2, 3, 4]

const inc = x => x + 1

array = array.map((num, index) => {
    return num * num
})

console.log(array)

// capitalize first letter from elements of array

arrayFruits = ['apple', 'banana', 'peach', 'grape']

arrayFruits = arrayFruits.map((string) => {
    return string[0].toUpperCase() + string.slice(1)
})

console.log(arrayFruits);

// extract property from array of objects

const usersArray = [
    {id: 1, name: 'Andrei'},
    {id: 2, name: 'Mihai'},
    {id: 3, name: 'George'},
    {id: 4, name: 'Daniel'}
]

nameIds = usersArray.map((obj) => {
    return obj.name
})

console.log(nameIds);

// double odd numbers

arrayNum = [1, 2, 3, 4, 5, 6]

arrayNum = arrayNum.map((number) => {
    return number % 2 == 1 ? number * 2 : number
})

console.log(arrayNum);