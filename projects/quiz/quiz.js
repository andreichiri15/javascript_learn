filepath = './question_hard.json'

const body = document.querySelector('body')

let start = 0

let globalData = null

let selected_list = []

let counter

let answersList = []

let timer

let initTimerSeconds = 20

function fetchJSONData(filepath) {
    fetch(filepath)
        .then(response => response.json())
        .then(data => {
            globalData = data
            init()
        })
        .catch(error => console.error('Error fetching JSON: ', error))
}

let selected_answer

function clickAnswerEvent(e) {
    if (typeof correct_answer == undefined) {
        return
    }

    if (typeof globalData[counter].correct_answer == 'string') {
        console.log('intru aici??');

        for (answerDiv of answersList.children) {
            // answerDiv.style.backgroundColor = 'white'

            answerDiv.isSelected = false

            answerDiv.style.setProperty("--color", "white")
        }

        selected_answer = e.target.textContent

        e.target.isSelected = true

        // e.target.style.backgroundColor = 'grey'

        e.target.style.setProperty("--color", "black")

        return
    }

    e.target.isSelected = true

    if (selected_answer.includes(e.target.textContent)) {
        // e.target.style.backgroundColor = 'white'

        e.target.style.setProperty("--color", "white")

        var index = selected_answer.indexOf(e.target.textContent)
        selected_answer.splice(index, 1)

    } else {
        selected_answer.push(e.target.textContent)
        // e.target.style.backgroundColor = 'grey'

        e.target.style.setProperty("--color", "black")

        // st.style.backgroundColor = 'black'
    }

    // e.target.removeEventListener('click', clickAnswerEvent)
    // e.removeEventListener('click', (e) => {
    //         clickAnswerEvent(e, correct_answer)
    //     })

    // e.target.removeEventListener('click', clickAnswerEvent)
    // e.target.addEventListener('click', (e) => {
    //     e.target.style.backgroundColor = 'black'
    // })
}

let interval = null
let seconds

function createDivQuestion(questionData) {
    if (interval) {
        clearInterval(interval)
    }

    seconds = initTimerSeconds

    const questionDiv = document.createElement('div')
    questionDiv.id = 'quest' + questionData.id

    questionDiv.classList.add('questClass')

    body.insertAdjacentElement('beforeend', questionDiv)

    const questionHeader = document.createElement('h2')
    questionHeader.textContent = questionData.question

    questionDiv.insertAdjacentElement('beforeend', questionHeader)

    answersList = document.createElement('ul')
    questionDiv.insertAdjacentElement('beforeend', answersList)

    answersList.classList.add('answersList')

    multiple_choice = false

    if (typeof questionData.correct_answer == 'object') {
        console.log('intra');
        selected_answer = []

        multiple_choice = true
    }

    arrayRandomNumbers = randomize(questionData.answers.length)

    for (index in questionData.answers) {
        let answerDiv = document.createElement('li')
        answerDiv.textContent = questionData.answers[arrayRandomNumbers[index]]
        
        answerDiv.addEventListener('click', clickAnswerEvent)

        answersList.insertAdjacentElement('beforeend', answerDiv)

        if (multiple_choice) {
            answerDiv.style.setProperty("--radius", 0)
        }
    }

    const newDiv = document.createElement('div')

    questionDiv.insertAdjacentElement('beforeend', newDiv)

    const buttonDiv = document.createElement('button')

    newDiv.insertAdjacentElement('beforeend', buttonDiv)
    newDiv.classList.add('divButton')

    // questionDiv.insertAdjacentElement('beforeend', buttonDiv)
    buttonDiv.classList.add('button')
    buttonDiv.textContent = 'Submit answer'

    buttonDiv.addEventListener('click', moveToNextQuestion)

    // timeoutVar = setTimeout(() => {
    //     if (counter == globalData.length - 1) {
    //         moveToAnswers()
    //     } else {
    //         moveToNextQuestion()
    //     }
    // }, 5000)

    timerFunction()

    interval = setInterval(() => {
        timerFunction(seconds)
    }, 1000)
}

function timerFunction() {
    seconds--
        
    timer.textContent = `${seconds} seconds remaining!`
    if (seconds == 0) {
        clearInterval(interval)

        if (counter == globalData.length - 1) {
            timer.remove()
            moveToAnswers()
        } else {
            timer.textContent = `${initTimerSeconds} seconds remaining!`
            console.log('sall');
            moveToNextQuestion()
        }
    }
}

function showQuestion() {
    currentQuestionDiv = document.querySelector(`#quest${counter}`)

    currentQuestionDiv.style.display = 'block'
}

