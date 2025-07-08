let list = [1, 2, 3, 4, 5]

console.log(typeof list)

console.log(Array.isArray(list))

let list2 = [1, 'ceva', false]

for (var i = 0; i < list2.length; i++) {
    console.log(typeof list2[i])
}