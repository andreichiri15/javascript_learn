import Button from "./shared/Button"
import { useNavigate } from "react-router-dom"

export default function HomePage({setDataNull}) {
    const navigate = useNavigate()

    const onClickHandle = () => {
        setDataNull(null)
        navigate('/quiz')
    }

    return (
        <div className='homepage'>
            <header>
                <h1>My Simple React Home Page</h1>
            </header>
            <main>
                <p>Welcome to my simple React home page! This is a basic example of a React project.</p>
                <Button onClickHandle={onClickHandle}>Start Quiz</Button>
            </main>
        </div>
    )
}
