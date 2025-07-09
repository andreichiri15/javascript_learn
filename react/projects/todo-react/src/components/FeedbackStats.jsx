import PropTypes from 'prop-types'
import { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'

function FeedBackStats() {
    const {feedback} = useContext(FeedbackContext)

    const calculateAverage = (feedback) => {
        return feedback.length > 0 
                ? (feedback.reduce((acc, curr) => acc + curr.rating, 0) / feedback.length).toFixed(1).replace(/[.,]0$/, '')
                : 0
                                
    }

    return (
        <div className='feedback-stats'>
            <h4>{feedback.length} Reviews</h4>
            <h4>
                Average rating: {calculateAverage(feedback)} 
            </h4>
        </div>
    )
}

export default FeedBackStats