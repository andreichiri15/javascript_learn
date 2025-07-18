import Card from './shared/Card'
import Button from './shared/Button'
import {useState} from 'react'
import RatingSelect from './RatingSelect'
import { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackForm() {
    const [text, setText] = useState('')
    const [rating, setRating] = useState(10)
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [message, setMessage] = useState('')

    const {addFeedback} = useContext(FeedbackContext)

    const handleTextChange = (e) => {
        if (text === '') {
            setBtnDisabled(true)
            setMessage(null)
        } else if(text != '' && text.trim().length < 10) {
            setMessage('Text must be at least 10 characters')
            setBtnDisabled(true)
        } else {
            setMessage(null)
            setBtnDisabled(false)
        }

        setText(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (text.trim().length > 10) {
            const newFeedback = {
                text: text,
                rating: rating
            }

            addFeedback(newFeedback)

            setText('')
        }
    }

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <h2>
                    How would you rate your serice with us?
                </h2>
                <RatingSelect select={(rating) => setRating(rating)}/>
                <div className="input-group">
                    <input 
                        onChange={handleTextChange} 
                        type="text" 
                        placeholder='Write a review'
                        value = {text}
                    />
                    <Button type='submit' isDisabled={btnDisabled}>
                        Pluh
                    </Button>
                </div>

                {message && <div className='message'>{message}</div>}
            </form>
        </Card>
    )
}

export default FeedbackForm