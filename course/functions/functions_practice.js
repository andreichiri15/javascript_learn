// arrow functions (reactjs se folosesc d-astea aparent)

// find number is even or not

const isEven_meh = (x) => {
    return x % 2 == 0;
}

// sau mai bine
const isEven = x => x % 2 == 0;

const isOdd = x => !isEven(x);

console.log(isEven(100))

console.log(isOdd(100))

// concat 2 arrays

const array1 = [1, 2, 3]

const array2 = [4, 5, 6]

// const concatArray = (array1, array2) => {
//     return [...array1, ...array2]
// }

const concatArray = (array1, array2) => [...array1, ...array2]

console.log(concatArray(array1, array2))

let array3 = [4, 5, 6]

const multArray = (array, n) => {
    for (i in array) {
        array[i] *= n;
    }

    return array;
}

console.log(multArray(array3, 2))
