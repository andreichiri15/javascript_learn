// modul traditional (nu mai fac drq e clar)

// functions expressions?

const salut = function(name = 'strain') {
    console.log("SALUT " + name)
}

// salut('internatule') // ce cringe

// Arrow functions ES6 / ES2015

const salut2 = (name = 'strain') => {
    console.log("CEAULES " + name)
}

salut2('geani');

// IIFE - Immediately invoked function expression
(function(name = 'blud') {
    console.log(`Ce drq e asta frate ${name}??`)
})();

(function() {
    // IIFE code block
    var localVar = 'This is a local variable';
    console.log(localVar); // Output: This is a local variable
})();

