import React, { useState } from "react";
import { useParams } from "react-router-dom";
import RestFinder from "../api/RestFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { useContext } from "react";

const AddReview = () => {
  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("Rating");
  const { id } = useParams();
  const { addReview } = useContext(RestaurantsContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const restaurant_id = id;

    try {
      const response = await RestFinder.post("/reviews", {
        restaurant_id,
        name,
        review: reviewText,
        rating,
      });

      if (response.status === 200) {
        addReview(response.data);
        setName("");
        setReviewText("");
        setRating("Rating");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mb-2">
      <form action="">
        <div className="form-row">
          <div className="form-group col-8">
            <label className="mx-2" htmlFor="name">
              Name:
            </label>
            <input value={name} className="form-control" type="text" id="name" placeholder="name" onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group col-4">
            <label htmlFor="rating">Rating:</label>
            <select className="form-control" type="custom-select" id="rating" placeholder="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
              <option disabled>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="review">Review</label>
          <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} id="review" className="form-control"></textarea>
        </div>
        <button onClick={handleSubmit} className="btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddReview;
