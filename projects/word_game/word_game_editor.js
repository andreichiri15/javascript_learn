const maxValidCells = 10
const distanceReff = 10

let counter
let questions // ar trebui sa le fac const
let answers // as putea sa pun questions si answers intr-o variabila obiect
let answersToGenerate
let nrCells
let isDown = false;
let offset = [0, 0]



let countAddedWords

let gameMatrix

let beginDiv, endDiv, gameDiv

const map = new Map()

function editForm(formDiv) {
    $(`#${formDiv.id} > input`).attr('readonly', false)

    let initQuest = $(`#${formDiv.id} > input:first`).val()
    let initAnsw = $(`#${formDiv.id} > input:last`).val()

    console.log(formDiv.id, $(`#${formDiv.id} > button`));

    // $(`button`).hide()
    $(`button`).not(":last-child").hide()
    $(`button:last`).prop('disabled', true)

    saveButton = document.createElement('button')
    saveButton.classList.add('button')
    formDiv.insertAdjacentElement('beforeend', saveButton)
    saveButton.textContent = 'Save'

    cancelButton = document.createElement('button')
    cancelButton.classList.add('button')
    formDiv.insertAdjacentElement('beforeend', cancelButton)
    cancelButton.textContent = 'Cancel'

    saveButton.addEventListener('click', () => {
        let currQuestion = $(`#${formDiv.id} > input:first`).val()
        let currAnswer = $(`#${formDiv.id} > input:last`).val()

        if (currQuestion == '' || currAnswer == '') {
            alert('Nu lasati campurile goale')
            return
        }

        if ((currQuestion != initQuest && questions.includes(currQuestion)) || 
            (currAnswer != initAnsw && answers.includes(currAnswer))) {
            alert(`You can't have duplicate questions or answers!`)
            return
        }
        questions[Number(formDiv.id.slice(7))] = currQuestion
        answers[Number(formDiv.id.slice(7))] = currAnswer
        answersToGenerate[Number(formDiv.id.slice(7))] = currAnswer

        saveButton.remove()
        cancelButton.remove()
        // $(`button`).show()
        $(`button`).not(":last-child").show()
        $(`button:last`).prop('disabled', false)


        if (map.has(formDiv) && map.get(formDiv).length > 0) {
            for (squareChild of map.get(formDiv)) {
                squareChild.textContent = ""
            }
        }
        map.set(formDiv, [])

        console.log(answers, questions)
    })

    cancelButton.addEventListener('click', (e) => {
        $(`#${formDiv.id} > input:first`).val(initQuest)
        $(`#${formDiv.id} > input:last`).val(initAnsw)

        saveButton.remove()
        cancelButton.remove()
        $(`button`).show()
        $(`button:last`).prop('disabled', false)
    })
    
    $(`#${formDiv.id} > button:last`).show()
}

function deleteForm(formDiv) {
    questions.splice(formDiv.id.slice(7), 1)

    answers.splice(formDiv.id.slice(7), 1)
    answersToGenerate.splice(formDiv.id.slice(7), 1)

    formDiv.innerHTML = ""
    formDiv.remove()

    for (gridChild of map.get(formDiv)) {
        if (gridChild.countDifferentWords == 1) {
            gridChild.textContent = ""

            let indexI = Math.floor(parseInt(gridChild.id.slice(2), 10) / nrCells)
            let indexJ = parseInt(gridChild.id.slice(2), 10) % nrCells

            console.log(indexI, indexJ, gridChild, gameMatrix)

            gameMatrix[indexI][indexJ] = null
        }

        gridChild.countDifferentWords--
    }

    console.log(questions, answers);
}

