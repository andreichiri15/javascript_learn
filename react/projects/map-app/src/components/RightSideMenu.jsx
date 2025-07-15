import { useNavigate } from "react-router-dom"

export default function Menu({toggleMenu, setMarkerMode}) {
    const navigate = useNavigate()

    return (
        <div className="right-side-menu">
            {/* TODO */}
            <div>About us</div>
            <div onClick={() => setMarkerMode(1)}>Insert New Location</div>
            <div onClick={() => setMarkerMode(2)}>Edit Location</div>
            <div onClick={() => navigate('/login')}>Login</div>

            <div onClick={toggleMenu}>Close</div>
        </div>
    )
}
