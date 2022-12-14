import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { thunkCreateReview } from "../../../store/review"
import StarHovering from "./StarHovering"

import "./CreateReview.css"

const CreateReview = ({productId, setShowNewReviewModal}) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [review, setReview] = useState("")
  const [rating, setStars] = useState(null)
  const [errors, setErrors] = useState([])

  const [hasSubmitted, setHasSubmitted] = useState(false)

  const currentUser = useSelector((state) => state.session.user)

  useEffect(() => {
    if (currentUser) setErrors([])
    else setErrors(["You must be logged in to leave a review"])
  }, [currentUser])


  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([])
    setHasSubmitted(true)

    const errorsArr = []
    if (rating <= 0) errorsArr.push("Please enter a star rating between 1 and 5")
    if (review.length > 1000) errorsArr.push("Please enter a valid review fewer than 1000 characters long")
    if (!review) errorsArr.push("Please complete your review.")
    setErrors(errorsArr)

    if (errorsArr.length) return

    const reviewInfo = { review:review, rating:rating }

    const newReview = await dispatch(thunkCreateReview(reviewInfo, productId, currentUser))
      .catch(async (res) => {
        const message = await res.json()
        const messageErrors = []
        if (message) {
          messageErrors.push(message.message)
          setErrors(messageErrors)
        }
      })

    if (newReview) setShowNewReviewModal(false)
    reset()
    // history.push(`/products/${productId}`) //<<<<<
  }

  const reset = () => {
    setReview("")
    setStars(5)
    setErrors([])
    setHasSubmitted(false)
  }

  return (
    <div className="create-review-modal-whole">
      <div className="review-modal-subheader">Did you enjoy this product?</div>

      <div className="validation-errors">
        {
        hasSubmitted &&
        errors &&
        errors.map((error)=>(<div key={error}>{error}</div>))
        }
      </div>

      {/* <div className="create-review-form"> */}
      <form onSubmit={handleSubmit}>
      <div className="create-form-input-wrapper">

            <label className="create-review-field">
              Rating:&nbsp;
              {/* <select
                type="number"
                value={stars}
                onChange={(e) => setStars(e.target.value)}
              >
                {[1,2,3,4,5].map((num)=>(<option>{num}</option>))}
              </select> */}
              <div className="create-hover">
                <StarHovering stars={rating} setStars={setStars}/>
              </div>
            </label>
            <div className="form-input-break"></div>
            <label className="review-field">
              Helpful reviews on Zesty mention:<span>*</span>
              <ul>
                <li>the quality of the item</li>
                <li>if the item matched the description</li>
                <li>if the item met your expectations</li>
              </ul>
              <textarea
                type="text"
                value={review}
                placeholder="Review"
                onChange={(e) => setReview(e.target.value)}
              />
            </label>
        </div>
        <div className="create-modal-button-wrap">
        <button
        // disabled={
        //   hasSubmitted &&
        //   errors.length > 0 ? true : false
        // }
        className="modal-submit-button"
        >
          Submit Review
        </button>
        </div>

      </form>
      </div>
    // </div>
  )
}

export default CreateReview
