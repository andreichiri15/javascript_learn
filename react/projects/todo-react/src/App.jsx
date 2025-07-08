import {useState} from 'react'
import Header from "./components/Header"
import FeedbackData from "./data/FeedbackData"
import FeedbackList from './components/FeedbackList'
import FeedBackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'

function App() {
    const [feedback, setFeedback] = useState(FeedbackData)

    const deleteFeedback = (id) => {
        if(window.confirm('Are you sure you want to delete?')) {
            setFeedback(feedback.filter((feedbackElem) => feedbackElem.id != id))
        }
    }

    return (
        <>
            <Header />
            <div className='container'>
                <FeedbackForm />
                <FeedBackStats feedback = {feedback}/>
                <FeedbackList feedback={feedback}
                    handleDelete = {deleteFeedback} />
            </div>
        </>
    )
}

export default App