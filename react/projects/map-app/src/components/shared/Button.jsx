export default function Button({children, classButton = 'button', onClick}) {
    return (
        <button onClick={onClick} className={classButton}>
            {children}
        </button>
    )
}
