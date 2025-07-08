function myFunction(x = 100) {
    return "salut" + x
}

function myFunction2(x, y) {
    x = typeof x != 'undefined' ? x : 10
    y = typeof y != 'undefined' ? y : 20
    return x + "" + y
}

console.log(myFunction(1))

console.log(myFunction(2))

console.log(myFunction())

console.log(myFunction2())

array = [1, 2]

console.log(myFunction2(...array))