export default function Burger({ changeCurrentSelection, toggleMenu, isOpened }) {
    return (
        <div className="burger" onClick={() => {
            if (!isOpened) {
                changeCurrentSelection(null);
                }
            toggleMenu();
        }}>
        <div className={`line top ${isOpened ? 'open' : ''}`} />
        <div className={`line middle ${isOpened ? 'open' : ''}`} />
        <div className={`line bottom ${isOpened ? 'open' : ''}`} />
        </div>
    );
}
