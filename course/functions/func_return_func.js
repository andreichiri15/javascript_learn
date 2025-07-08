function createAdder(x) {

    return function(y) {
        return x + y
    }
}

console.log(createAdder(10)(5));

function counterAdder() {
    let count = 0

    return function() {
        count += 2

        return count
    }
}

let counter = counterAdder()

console.log(counter())
console.log(counter())
console.log(counter())
