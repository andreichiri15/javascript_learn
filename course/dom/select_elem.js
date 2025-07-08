// console.log("Salut frate");

console.log(document);

let myDesc = document.getElementById("description")

// iterate through elements of same class
sameClass = document.getElementsByClassName("text")
for (let item of sameClass) {
    console.log(item.innerHTML);
}

const heading1 = document.getElementById("heading1")