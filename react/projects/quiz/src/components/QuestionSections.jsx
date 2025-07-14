import Button from './shared/Button'
import QuestionCard from './QuestionCard'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import NR_QUEST from './shared/cosntants'

export default function QuestionSections({data, registerAnswer}) {
    const [currentIndex, setCurrentIndex] = useState(0)
    let shuffledAnswers = useRef(shuffleArray([...data[0].incorrect_answers, data[0].correct_answer]))

    const navigate = useNavigate(); 

    function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    let currentPressed = useRef(null)

    const handleClick = () => {
        if (!currentPressed) {
            alert("Select an answer before submitting!")
            return
        }
        
        registerAnswer(shuffledAnswers.current[currentPressed.current], data[currentIndex].correct_answer)
    
        if (currentIndex + 1 == NR_QUEST) {
            navigate('/results')
            return
        }

        shuffledAnswers.current = shuffleArray([...data[currentIndex + 1].incorrect_answers, data[currentIndex + 1].correct_answer])
        console.log(atob(shuffledAnswers.current[0]))

        setCurrentIndex(currentIndex + 1)
    }

    const radioClickHandle = (value) => {
        currentPressed.current = value
    }

    return (
        <div className='question-wrapper'>
            <QuestionCard 
                questionData = {data[currentIndex]}  
                allAnswers = {shuffledAnswers.current}
                radioClickHandle = {radioClickHandle}/>
            <Button onClickHandle={handleClick} myClassName={'button buttonSubmit'}>
                Submit
            </Button>
        </div>
    )
}
