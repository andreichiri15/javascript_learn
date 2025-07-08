const person = {
    name: 'Andrei',
    age: '22',
    country: 'RO'
}

// destructure + renaming variables
const {name:myName, age, country} = person

console.log(myName, age, country)

const user = {username:"andrei_nr1"}

const {username, password = 'parola'} = user

console.log(username, password)

// nested objects destructuring

const personalInfo = {
    name: 'Andrei', 
    age: 22,
    isStudent: true,
    isEmployed: true,
    address: {
        city: "Bucharest",
        country: "RO"
    }
}

const {name: personalName, address:{city, country: myCountry}} = personalInfo

console.log(personalName, city, myCountry)
