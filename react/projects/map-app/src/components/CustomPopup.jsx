import {FaTimes} from 'react-icons/fa'

export default function CustomPopup({toggleShowCustomPopup, children}) {
    return (
        <div 
            className="custom-popup">
            <button 
                onClick={toggleShowCustomPopup}
                style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'default'
                }}>
                <FaTimes />
            </button>
            {children}
        </div>
    )
}
