import Button from './shared/Button'

export default function ButtonSection({winResult, turn, resetAction}) {
    function printCurrentTurn() {
        let currentTurn = turn == 0 ? '0' : 'X'

        if (winResult == 0) {
            return (
                <h2>{currentTurn} won the game!</h2>
            )
        } else if (winResult == 1) {
            return (
                <h2>{currentTurn}'s turn</h2>
            )
        } else {
            return (
                <h2>Draw!</h2>
            )
        }
    }

    return (
        <div className='button-section-container'>
            <>
                {printCurrentTurn()}
            </>
            <Button clickHandle={resetAction} isDisabled = {winResult ? false : true}>
                RESET
            </Button>
        </div>
    )
}
