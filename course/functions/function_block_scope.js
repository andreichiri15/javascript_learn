function myFunc() {
    if (true) {
        var a = 100 // cu let se uita la block scope
        console.log(a)
    }

    console.log(a)
}

myFunc()