import { useNavigate } from "react-router-dom"
import {motion, AnimatePresence} from 'framer-motion'
import logo from '../assets/logo_map.svg'

export default function Menu({toggleMenu, setMarkerMode}) {
    const navigate = useNavigate()

    return (
        <div className='right-side-menu'>

            {/* header */}
            <div className="right-header"
                style={{backgroundColor: "rgba(0, 0, 0, 0.1)"}}>
                <img
                    style={{height: "3rem", width: "3rem"}} 
                    src={logo} 
                    alt="" 
                    onClick={() => navigate('/home')}/>
            </div>

            {/* body */}
            <div>
                <div onClick={() => navigate('/about')}>About us</div>
                <div onClick={() => setMarkerMode(1)}>Insert New Location</div>
                <div onClick={() => navigate('/recommendations')}> Recommendations</div>

                <div onClick={toggleMenu}>Close</div>
            </div>
            
            {/* footer */}
            <div>
                <div>Profile</div>
                <div>Logout</div>
            </div>
        </div>
    )
}
