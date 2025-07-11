export default function Button({children, onClickHandle, myClassName = 'button'}) {
    return (
        <button onClick={onClickHandle} className={myClassName}>
            {children}
        </button>
    )
}