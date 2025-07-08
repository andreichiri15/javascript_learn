function outerFunction() {
    function innerFunction() {
        var a = 100
        console.log(a)
    }

    innerFunction()
}

outerFunction()