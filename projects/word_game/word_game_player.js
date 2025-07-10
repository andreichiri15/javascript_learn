let filepath = './word_game_requisite_test_2.json'
let globalData

let currentSelection
let hoverHistory
let inSelection
let lastTarget
let lastDirection
let countCorrectAnswers

let answersRemaining

let flexDiv
let startDiv
let direction
let gridDiv

let outsideGrid

let squaresColor = 'rgba(255,255,255,0)'

function fetchJSONData(filepath) {
    fetch(filepath)
        .then(response => response.json())
        .then(data => {
            globalData = data
            init()
        })
        .catch(error => console.error('Error fetching JSON: ', error))
}

function selectSquare(e) {
    inSelection = true
    lastTarget = null

    direction = null

    startDiv = e.target

    currentSelection = [e.target]

    hoverHistory = []

    console.log(currentSelection);
}

function getDirection(coord1, coord2) {
    const dx = coord2.x - coord1.x;
    const dy = coord2.y - coord1.y;
    
    if (dx === 0 && dy === 0) return 'same point';
    
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    
    // Calculate how close we are to a perfect diagonal
    const diagonalRatio = Math.min(absDx, absDy) / Math.max(absDx, absDy);
    const isCloseToDiagonal = diagonalRatio > 0.35; // Adjust threshold as needed
    
    // Pure cases
    if (dx === 0) {
        return dy < 0 ? 'vertical' : 'vertical reverse';
    }
        
    if (dy === 0) {
        return dx < 0 ? 'horizontal' : 'horizontal reverse';
    }
    
    // Diagonal or near-diagonal cases
    if (absDx === absDy || isCloseToDiagonal) {
        if (dx > 0 && dy < 0) {
            return '2nd diagonal';
        }
        if (dx > 0 && dy > 0) {
            return 'diagonal reverse';
        }
        if (dx < 0 && dy < 0) {
            return 'diagonal';
        }
        if (dx < 0 && dy > 0) {
            return '2nd diagonal reverse';
        }
    }
    
    // Non-diagonal cases
    if (absDx > absDy) {
        return dx < 0 ? 'horizontal' : 'horizontal reverse';
    }
    return dy < 0 ? 'vertical' : 'vertical reverse';
}

function determineDirAndSetHoverHistory(initDiv, destDiv) {
    const coord1 = {
        y: Math.floor(parseInt(destDiv.id, 10) / Number(globalData.nrCells)),
        x: parseInt(destDiv.id) % Number(globalData.nrCells)
    }
    
    const coord2 = {
        y: Math.floor(parseInt(initDiv.id) / Number(globalData.nrCells)),
        x: parseInt(initDiv.id) % Number(globalData.nrCells)
    }
    
    if (destDiv != lastTarget) {
        hoverHistory = []
        direction = getDirection(coord1, coord2)
        console.log(direction)

        for (child of gridDiv.children) {
            child.style.backgroundColor = squaresColor
        }

        let x = coord2.x;
        let y = coord2.y;

        // Determine step values based on direction
        let xStep, yStep;

        switch(direction) {
            case 'horizontal':
                xStep = 1; yStep = 0;
                break;
            case 'horizontal reverse':
                xStep = -1; yStep = 0;
                break;
            case 'vertical':
                xStep = 0; yStep = 1;
                break;
            case 'vertical reverse':
                xStep = 0; yStep = -1;
                break;
            case 'diagonal':
                xStep = 1; yStep = 1;
                break;
            case 'diagonal reverse':
                xStep = -1; yStep = -1;
                break;
            case '2nd diagonal':
                xStep = -1; yStep = 1;
                break;
            case '2nd diagonal reverse':
                xStep = 1; yStep = -1;
                break;
            default:
                xStep = Number(globalData.nrCells); yStep = Number(globalData.nrCells);
        }

        const DISTANCE_THRESHOLD = 1.5;

        while(true) {
            const newId = y * Number(globalData.nrCells) + x;
            const currDiv = document.getElementById(`${newId}square`);
 
            currDiv.style.backgroundColor = 'rgb(210, 211, 174)';
            hoverHistory.push(currDiv);
            
            if ((direction == 'horizontal' || direction == 'horizontal reverse') && x == coord1.x) {
                break
            }

            if ((direction == 'vertical' || direction == 'vertical reverse') && y == coord1.y) {
                break
            }

            if (direction.includes('diagonal')) {
                const distance = Math.sqrt(Math.pow(x - coord1.x, 2) + Math.pow(y - coord1.y, 2));
                // if (distance < DISTANCE_THRESHOLD) {
                    // break;
                if(!outsideGrid && y == coord1.y) {
                    break;
                }

                if(!outsideGrid && Math.abs(y - coord1.y) > Math.abs(x - coord1.x) && y == coord1.y) {
                    break;
                }

                if(!outsideGrid && Math.abs(y - coord1.y) <= Math.abs(x - coord1.x) && x == coord1.x) {
                    break;
                }
            }
            
            x += xStep;
            y += yStep;
            
            if (x < 0 || y < 0 || x >= globalData.nrCells || y >= globalData.nrCells) {
                break;
            }
        }
    }

    // console.log(hoverHistory);

    lastTarget = destDiv
    lastDirection = direction
}

