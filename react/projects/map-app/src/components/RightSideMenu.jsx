import { useNavigate } from "react-router-dom"
import {motion, AnimatePresence} from 'framer-motion'

export default function Menu({toggleMenu, setMarkerMode}) {
    const navigate = useNavigate()

    return (
        <motion.div
            key={'burger-menu'}
            className="right-side-menu"
            initial={{opacity: 0, width: 0}}
            animate={{opacity: 1, width: "15rem"}}
            exit={{opacity:0, width: 0}}>
            {/* TODO */}
            <div onClick={() => navigate('/about')}>About us</div>
            <div onClick={() => setMarkerMode(1)}>Insert New Location</div>
            <div onClick={() => setMarkerMode(2)}>Edit Location</div>
            <div onClick={() => navigate('/login')}>Login</div>

            <div onClick={toggleMenu}>Close</div>
        </motion.div>
    )
}
