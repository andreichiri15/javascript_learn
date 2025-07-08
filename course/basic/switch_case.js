let a = 100

day = new Date().getDay()

console.log(day, typeof day)

let day_str = null

switch(day) {
    case 1:
        day_str = "Monday"
        break
    case 2:
        day_str = "Tuesday"
        break
    default:
        day_str = "Friday"
}

console.log(day_str)