function takeWordGrid(formDiv) {
    // let question = $(`#${formDiv.id} > input:first`).val()
    let answer = $(`#${formDiv.id} > input:last`).val()

    // $(`button`).hide()
    $('button').prop('disabled', true)

    map.set(formDiv, [])

    wordDiv = document.createElement('div')
    wordDiv.id = 'wordId'

    wordDiv.style.width = 50 * answer.length + 'px'

    gameDiv.insertAdjacentElement('beforeend', wordDiv)

    wordDiv.classList.add('gridClass')
    wordDiv.style.display = 'flex'

    // wordDiv.style.gridTemplateColumns = `repeat(${nrCells}, 55px)`
    wordDiv.style.position = 'absolute'
    wordDiv.style.marginLeft = '0px'

    for (let i = 0; i < answer.length; i++) {
        var squareDiv = document.createElement('div')
        squareDiv.id = 'let' + i

        // squareDiv.classList.add('squareClass')

        squareDiv.classList.add('squareClass')

        wordDiv.insertAdjacentElement('beforeend', squareDiv)
        squareDiv.textContent = answer[i].toUpperCase()
    }

    nrRotated = 0
    lastPos = {}

    function rotateEvent(e) {
        if (isDown && e.key == 'r') {
            nrRotated = (nrRotated + 1) % 8;

            heightDim = 50;
            
            switch (nrRotated) {
                case 0:
                    offset = [-heightDim * wordDiv.children.length / 2, -heightDim / 2]

                    for (let i = 0; i < wordDiv.children.length; i++) {
                        x = $(`#${wordDiv.children[i].id}`).position().left
                        
                        wordDiv.children[i].style.position = 'static'

                        wordDiv.children[i].style.left = x - heightDim * i + 'px';
                    }

                    wordDiv.style.flexDirection = 'row'
                    break;
                case 1:
                    for (let i = 0; i < wordDiv.children.length; i++) {
                        y = $(`#${wordDiv.children[i].id}`).position().top
                        
                        wordDiv.children[i].style.position = 'relative'
                        wordDiv.children[i].style.top = y + heightDim * i + 'px';
                    }

                    offset = [-heightDim * wordDiv.children.length / 2, -heightDim * wordDiv.children.length / 2]
                    break;
                case 2:
                    for (let i = 0; i < wordDiv.children.length; i++) {
                        wordDiv.children[i].style.position = 'static'
                    }

                    wordDiv.style.flexDirection = 'column'
                    offset = [-heightDim / 2, -heightDim * wordDiv.children.length / 2]
                    break;
                case 3:
                    for (let i = 0; i < wordDiv.children.length; i++) {
                        x = $(`#${wordDiv.children[i].id}`).position().left
                        y = $(`#${wordDiv.children[i].id}`).position().top

                        console.log(x);
                        
                        wordDiv.children[i].style.position = 'relative'

                        wordDiv.children[i].style.top = y - heightDim * i + 5 + 'px';
                        wordDiv.children[i].style.left = x - heightDim * i + 'px';
                    }

                    offset = [heightDim * (wordDiv.children.length) / 2 - heightDim, -heightDim * wordDiv.children.length / 2]

                    break;
                case 4:
                    offset = [-heightDim * wordDiv.children.length / 2, -heightDim / 2]
                    wordDiv.style.flexDirection = 'row-reverse'

                    for (let i = 0; i < wordDiv.children.length; i++) {
                        // x = $(`#${wordDiv.children[i].id}`).position().left
                        // y = $(`#${wordDiv.children[i].id}`).position().top

                        wordDiv.children[i].style.position = 'static'
                    }
                    break;
                case 5:
                    offset = [-heightDim * wordDiv.children.length / 2 - (wordDiv.children.length - 1) * heightDim, heightDim * wordDiv.children.length / 2 - heightDim] 
                    wordDiv.style.flexDirection = 'row-reverse'

                    for (let i = 0; i < wordDiv.children.length; i++) {
                        x = $(`#${wordDiv.children[i].id}`).position().left
                        y = $(`#${wordDiv.children[i].id}`).position().top

                        wordDiv.children[i].style.position = 'relative'

                        wordDiv.children[i].style.left = x + heightDim * i + 'px';
                        wordDiv.children[i].style.top = y - heightDim * i + 'px'
                    }
                    
                    break;
                case 6:
                    wordDiv.style.flexDirection = 'column-reverse'
                    offset = [-heightDim / 2, -heightDim * wordDiv.children.length / 2]

                    for (let i = 0; i < wordDiv.children.length; i++) {
                        wordDiv.children[i].style.position = 'static'
                    }
                    break;
                case 7:
                    offset = [-heightDim * wordDiv.children.length / 2, -heightDim * wordDiv.children.length / 2 - (wordDiv.children.length - 1) * heightDim]

                    for (let i = 0; i < wordDiv.children.length; i++) {
                        x = $(`#${wordDiv.children[i].id}`).position().left
                        y = $(`#${wordDiv.children[i].id}`).position().top

                        wordDiv.children[i].style.position = 'relative'

                        wordDiv.children[i].style.top = y + heightDim * i + 5 + 'px'
                        wordDiv.children[i].style.left = x + heightDim * i + 'px';
                    }
                    break;
            }

            wordDiv.style.left = (lastPos.x + offset[0]) + 'px';
            wordDiv.style.top  = (lastPos.y + offset[1]) + 'px';
        }
    }

    document.addEventListener('keydown', rotateEvent)

    wordDiv.addEventListener('mousedown', (e) => {
        isDown = true
        // offset = [wordDiv.offsetLeft - e.clientX, wordDiv.offsetTop - e.clientY]
        offset = [-50 * wordDiv.children.length / 2, -50 / 2]
        // offset = [0, 0]
        gameDiv.readOnly = true;
    })

    wordDiv.addEventListener('mouseup', (e) => {
        $('button').prop('disabled', false)

        isDown = false;

        nrRotated = 0
        let boolAddedWord = false

        for (let child of wordDiv.children) {
            if (child.tempGridChild) {
                boolAddedWord = true

                child.tempGridChild.countDifferentWords++

                child.tempGridChild.textContent = child.textContent

                let id = parseInt(child.tempGridChild.id.slice(2), 10)

                let indexI = Math.floor(id / nrCells);
                let indexJ = id % nrCells;

                // console.log(id, indexI, indexJ);

                gameMatrix[indexI][indexJ] = child.tempGridChild.textContent.toUpperCase();

                mapValue = map.get(formDiv)
                mapValue.push(child.tempGridChild)
            }

        }

        if (boolAddedWord) {
            $(`#${formDiv.id} > button:last`).hide()

            countAddedWords++
            answersToGenerate.splice(answersToGenerate.indexOf(answer), 1)
        }
        
        wordDiv.remove()
        document.removeEventListener('keydown', rotateEvent)
    })

    document.addEventListener('mousemove', (e) => {
        e.preventDefault();

        if (!isDown) {
            return
        }

        mousePosition = {x : e.clientX + window.scrollX, y : e.clientY + window.scrollY};
        wordDiv.style.left = (mousePosition.x + offset[0]) + 'px';
        wordDiv.style.top  = (mousePosition.y + offset[1]) + 'px';

        lastPos = mousePosition

        let gridDiv = document.querySelector('#gridID');

        for (let child of wordDiv.children) {
            minDistance = 10
            minGridChild = null

            for (let gridChild of gridDiv.children) {
                let xLetter = $(`#${child.id}`).offset().left
                let yLetter = $(`#${child.id}`).offset().top

                let xGrid = $(`#${gridChild.id}`).offset().left
                let yGrid = $(`#${gridChild.id}`).offset().top

                let distance = Math.abs(xLetter - xGrid) + Math.abs(yLetter - yGrid)

                // console.log(xLetter, yLetter, xGrid, yGrid, distance);

                if (distance < distanceReff && distance < minDistance && 
                    (gridChild.textContent == '' || gridChild.textContent == child.textContent)) {
                    minDistance = distance
                    // child.style.backgroundColor = 'green'
                    minGridChild = gridChild
                }

                // break
            }

            if (minDistance < 10) {
                child.style.backgroundColor = 'green'
                child.tempGridChild = minGridChild

            } else {
                for (let child2 of wordDiv.children) {
                    child2.style.backgroundColor = 'red'
                    child2.tempGridChild = null
                }
                break
            }

            // break
        }
    }, true)
}

