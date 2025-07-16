export default function Burger({changeCurrentSelection, toggleMenu, isOpened}) {
    return (
        <div 
            onClick={() => {
                if (!isOpened) {
                    changeCurrentSelection(null)
                }
                toggleMenu()
            }} 
            className="burger">
            <div/>
            <div/>
            <div/>
        </div>
    )
}
