import './App.css'
import Board from './components/Board'
import ButtonSection from './components/ButtonSection'
import { useState } from 'react'

function App() {
    const [winResult, setWinResult] = useState(0)
    const [currentTurn, setCurrentTurn] = useState(0)
    const [squareValues, setSquareValues] = useState(Array(9).fill(null))
    const [buttonsDisabled, setButtonsDisabled] = useState(false)

    const winEvent = () => {
        setCurrentTurn((currentTurn) => currentTurn ^ 1)

        setWinResult(1)
        setButtonsDisabled(true)
    }

    const drawEvent = () => {
        setWinResult(2)
        setButtonsDisabled(true)
    }

    const alternateTurn = () => {
        let nextTurn = currentTurn ^ 1
        
        setCurrentTurn(nextTurn)

        return currentTurn == 0 ? '0' : 'X'
    }

    const gameEnd = (newSquareValues) => {
        for (let i = 0; i <= 6; i+=3) {
            if (newSquareValues[i] != null && newSquareValues[i] == newSquareValues[i + 1] && newSquareValues[i + 1] == newSquareValues[i + 2]) {
                return 1
            }
        }

        for (let i = 0; i < 3; i++) {
            if (newSquareValues[i] != null && newSquareValues[i] == newSquareValues[i + 3] && newSquareValues[i + 3] == newSquareValues[i + 6]) {
                return 2
            }
        }

        if (newSquareValues[0] != null && newSquareValues[0] == newSquareValues[4] && newSquareValues[4] == newSquareValues[8]) {
            return 3
        }

        if (newSquareValues[2] != null && newSquareValues[2] == newSquareValues[4] && newSquareValues[4] == newSquareValues[6]) {
            return 4
        }

        return 0
    }

    const resetAction = () => {
        let newSquareValues = Array(9).fill(null)

        setSquareValues(newSquareValues)
        setButtonsDisabled(false)
        setWinResult(false)
    }

    const onPlay = (newSquareValues) => {
        setSquareValues(newSquareValues)

        if (gameEnd(newSquareValues) > 0) {
            winEvent()
        } else if (!squareValues.includes(null)) {
            drawEvent()
        }
    }

    return (
        <div className='game-container'>
            <Board onPlay = {onPlay} squareValues = {squareValues} alternateTurn = {alternateTurn} buttonsDisabled={buttonsDisabled}/>
            <ButtonSection turn = {currentTurn} winResult = {winResult} resetAction={resetAction}/>
        </div>
    )
}

export default App
