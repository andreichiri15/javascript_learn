import PropTypes from 'prop-types'
import Card from './shared/Card'
import propTypes from 'prop-types'
import {FaTimes} from 'react-icons/fa'

function FeedbackItem(props) {
    return (
        <Card>
            <div className="num-display">{props.rating}</div>
            <button onClick={() => props.handleDelete(props.id)} className="close">
                <FaTimes color='purple'/>
            </button>
            <div className="text-display">
                {props.text}
            </div>
        </Card>
    )
}

FeedbackItem.propTypes = {
    rating: PropTypes.number,
    text: PropTypes.string,
}


export default FeedbackItem
