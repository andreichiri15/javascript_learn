let list1 = ['a', 'b', 'c']

// let list2 = structuredClone(list1)

// let list2 = list1.slice()

let list2 = [...list1]

// let list2 = list1

// list2.push('d')

console.log(list1 == list2, list1 === list2)

console.log(list1.concat(list2))