function saveQuestionForm(formDiv) {
    $('div, input').attr('readonly', true)

    $(`#formDiv${counter} > button`).remove()

    editButton = document.createElement('button')
    editButton.classList.add('button')
    editButton.textContent = 'Edit'
    formDiv.insertAdjacentElement('beforeend', editButton)

    deleteButton = document.createElement('button')
    deleteButton.classList.add('button')
    deleteButton.textContent = 'Delete'
    formDiv.insertAdjacentElement('beforeend', deleteButton)

    editButton.addEventListener('click', function() {
        editForm(formDiv) // ca sa evit folosirea parametrului in plus la functie, as putea folosi e.target.parentElement (in cazul asta)
    })
    deleteButton.addEventListener('click', function() {
        deleteForm(formDiv)
    })

    takeButton = document.createElement('button')
    takeButton.classList.add('button')
    takeButton.textContent = 'Take'
    formDiv.insertAdjacentElement('beforeend', takeButton)

    takeButton.addEventListener('mousedown', function() {
        takeWordGrid(formDiv)
    })
}

function generateQuestionForm() {
    formDiv = document.createElement('div')
    formDiv.id = 'formDiv' + counter
    formDiv.classList.add('formClass')

    beginDiv.insertAdjacentElement('beforeend', formDiv)
    beginDiv.classList.add('beginDivClass')

    headerQuestion = document.createElement('h2')
    headerQuestion.textContent = 'Intrebare:'
    formDiv.insertAdjacentElement('beforeend', headerQuestion)

    questionInput = document.createElement('input')
    questionInput.placeholder = 'Intrebare'
    questionInput.id = 'question'
    questionInput.classList.add('formInput')
    formDiv.insertAdjacentElement('beforeend', questionInput)

    headerAnswer = document.createElement('h2')
    headerAnswer.textContent = 'Raspuns:'
    formDiv.insertAdjacentElement('beforeend', headerAnswer)

    answerInput = document.createElement('input')
    answerInput.placeholder = 'Raspuns'
    answerInput.id = 'answer'
    answerInput.classList.add('formInput')
    formDiv.insertAdjacentElement('beforeend', answerInput)

    submitButton = document.createElement('button')
    submitButton.classList.add('button')
    formDiv.insertAdjacentElement('beforeend', submitButton)
    submitButton.textContent = 'Save'

    submitButton.id = 'submitButton'

    $(document).ready(function() {
        $('.formClass > button:last').click((e) => {

            let currQuestion = $(`#${formDiv.id} > input:first`).val()
            let currAnswer = $(`#${formDiv.id} > input:last`).val()

            if (questions.includes(currQuestion) || answers.includes(currAnswer)) {
                alert(`You can't have duplicate questions or answers!`)
                return
            }

            if (currQuestion == '' || currAnswer == '') {
                alert('Nu lasati campurile goale!')
                return
            }

            questions.push(currQuestion)
            answers.push(currAnswer)
            answersToGenerate.push(currAnswer)
            
            saveQuestionForm(formDiv)

            counter++
            
            generateQuestionForm()

            console.log(questions, answers);
        })
    })

    // textInput.addEventListener("input", (e) => {
    $(`#${formDiv.id} > input`).on('input', function(e) {
        if (e.target.id == 'answer') {
            const existingPattern = /[^a-z]/;
            const newPattern = new RegExp(
                existingPattern.source,
                `${existingPattern.flags}g`,
            );
            
            e.target.value = e.target.value.replaceAll(newPattern, '')
        }

        if (e.target.value.length > nrCells && e.target.id == 'answer') {
            e.target.value = e.target.value.slice(0, nrCells) // schimb cu nr de cifre al lui n 
            alert(`Cuvantul nu poate fi mai lung decat numarul de celule al tabelei! (${nrCells})`)
        }
    })
}

