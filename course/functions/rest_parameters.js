function calcSum(...numbers) {
    let sum = 0;
    for (elem of numbers) {
        sum += elem
    }

    return sum;
}

array = [1, 2, 3, 4, 5]

console.log(calcSum(...array))

// concat strings

function concatStrings(...strings) {
    stringRez = ""

    for (s of strings) {
        stringRez += s
    }

    return stringRez
}

const concatStrings2 = (separator, ...strings) => strings.join(separator)

console.log(concatStrings2('', 'ala', 'bala ', 'porto', 'cala'))

// find maximum among all arguments

function findMax(...values) {
    max = Number.MIN_VALUE

    for (elem of values) {
        max = elem > max ? elem : max
    }

    return max
}

findMax2 = (...values) => Math.max(...values)

console.log(findMax2(1, 2, 8, -5, 5, 12, 9))