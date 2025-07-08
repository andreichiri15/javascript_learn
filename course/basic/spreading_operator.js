// spread operator

// clone arrays
// merge arrays
// adding element ?

// const origArray = [1, 2, 3, 4]

// const copiedArray = [...origArray]

// copiedArray.push(5)

// console.log(copiedArray)

// console.log(origArray)

// let array1 = [10, 20, 30]

// let array2 = [40, 50, 60]

// // array1 = [...array1, ...array2]

// const mergedArray = [...array1, ...array2]

// console.log(mergedArray)

// !! spread operator for Objects

const origObj = {
    name: 'eu',
    age: 22
}

const newObj = {...origObj}

console.log(newObj)

const obj1 = {...origObj}

const obj2 = {
    student: true,
    job: true
}

const mergedObj = {...obj1, ...obj2, gender: 'male'}

console.log(mergedObj)