function getCellsPage() {
    divCells = document.createElement('div')

    document.body.insertAdjacentElement('afterbegin', divCells)

    headerCells = document.createElement('h2')
    headerCells.textContent = 'Introduceti numarul de celule:'

    inputCells = document.createElement('input')
    inputCells.classList.add('formInput')

    buttonCells = document.createElement('button')
    buttonCells.classList.add('button')
    buttonCells.textContent = 'Submit'

    divCells.insertAdjacentElement('beforeend', headerCells)
    divCells.insertAdjacentElement('beforeend', inputCells)
    divCells.insertAdjacentElement('beforeend', buttonCells)

    divCells.style.display = 'block'
    divCells.style.textAlign = 'center'
    
    buttonCells.addEventListener('click', function() {
        if (inputCells.value > maxValidCells) {
            alert('Introduceti un numar de casute mai mic decat ' + maxValidCells)
            return
        }

        nrCells = inputCells.value

        for (let i = 0; i < nrCells; i++) {
            const row = [];
            for (let j = 0; j < nrCells; j++) {
                row.push(null);
            }
            gameMatrix.push(row);
        }

        console.log(gameMatrix);

        divCells.innerHTML = ""
        divCells.remove()

        initQuestionForm()
    })

    inputCells.addEventListener('input', function(e) {
        console.log('huh');

        const existingPattern = /[^2-9]/;
        const newPattern = new RegExp(
            existingPattern.source,
            `${existingPattern.flags}g`,
        );
            
        e.target.value = e.target.value.replaceAll(newPattern, '')

        e.target.value = e.target.value.length > 1 ? e.target.value.slice(1, 2) : e.target.value
    })
}

