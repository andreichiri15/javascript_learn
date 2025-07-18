import { useNavigate } from "react-router-dom"
import logo from '../assets/logo_map.svg'
import profile_logo from '../assets/profile.svg'
import logout_logo from '../assets/logout.svg'
import insert_loc_logo from '../assets/insert_loc.svg'
import recommend_logo from '../assets/recommend.svg'
import close_logo from '../assets/close.svg'
import about_logo from '../assets/about.svg' // corrected

export default function Menu({ toggleMenu, setMarkerMode }) {
    const navigate = useNavigate()

    const menuItemStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '1rem',
        cursor: 'pointer',
    }

    const iconStyle = {
        height: '1.2rem',
        width: '1.2rem',
    }

    return (
        <div className='right-side-menu'>

            {/* header */}
            <div className="right-header">
                <img
                    style={{ height: "3rem", width: "3rem", cursor: "pointer"}}
                    src={logo}
                    alt="Home"
                    onClick={() => navigate('/home')}
                />
            </div>

            {/* body */}
            <div>
                <div style={menuItemStyle} onClick={() => navigate('/about')}>
                    <img src={about_logo} alt="About" style={iconStyle} />
                    About us
                </div>

                <div style={menuItemStyle} onClick={() => setMarkerMode(1)}>
                    <img src={insert_loc_logo} alt="Insert" style={iconStyle} />
                    Insert New Location
                </div>

                <div style={menuItemStyle} onClick={() => navigate('/recommendations')}>
                    <img src={recommend_logo} alt="Recommendations" style={iconStyle} />
                    Recommendations
                </div>

                <div style={menuItemStyle} onClick={toggleMenu}>
                    <img src={close_logo} alt="Close" style={iconStyle} />
                    Close
                </div>
            </div>

            {/* footer */}
            <div>
                <div style={menuItemStyle} onClick={() => navigate('/profile')}>
                    <img src={profile_logo} alt="Profile" style={iconStyle} />
                    Profile
                </div>

                <div style={menuItemStyle} onClick={() => navigate('/logout')}>
                    <img src={logout_logo} alt="Logout" style={iconStyle} />
                    Logout
                </div>
            </div>
        </div>
    )
}
