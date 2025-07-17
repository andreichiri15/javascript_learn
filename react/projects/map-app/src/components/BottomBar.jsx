import {FaTimes} from 'react-icons/fa'
import { useEffect } from 'react'
import {motion, AnimatePresence} from 'framer-motion'

export default function BottomBar({markerObj, changeCurrentSelection, setIsOpened, isOpened, children}) {
    useEffect(() => {
        if (isOpened) {
            setIsOpened(false)
        }
    })

    return (
        <AnimatePresence>
            <motion.div 
                className="bottom-bar"
                initial={{opacity: 0, height: 0}}
                animate={{opacity: 1, height: "15rem"}}
                exit={{opacity: 0, height: 0}}>
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
            </motion.div>
        </AnimatePresence>
    )
}