function moveSelectSquare(e) {
    outsideGrid = false

    if (!inSelection) {
        return
    }

    determineDirAndSetHoverHistory(startDiv, e.target)
}

function markCorrectAnswer(startSelection, currentSelection, borderColor, selectionDirection) {
    let div = document.createElement('div')
    // div.id = 'correctAnswer'
    div.classList.add('answerMarking')

    var height = startSelection.getBoundingClientRect().height, width = currentSelection.length * (height);

    gridDiv.insertAdjacentElement('beforeend', div)
    div.style.width = `${width}px`
    div.style.height = `${height}px`
    div.style.backgroundColor = 'rgba(255, 255, 255, 0)'
    div.style.border = `4px solid ${borderColor}`
    div.style.borderRadius = '25px'
    div.style.pointerEvents = 'none'
    div.style.boxSizing = 'border-box'

    div.style.position = 'absolute'
    div.style.top = startSelection.offsetTop + 'px'
    div.style.left = startSelection.offsetLeft + 'px'

    if (selectionDirection.includes('horizontal reverse')) {
        console.log('intru aici?')
        div.style.left = startSelection.offsetLeft - height * (currentSelection.length - 1) + 'px'
    }

    if (selectionDirection.includes('vertical')) {
        console.log('verticall');
        div.style.left = startSelection.offsetLeft + height + 'px'
        if (selectionDirection.includes('reverse')) {
            div.style.top = startSelection.offsetTop - height * (currentSelection.length - 1) + 'px'
        }
        div.style.transform = `rotate(${90}deg)`
        div.style.transformOrigin = '0 0'
    } else if (selectionDirection.includes('diagonal')) {
        
        if (selectionDirection.includes('2nd')) {
            if (selectionDirection.includes('reverse')) {
                div.style.left = startSelection.offsetLeft - height / 4 + 'px'
                div.style.top = startSelection.offsetTop + height / 2 + 'px'
                div.style.transform = `rotate(${-45}deg)`

            } else {
                div.style.left = startSelection.offsetLeft * height / 4 + 'px'
                div.style.top = startSelection.offsetTop + height / 2 + 'px'
                div.style.transform = `rotate(${135}deg)`
            }

        } else {
            if (selectionDirection.includes('reverse')) {
                div.style.left = startSelection.offsetLeft + height / 2 + 'px'
                div.style.top = startSelection.offsetTop + 1.5 * height + 'px'
                div.style.transform = `rotate(${-135}deg)`
            } else {
                div.style.left = startSelection.offsetLeft + height / 2 + 'px'
                div.style.top = startSelection.offsetTop - height / 4 + 'px'
                div.style.transform = `rotate(${45}deg)`
            }
        }

        div.style.transformOrigin = '0 0'
        div.style.width = width * Math.sqrt(2) - (height / 4) * Math.sqrt(2) + 'px'
        // div.style.height = height * Math.sqrt(2) + 'px'
    }
}