function destructAnswers() {
    questionDivs = document.querySelectorAll('.questClass')

    body.style.display = 'flex'

    for (let q of questionDivs) {
        q.style.display = 'none'
    }
}

function destructCurrentQuest(id) {
    currentQuestionDiv = document.querySelector(`#quest${id}`)

    currentQuestionDiv.style.display = 'none'
}

function moveToAnswers() {
    // console.log('am terminat');
    clearInterval(interval)

    console.log(selected_list);

    timer.remove()

    let correctCount = 0

    for(let i = 0; i < selected_list.length; i++) {
        // if (selected_list[i] == globalData[i].correct_answer) {
        //     correctCount++
        // }

        if (typeof selected_list[i] == 'object' && selected_list[i] != null) {
            let all_correct = true
            let selected_correct_answers = 0

            console.log(selected_list[i]);
            for (let j = 0; j < selected_list[i].length; j++) {
                if (!globalData[i].correct_answer.includes(selected_list[i][j])) {
                    all_correct = false
                    break
                } else {
                    selected_correct_answers++
                }
            }

            if (all_correct && selected_correct_answers == globalData[i].correct_answer.length) {
                correctCount++
            }
        } else if (selected_list[i] == globalData[i].correct_answer) {
            correctCount++
        }
    }

    console.log(correctCount / globalData.length * 100);

    scoreDiv = document.createElement('h2')

    body.insertAdjacentElement('afterbegin', scoreDiv)

    scoreDiv.textContent = `You obtained a score of ${correctCount / globalData.length * 100}%!`

    console.log(selected_list);

    console.log(globalData.map((data) => data.correct_answer));

    questionDivs = document.querySelectorAll('.questClass')

    body.style.display = 'block'

    let i = 0;

    for (let q of questionDivs) {
        q.style.display = 'block'

        q.querySelector('button').style.display = 'none'

        const ans = q.querySelectorAll('li')

        for (a of ans) {
            if (globalData[i].correct_answer.includes(a.textContent) && a.isSelected) {
                // a.style.backgroundColor = 'green'
                let mark = document.createElement('span')
                a.insertAdjacentElement('beforeend', mark)

                mark.innerHTML = ' &#x2714;'
                mark.style.color = 'green'
            // } else if(a.style.backgroundColor == 'grey') {
            } else if (!a.isSelected && globalData[i].correct_answer.includes(a.textContent)) { 
                let mark = document.createElement('span')
                a.insertAdjacentElement('beforeend', mark)

                mark.innerHTML = '⚠️'
            } else if(a.isSelected) {
                console.log('intra aici??');
                // a.style.backgroundColor = 'red'
                // a.setAttribute("contentValue", "\\2713")
                // a.setAttribute("colorValue", 'red')
                a.style.setProperty("--colorValue", "red")

                let mark = document.createElement('span')
                a.insertAdjacentElement('beforeend', mark)

                mark.innerHTML = ' &#x2716;'
                mark.style.color = 'red'
            }
        }

        i++;
    }

    document.onkeydown = function(e) {
        if (e.key == 'ArrowLeft') {
            // console.log('left arrow', counter);

            if (counter == 0) {
                return
            }

            if (counter == globalData.length + 1) {
                destructAnswers()

            } else {
                destructCurrentQuest(counter)
            }

            if (counter > 1) {
                counter--;
            }

            showQuestion()

        } else if(e.key == 'ArrowRight') {
            if (counter == globalData.length + 1) {
                return
            }
 
            if (counter == globalData.length) {
                moveToAnswers()
                return
            } else {
                destructCurrentQuest(counter)
            }

            if (counter <= globalData.length) {
                counter++
            }

            showQuestion()
        }
    }
    
    counter = globalData.length + 1
}

function moveToNextQuestion(e) {
    console.log(counter);

    answerLi = answersList.children

    for (answer of answerLi) {
        answer.removeEventListener('click', clickAnswerEvent)
    }

    counter++

    selected_list.push(selected_answer)

    if (counter >= globalData.length) {
        moveToAnswers()
        return
    }

    const prevQuestion = document.getElementById(`quest${counter}`)

    prevQuestion.style.display = 'none'

    selected_answer = null
    
    createDivQuestion(globalData[counter])

}

function init() {
    counter = 0

    timer = document.createElement('h2')

    timer.style.textAlign = 'center'

    timer.textContent = `${initTimerSeconds} seconds remaining!`

    body.insertAdjacentElement('beforeend', timer)

    createDivQuestion(globalData[counter])
}

fetchJSONData(filepath)

function randomize(n) {
    array = []

    for (let i = 0; i < n; i++) {
        array.push([i, Math.random()])
    }

    array.sort(function(a, b) {
        return a[1] - b[1]
    })

    return array.map((tuple) => tuple[0])
}
