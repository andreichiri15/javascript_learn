import {FaTimes} from 'react-icons/fa'
import { useEffect } from 'react'

export default function BottomBar({markerObj, changeCurrentSelection, setIsOpened, isOpened, children}) {
    useEffect(() => {
        if (isOpened) {
            setIsOpened(false)
        }
    })

    return (
        <div className="bottom-bar">
            <button 
                onClick={() => {
                    changeCurrentSelection(null)
                }}
                style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                }}>
                <FaTimes />
            </button>
            {children}
        </div>
    )
}
