

const obj = {
    name: 'Andrei',
    age: 22, 
    isStudent: true
}

// using object destructuring for parameters
function myFunc({name, age, isStudent}) {
    console.log(name, age, isStudent)
}

myFunc(obj)

array = [1, 2, 3, 4]

function myFunc2([a, b, c, d]) {
    console.log(a + b + c + d)
}

myFunc2(array)
