import Square from '../components/Square'
import {useState} from 'react'

export default function Board({alternateTurn, squareValues, onPlay, buttonsDisabled}) {
    const handleClick = (index) => {
        const newSquareValues = [...squareValues]

        if (newSquareValues[index] != null) {
            return
        }
        newSquareValues[index] = alternateTurn()

        if (onPlay(newSquareValues)) {
        }
    }

    return (
        <div className='board'>
            {Array(9).fill(null).map((_, index) => {
                return (
                    <Square
                        value={squareValues[index]}
                        handleClick = {() => handleClick(index)}
                        isDisabled = {buttonsDisabled}
                        key = {index}>
                    </Square>
                )
            })}
        </div>
    )
}
