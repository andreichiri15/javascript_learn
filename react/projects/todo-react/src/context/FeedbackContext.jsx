import { createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([
        {
            id:1,
            text: 'This is feedback item 1',
            rating: 10
        },
        {
            id:2,
            text: 'This is feedback item 2',
            rating: 8
        },
        {
            id:3,
            text: 'This is feedback item 3',
            rating: 9
        }
    ])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })

        console.log('pluh')
    }

    const deleteFeedback = (id) => {
        if(window.confirm('Are you sure you want to delete?')) {
            setFeedback(feedback.filter((feedbackElem) => feedbackElem.id != id))
        }
    }

    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])
    }

    return <FeedbackContext.Provider value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext