const userForm = document.getElementById('userForm')

console.log(userForm);

const users = {}

let value = 0

userForm.addEventListener('submit', (e) => {
    console.log(e);
    e.preventDefault()

    let userData = new FormData(userForm)
    console.log(userData);

    const userDetail = {}

    for (let [key,value] of userData.entries()) {
        userDetail[key] = value
    }

    users['Andrei'] = userDetail

    const jsonData = JSON.stringify(userDetail)

    localStorage.setItem("userdata" + value, jsonData)

    console.log(localStorage);

    value++
})