function stopSelection(e = null) {
    lastTarget = null

    if (!inSelection) {
        return
    }

    lastClosest = null

    console.log(hoverHistory);

    currentSelection = hoverHistory.map((elm) => elm.textContent).join('');

    if (answersRemaining.includes(currentSelection.toLowerCase())) {
        countCorrectAnswers++;

        var index = answersRemaining.indexOf(currentSelection.toLowerCase())
        flexDiv.children[0].children[index].children[1].value = currentSelection.toLowerCase()

        markCorrectAnswer(hoverHistory[0], currentSelection, 'green', direction)
        
        answersRemaining[index] = null;
    }
    
    for (child of gridDiv.children) {
        child.style.backgroundColor = ''
    }
    hoverHistory = []
    inSelection = false

    if (countCorrectAnswers == answersRemaining.length) {
        flexDiv.previousElementSibling.textContent = 'You found all the answers!'
    }
}

function leaveGridEvent(e = null) {
    outsideGrid = true
}

let lastClosest = null

function moveOutsideGridEvent(e) {
    if (!inSelection) {
        return
    }

    if (!outsideGrid) {
        return
    }

    let minDistance = Infinity
    let minDiv = null

    function getOffset(element)
    {
        if (!element.getClientRects().length)
        {
            return { top: 0, left: 0 };
        }

        let rect = element.getBoundingClientRect();
        let win = element.ownerDocument.defaultView;
        return (
        {
            top: rect.top + win.pageYOffset,
            left: rect.left + win.pageXOffset
        });   
    }

    function calculateDistance(elem, mouseX, mouseY) {
        return Math.floor(Math.sqrt(
            Math.pow(mouseX - (getOffset(elem).left+(elem.clientWidth/2)), 2) + 
            Math.pow(mouseY - (getOffset(elem).top+(elem.clientHeight/2)), 
        2)));
    }

    for (child of gridDiv.children) {
        mX = e.pageX;
        mY = e.pageY;
        distance = calculateDistance(child, mX, mY);
    
        if (distance < minDistance) {
            minDistance = distance
            minDiv = child
        }
    }

    if (minDiv != lastClosest) {
        // console.log(minDiv);
        determineDirAndSetHoverHistory(startDiv, minDiv)
    }

    lastClosest = minDiv
}

function giveUpAction(e) {
    console.log(globalData.formMap, typeof globalData.formMap)

    for (answerInfo of Object.entries(globalData.formMap)) {
        let answer = answerInfo[0]
        let answerPos = {
            x: answerInfo[1][0],
            y: answerInfo[1][1]
        }
        let answerDirection = answerInfo[1][2]

        if (!answersRemaining.includes(answer)) {
            continue
        }

        answerDirection = answerDirection.replaceAll('-', ' ')

        let squareId = parseInt(globalData.nrCells, 10) * parseInt(answerPos.y, 10) + parseInt(answerPos.x, 10) + 'square'

        let divStart = document.getElementById(squareId)

        markCorrectAnswer(divStart, answer, 'red', answerDirection)
        console.log(divStart, answer, answerDirection)
    }

    e.target.nextElementSibling.style.display = 'inline'
    e.target.style.display = 'none'
}

function resetAction(e) {
    e.target.previousElementSibling.style.display = 'inline'
    e.target.style.display = 'none'

    currentSelection = []
    hoverHistory = []
    inSelection = false
    countCorrectAnswers = 0

    answersRemaining = [...globalData.answers]

    let allMarkings = document.querySelectorAll('.answerMarking')

    for (let answerMarking of allMarkings) {
        answerMarking.remove()
    }

    let allInputs = document.querySelectorAll('input')

    for (let input of allInputs) {
        input.value = 'Not answered yet.'
    }
}

