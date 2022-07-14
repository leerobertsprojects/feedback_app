import Card from "./shared/Card"
import {useState} from 'react'
import { useEffect } from "react"
import Button from "./shared/Button"
import RatingSelect from "./RatingSelect"
import {useContext} from 'react'
import FeedbackContext from "../context/FeedbackContext"

function FeedbackForm() {
  const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext)

  useEffect(() => {
    if(feedbackEdit.edit === true) {
      setBtnDiabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
    }
  }, [feedbackEdit])

  const [text, setText] = useState('')
  const [rating, setRating] = useState('10')
  const [btnDisabled, setBtnDiabled] = useState(true)
  const [message, setMessage] = useState('')

  const handleTextChange = (e) => {
    if(text === '') {
      setBtnDiabled(true)
      setMessage(null)
    } else if(text !== '' && text.trim().length <= 10) {
      setBtnDiabled(true)
      setMessage('Text must be at least 10 characters')
    } else {
      setBtnDiabled(false)
      setMessage(null)
    }
    setText(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if(text.trim().length > 10) {
      const newFeedback = {
        text: text,
        rating
      }
      if(feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item.id, newFeedback)
      } else {
        addFeedback(newFeedback)
      }

      setText('')
    }
  }
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <RatingSelect select={(rating) => setRating(rating) }/>
        <h2>How would you rate your service with us?</h2>
        {/* @todo - rating select component */}
        <div className="input-group">
          <input
            onChange={handleTextChange}
            type="text"
            placeholder="Write a review"
            value={text}
            />
          <Button
            type="submit"
            isDisabled={btnDisabled}
          >Send</Button>
         </div>
         {message && <div className="message">{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm
