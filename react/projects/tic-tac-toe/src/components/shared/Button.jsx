export default function Button({children, isDisabled, clickHandle}) {
    return (
        <button onClick={clickHandle} disabled={isDisabled} className="button">
            {children}
        </button>
    )
}
