import Card from './shared/Card'
import Button from './shared/Button'
import {useState} from 'react'

function FeedbackForm() {
    const [text, setText] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [message, setMessage] = useState('')

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

    const isInputSufficient = () => {
        console.log(text.length >= 10 ? true : false);
    }

    return (
        <Card>
            <form>
                <h2>
                    How would you rate your serice with us?
                </h2>
                {/* TODO: rating select component */}
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