function generateWordsGrid() {
    // if (answers.length == 0) {
    //     return
    // }

    let gridDiv = document.createElement('div')
    gridDiv.classList.add('gridClass')
    gridDiv.id = 'gridID'

    gridDiv.style.gridTemplateColumns = `repeat(${nrCells}, 50px)`

    $('body > div:first').append(gridDiv)

    for (let i = 0; i < nrCells * nrCells; i++) {
        squareDiv = document.createElement('div')
        squareDiv.id = 'sq' + i
        squareDiv.countDifferentWords = 0

        squareDiv.classList.add('squareClass')

        // $('.gridClass').append(squareDiv)
        gridDiv.insertAdjacentElement('beforeend', squareDiv)

        // gameMatrix.push([])
    }
}

function generateDownload() {
    obj = {
        "nrCells":nrCells,
        "gameMatrix":gameMatrix,
        "questions":questions,
        "answers":answers
    }

    var blob = new Blob([JSON.stringify(obj)], { type: 'text/plain' });
    var link = document.createElement('a');
    document.body.insertAdjacentElement('beforeend', link)
    link.href = URL.createObjectURL(blob);
    link.download = 'word_game_requisite.json';
    link.click();
}

function checkIfCanPlaceWord(word, pos) {
    let xStep = 0, yStep = 0, indexWord = 0

    switch(pos[2]) {
        case 'horizontal':
            xStep = 1
            yStep = 0
            break;
        case 'vertical':
            xStep = 0
            yStep = 1
            break;
        case 'diagonal':
            xStep = 1
            yStep = 1
            break;
        case '2nd-diagonal':
            xStep = -1
            yStep = 1
            break;
        case 'horizontal-reverse':
            xStep = -1
            yStep = 0
            break;
        case 'vertical-reverse':
            xStep = 0
            yStep = -1
            break;
        case 'diagonal-reverse':
            xStep = -1
            yStep = -1
            break;
        case '2nd-diagonal-reverse':
            xStep = 1
            yStep = -1
            break;
        default:
            console.log('invalid direction!');
            return false
    }

    let currX = pos[0], currY = pos[1]
    positionsToFill = []

    while (indexWord < word.length && currX < nrCells && currY < nrCells && currX >= 0 && currY >= 0) {
        if (gameMatrix[currX][currY] != null && word[indexWord].toUpperCase() != gameMatrix[currX][currY]) {
            break
        }

        positionsToFill.push([currX, currY])

        currX += xStep
        currY += yStep
        indexWord++
    }

    if(indexWord < word.length) {
        // nu pot sa-l plasez
        return false
    }

    // plaseaza literele in cuvant
    for (index in positionsToFill) {
        gameMatrix[positionsToFill[index][0]][positionsToFill[index][1]] = word[index].toUpperCase()
    }

    return true
}

