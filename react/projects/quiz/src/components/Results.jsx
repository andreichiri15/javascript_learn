import Card from './shared/Card'
import { useNavigate } from 'react-router-dom'
import Button from './shared/Button'

export default function Results({data, answerHistory}) {
    const navigate = useNavigate()

    const renderResults = () => {
        return (
            <>
                {answerHistory.map((value, index) => (
                    <Card key = {index}>
                        <h2>{atob(data[index].question)}</h2>
                        <div>Correct answer:{atob(value.rightAnswer)}</div>
                        <div>Chosen answer:{atob(value.chosenAnswer)}</div>
                    </Card>
                ))}
            </>
        )
    }

    const clickReset = () => {
        navigate('/home')
    }

    return (
        <div className="result-page">
            <header>These are your results</header>
            <main>
                {renderResults()}
                <Button
                    onClickHandle={clickReset}>
                    Start Again!
                </Button>
            </main>
        </div>
    )
}
