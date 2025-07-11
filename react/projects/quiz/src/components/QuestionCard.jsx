import { useEffect } from 'react';
import Card from './shared/Card'

export default function QuestionCard({questionData, allAnswers, radioClickHandle}) {
    return (
        <Card>
            <h2>{atob(questionData.question)}</h2>
            <form>
                {allAnswers.map((value, index) => {
                        return (
                            <div key={index}>
                                <input onClick = {() => {radioClickHandle(index)}} type="radio" id={index} name="fav_language" value="HTML"/>
                                <label htmlFor={index}>{atob(value)}</label>
                            </div>
                            )
                        })
                    }
                {/* <div>
                    <input type="radio" id={4} name="fav_language" value="HTML"/>
                    <label htmlFor={4}>{questionData.correct_answer}</label>
                </div> */}

            </form>
        </Card>
    )
}
