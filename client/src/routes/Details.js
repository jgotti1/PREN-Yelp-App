import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RestFinder from "../api/RestFinder";
import Reviews from "../components/Reviews";
import StarRating from "../components/StarRating";
import { RestaurantsContext } from "../context/RestaurantsContext";

const Details = () => {
  const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestFinder.get(`/${id}`);
        setSelectedRestaurant(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setSelectedRestaurant, id]);

  return (
    <div>
      <button
        onClick={() => {
          navigate("/");
        }}
        className="btn-sm btn-secondary mt-3">
        Back to Listings
      </button>
      
      <div>{selectedRestaurant && (
        <>
          <div className="mt-3"><Reviews/></div>
        </>

      )}</div>
      
    </div>
  );
};

export default Details;
