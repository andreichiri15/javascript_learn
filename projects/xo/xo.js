playerSymbol = ['X', 'O']

let initPlayer = 0

let nrSquares = 0;

let gameMatrix = []

const grid = document.getElementById('grid')
const squares = grid.children

const heading = document.getElementById('heading')
heading.style.display = 'none'

const endgameDiv = document.getElementById('endgame')

const endgameButton = endgameDiv.children[0]

const textInput = document.getElementById('inputDiv').children[1]

const submitButton = document.querySelector('.buttonInput')

let countMoves

winningPos = []
let lineType

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
}

function drawLine() {
    console.log(winningPos);
    console.log(lineType);

    width = 4;
    height = 54 * nrSquares;

    let lineDiv = document.createElement('div')
    lineDiv.id = 'line';
    lineDiv.style.width = width + 'px';
    lineDiv.style.height = height + 'px';
    lineDiv.style.backgroundColor = 'red'
    lineDiv.style.position = 'absolute'

    lineDiv.style.borderRadius = '5px';

    console.log(winningPos[0]);

    var cell1 = grid.children[nrSquares * winningPos[0][0] + winningPos[0][1]]

    console.log(getOffset(cell1));

    if (lineType == 'horizontal') {
        lineDiv.style.transformOrigin = '50% 0';
        lineDiv.style.transform = 'rotate(-90deg)';

        lineDiv.style.left = getOffset(cell1).left + 'px'
        lineDiv.style.top = getOffset(cell1).top + 25 + 2 + 'px'
    } else if (lineType == 'vertical') {
        lineDiv.style.left = getOffset(cell1).left + 25 + 'px'
        lineDiv.style.top = getOffset(cell1).top + 'px'
    } else if (lineType == 'firstDiag') {
        lineDiv.style.transformOrigin = '50% 0%';
        lineDiv.style.transform = 'rotate(-45deg)';

        lineDiv.style.height = height * 1.414 + 'px' 

        lineDiv.style.left = getOffset(cell1).left + 'px'
        lineDiv.style.top = getOffset(cell1).top + 'px'
    } else if (lineType == 'secondDiag') {
        lineDiv.style.transformOrigin = '50% 0';
        lineDiv.style.transform = 'rotate(45deg)';

        lineDiv.style.height = height * 1.414 + 'px'

        lineDiv.style.left = getOffset(cell1).left + 50 + 'px'
        lineDiv.style.top = getOffset(cell1).top + 'px'
    }

    endgameDiv.after(lineDiv)
}

const clickEvent = (e) => {
    let squareId = Number(e.target.id.slice(2)) - 1

    let i = Math.floor(squareId / nrSquares);
    let j = squareId % nrSquares;

    if (gameMatrix[i][j] == -1) {
        countMoves++

        gameMatrix[i][j] = currentPlayer

        e.target.textContent = playerSymbol[currentPlayer]

        let playerWon = checkIfWin()

        if(playerWon >= 0) {
            removeListeners();
            heading.innerText = `Player ${playerSymbol[currentPlayer]} WON`
            endgameDiv.style.display = 'flex'

            drawLine()

            return;
        } else if (countMoves == nrSquares * nrSquares) {
            removeListeners()
            heading.innerText = `TIE!`
            endgameDiv.style.display = 'flex'
            
            return;
        }

        currentPlayer ^= 1;

        heading.innerText = `Player ${playerSymbol[currentPlayer]}'s turn!`
    }
}

function removeListeners() {
    for(square of squares) {
        square.removeEventListener('click', clickEvent)
    }
}

function checkIfWin() {
    for(let i = 0; i < nrSquares; i++) {
        let j = 1
        winningPos = [[i, 0]]

        for (j; j < nrSquares; j++) {
            if (gameMatrix[i][j] == -1 || gameMatrix[i][j] != gameMatrix[i][j - 1]) {
                break;
            }

            winningPos.push([i, j])
        }

        if (j == nrSquares) {
            lineType = 'horizontal'
            return currentPlayer
        }

        j = 1
        winningPos = [[0, i]]

        for (j; j < nrSquares; j++) {
            if (gameMatrix[j][i] == -1 || gameMatrix[j - 1][i] != gameMatrix[j][i]) {
                break;
            }

            winningPos.push([i, j])
        }

        if (j == nrSquares) {
            lineType = 'vertical'
            return currentPlayer
        }
    }

    let k = 1
    winningPos = [[0, 0]]

    for (k; k < nrSquares; k++) {
        if (gameMatrix[k][k] == -1 || gameMatrix[k][k] != gameMatrix[k - 1][k - 1]) {
            break
        }

        winningPos.push([k, k])
    }

    if (k == nrSquares) {
        lineType = 'firstDiag'
        return currentPlayer
    }

    k = 1
    winningPos = [[0, nrSquares - 1]]

    for (k; k < nrSquares; k++) {
        if(gameMatrix[k][nrSquares - k - 1] == -1 ||
            gameMatrix[k][nrSquares - k - 1] != gameMatrix[k - 1][nrSquares - k]) {
            break
        }

        winningPos.push([k, nrSquares - k - 1])
    }

    if (k == nrSquares) {
        lineType = 'secondDiag'
        return currentPlayer
    }

    return -1;
}

function initDivs() {
    // while(grid.firstChild) {
    //     grid.removeChild(grid.lastChild)
    // }

    grid.textContent = ''

    for (let i = 0; i < nrSquares * nrSquares; i++) {
        let newSquare = document.createElement('div')
        newSquare.id = 'sq' + (i + 1)
        newSquare.classList.add('square')

        grid.insertAdjacentElement('beforeend', newSquare)
    }
}

function initGame() {
    for (let i = 0; i < nrSquares; i++) {
        gameMatrix.push([])
        for (let j = 0; j < nrSquares; j++) {
            gameMatrix[i][j] = -1;
        }
    }

    initDivs()

    grid.style.gridTemplateColumns = `repeat(${nrSquares}, 55px)`

    currentPlayer = initPlayer

    heading.textContent = `Player ${playerSymbol[currentPlayer]}'s turn!`

    endgameDiv.style.display = 'none'

    var endLine = document.getElementById('line')

    if (endLine) endLine.remove();

    countMoves = 0

    for(square of squares) {
        square.textContent = ""
        square.addEventListener('click', clickEvent)
    }
}

function addListenerToButton() {
    submitButton.addEventListener('click', (e) => {
        cellInput = submitButton.previousElementSibling
        
        var newNrSquares = Number(cellInput.value)

        if (newNrSquares && newNrSquares >= 0 && newNrSquares <= 10) {
            nrSquares = newNrSquares
            gameMatrix = []
            heading.style.display = 'block'

            initGame()
        } else {
            alert("Input has to be a positive non-null number smaller than 10")
        }
    })
}


console.log(textInput);

textInput.addEventListener("input", (e) => {
    textInput.value = textInput.value.replace(/[^0-9]/, '')
    textInput.value = textInput.value.slice(0, 2)
})

addListenerToButton()

initGame()

endgameButton.addEventListener('click', initGame)
