import {useState} from 'react'

export default function Square({value, handleClick, isDisabled}) {
    const handleClickActions = () => {
        console.log(isDisabled)

        if (isDisabled) {
            return
        }

        handleClick()
    }

    return (
        <>
            <div onClick={handleClickActions} className="square">
                <span>{value}</span>
            </div> 
        </>
    )
}
