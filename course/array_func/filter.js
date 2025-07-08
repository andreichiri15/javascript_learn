arrayNum = [1, 2, 3, 4, 5, 6]

// filter even numbers
arrayNum = arrayNum.filter((number) => number % 2 == 0)

console.log(arrayNum);

// filter string longer than 5 characters

arrayStrings = ['banana', 'apple', 'watermelon', 'strawberry']

arrayStrings = arrayStrings.filter(string => string.length > 5)

console.log(arrayStrings)

// fillter users with age over 18

users = [
    {id:1, name:'Andrei', age:22},
    {id:2, name:'Mihai', age:25},
    {id:3, name:'Daniel', age:17}
]

users = users.filter(user => user.age >=18)

console.log(users);