function placeWord(word) {
    startPositions = []

    directions = ['horizontal', 'vertical', 'diagonal', '2nd-diagonal', 'horizontal-reverse', 'vertical-reverse', 'diagonal-reverse', '2nd-diagonal-reverse']

    for (let i = 0; i < nrCells; i++) {
        for (let j = 0; j < nrCells; j++) {
            for (let k = 0; k < directions.length; k++) {
                startPositions.push([i, j, directions[k], Math.random()])
            }
        }
    }

    startPositions.sort((a, b) => a[3] - b[3])

    startPositions.map((elem) => elem.splice(3, 1))

    for (pos of startPositions) {
        if (checkIfCanPlaceWord(word, pos)) {
            // todo
            return true
        }
    }

    return false
}

function generateLetters() {
    let sortedAnswers = [...answersToGenerate]
    sortedAnswers.sort((a, b) => b.length - a.length)

    for (let word of sortedAnswers) {
        if(!placeWord(word)) {
            console.log(`couldn't generate`);
            break;
        }
    }

    console.log(sortedAnswers);
}

function generateRestOfGrid(e) {
    
    if (answers.length == 0) {
        alert('Adauga cel putin o intrebare si un raspuns!')
        return
    }
    
    let genButton = e.target
    genButton.style.display = 'none'

    console.log(countAddedWords, answers, answersToGenerate);

    console.log(gameMatrix);

    if (answersToGenerate.length > 0) {
        generateLetters()
    }

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    for (let i = 0; i < gameMatrix.length; i++) {
        for (let k = 0; k < gameMatrix[i].length; k++) {
            let squareDiv = document.getElementById('gridID').children[i * nrCells + k]

            if (gameMatrix[i][k] == null) {
                const randomInt = Math.floor(Math.random() * characters.length)
                gameMatrix[i][k] = characters[randomInt]
            } else {
                squareDiv.style.backgroundColor = 'rgba(0, 255, 0, 0.5)'
            }

            squareDiv.textContent = gameMatrix[i][k]
        }
    }

    // console.log(document.getElementById('gridID').children);

    console.log(gameMatrix);


    // generateDownload(
    let resetButton = document.createElement('button')
    resetButton.classList.add('button')
    resetButton.classList.add('buttonGen')
    resetButton.textContent = 'Reset'
    endDiv.insertAdjacentElement('beforeend', resetButton)

    resetButton.addEventListener('click', (e) => {
        genButton.style.display = 'inline'

        for (let i = 0; i < nrCells; i++) {
            for (let j = 0; j < nrCells; j++) {
                gameMatrix[i][j] = null
            }
        }

        let gridDiv = document.querySelector('#gridID');

        for (square of gridDiv.children) {
            square.textContent = ''
            square.countDifferentWords = 0
            square.style.backgroundColor = ''
        }

        questions = []
        answers = []
        answersToGenerate = []

        countAddedWords = 0
        counter = 0
        map.clear()

        resetButton.remove()
    
        beginDiv.innerHTML = ""
        generateQuestionForm()

    })
}

function initQuestionForm() {
    let flexDiv = document.createElement('div')
    document.body.insertAdjacentElement('beforeend', flexDiv)

    flexDiv.insertAdjacentElement('beforeend', gameDiv)
    flexDiv.classList.add('gameClass')

    beginDiv = document.createElement('div')
    gameDiv.insertAdjacentElement('beforeend', beginDiv)

    endDiv = document.createElement('div')
    endDiv.style.textAlign = 'center'
    gameDiv.insertAdjacentElement('beforeend', endDiv)

    endButton = document.createElement('button')
    endButton.textContent = 'Generate'
    
    endButton.classList.add('button')
    endButton.classList.add('buttonGen')

    endDiv.insertAdjacentElement('beforeend', endButton)

    endButton.addEventListener('click', generateRestOfGrid)

    generateQuestionForm()
    generateWordsGrid()
}

function init() {
    counter = 0
    answers = []
    answersToGenerate = []
    questions = []
    gameMatrix = []

    countAddedWords = 0

    gameDiv = document.createElement('div')
    gameDiv.id = 'gameID'
    document.body.insertAdjacentElement('beforeend', gameDiv)

    getCellsPage()

    // generateQuestionForm()
}

init()