function createGrid() {
    let rightSideDiv = document.createElement('div')
    flexDiv.insertAdjacentElement('beforeend', rightSideDiv)

    rightSideDiv.classList.add('right-side-wrapper')

    gridDiv = document.createElement('div');
    gridDiv.classList.add('gridClass')
    gridDiv.style.gridTemplateColumns = `repeat(${globalData.nrCells}, 50px)`

    rightSideDiv.insertAdjacentElement('beforeend', gridDiv)

    for (let i = 0; i < globalData.nrCells; i++) {
        for (let j = 0; j < globalData.nrCells; j++) {
            let squareDiv = document.createElement('div')
            squareDiv.classList.add('squareClass')
            squareDiv.id = i * globalData.nrCells + j + 'square'

            squareDiv.textContent = globalData.gameMatrix[i][j]

            gridDiv.insertAdjacentElement('beforeend', squareDiv)

            // squareDiv.addEventListener('click', selectSquare)
            squareDiv.addEventListener('mousedown', selectSquare)
            squareDiv.addEventListener('mouseup', stopSelection)
            squareDiv.addEventListener('mousemove', moveSelectSquare)

            squareDiv.setAttribute("colorSquare", squaresColor)
        }
    }
    
    gridDiv.addEventListener('mouseleave', leaveGridEvent)

    let giveUpButton = document.createElement('button')
    giveUpButton.textContent = 'Give Up'
    giveUpButton.classList.add('button')
    giveUpButton.classList.add('buttonGen')
    rightSideDiv.insertAdjacentElement('beforeend', giveUpButton)

    giveUpButton.addEventListener('click', giveUpAction)


    let resetButton = document.createElement('button')
    resetButton.textContent = 'Reset'
    resetButton.classList.add('button')
    resetButton.classList.add('buttonGen')
    rightSideDiv.insertAdjacentElement('beforeend', resetButton)

    resetButton.style.display = 'none'

    resetButton.addEventListener('click', resetAction)
}

function createQuestionDiv() {
    let questionSectionDiv = document.createElement('div')
    questionSectionDiv.classList.add('qaWrapper')

    flexDiv.insertAdjacentElement('beforeend', questionSectionDiv)

    for (let i = 0; i < answersRemaining.length; i++) {
        let questionAnswerDiv = document.createElement('div')
        questionSectionDiv.insertAdjacentElement('beforeend', questionAnswerDiv)

        questionAnswerDiv.classList.add('qaClass')

        let questionDiv = document.createElement('div')
        questionAnswerDiv.insertAdjacentElement('beforeend', questionDiv)
        questionDiv.style.overflowX = 'auto'
        questionDiv.style.textWrap = 'nowrap'

        questionDiv.textContent = globalData.questions[i]

        let answerDiv = document.createElement('input')
        questionAnswerDiv.insertAdjacentElement('beforeend', answerDiv)

        answerDiv.readOnly = true
        answerDiv.value = 'Not answered yet.'
    }
}

function handleMouseUpDocument() {
    // if (inSelection)
    // console.log('mouse up');
    if (inSelection) {
        stopSelection()
    }
}

function init() {
    console.log(globalData);

    currentSelection = []
    hoverHistory = []
    inSelection = false
    countCorrectAnswers = 0

    answersRemaining = [...globalData.answers]

    let bigDiv = document.createElement('div')
    document.body.insertAdjacentElement('beforeend', bigDiv)

    titleDiv = document.createElement('h2')
    bigDiv.insertAdjacentElement('beforeend', titleDiv)

    titleDiv.textContent = 'Find the answers to the questions in the given grid!'

    flexDiv = document.createElement('div')
    flexDiv.classList.add('flexClass')
    bigDiv.insertAdjacentElement('beforeend', flexDiv)

    document.addEventListener('mouseup', handleMouseUpDocument)

    document.addEventListener('mousemove', moveOutsideGridEvent)

    createQuestionDiv()
    createGrid()
}

fetchJSONData(filepath)