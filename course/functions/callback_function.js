function greet(name, callback) {
    console.log(`Salut ${name}`);

    callback(name)
}

function greet2(name) {
    console.log(`Cmf ${name}`);
}

greet('Andrei', greet2)

const incrementByValue = (a, x) => a + x

const multiplyByValue = (a, x) => a * x

function incrementArrayByValue(array, x, incFunc) {
    for (i in array) {
        array[i] = incFunc(array[i], x)
    }
}

array = [1, 2, 3, 4]

// incrementArrayByValue(array, 5, incrementByValue)

incrementArrayByValue(array, 5, multiplyByValue)

console.log(array)