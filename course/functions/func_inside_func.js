function outerFunction(x) {
    function innerFunction() {
        return x + 100
    }

    return innerFunction
}

console.log(outerFunction(0)())