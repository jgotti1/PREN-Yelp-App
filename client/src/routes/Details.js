import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RestFinder from "../api/RestFinder";
import AddReview from "../components/AddReview";
import Reviews from "../components/Reviews";
import StarRating from "../components/StarRating";
import { RestaurantsContext } from "../context/RestaurantsContext";

const Details = () => {
  const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);
  const { reviews } = useContext(RestaurantsContext);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestFinder.get(`/${id}`);
        setSelectedRestaurant(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setSelectedRestaurant, id, reviews]);

  return (
    <div>
      <button
        onClick={() => {
          navigate("/");
        }}
        className="btn-sm btn-secondary mt-3">
        Back to Listings
      </button>

      <div>
        {selectedRestaurant && (
          <>
            <h1 className="font-weight-bold display-1 text-center">{selectedRestaurant.restaurant.name.toUpperCase()}</h1>
            <div className="text-center">
              <h5>Average Rating</h5>
              {selectedRestaurant.restaurant.average_rating != null && <StarRating rating={selectedRestaurant.restaurant.average_rating} />}
              {selectedRestaurant.restaurant.average_rating != null ? (
                <span>
                  <i> Out of </i>
                  <strong className="text-secondary">
                    <u>{selectedRestaurant.restaurant.count}</u>
                  </strong>{" "}
                  <i>total reviews</i>
                </span>
              ) : (
                <i>
                  <h4 className="text-danger display-5">No Current Ratings</h4>
                </i>
              )}
            </div>
            <div className="mt-3">
              <Reviews reviews={selectedRestaurant.reviews} />
            </div>
            <AddReview />
          </>
        )}
      </div>
    </div>
  );
};

export default Details;
