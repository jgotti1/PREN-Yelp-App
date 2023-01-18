import React, { useEffect } from "react";
import { useContext } from "react";
import RestaurantFinder from "../api/RestFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { useNavigate } from "react-router-dom";

const List = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);

  const navigate = useNavigate();

  //Edit Entries
  const handleEdit = (e, id) => {
    e.stopPropagation();
    navigate(`/restaurants/${id}/update`);
  };

  //Delete an item in the DB
  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await RestaurantFinder.delete(`/${id}`);
      if (response.ok) {
        setRestaurants(
          restaurants.filter((restaurant) => {
            return restaurant.id !== id;
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
    setRestaurants(
      restaurants.filter((restaurant) => {
        return restaurant.id !== id;
      })
    );
  };

  //fetch all data on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get("/");

        // sort by name on the react side but moving it to the back end
        // const sortMe = [...response.data].sort((a, b) => a.name.localeCompare(b.name));
        setRestaurants(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [restaurants.length, setRestaurants]);

  //details page handling
  const handleDetails = (id) => {
    navigate(`/restaurants/${id}/details`);
  };

  return (
    <div className="list-group">
      <table className="table table-dark table-hover">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Rating</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((restaurant) => {
              return (
                <tr onClick={() => handleDetails(restaurant.id)} key={restaurant.id}>
                  <td>{restaurant.name}</td>
                  <td>{restaurant.location}</td>
                  <td>{"$".repeat(restaurant.price_range)}</td>
                  <td>reviews</td>
                  <td>
                    <button
                      onClick={(e) => {
                        handleEdit(e, restaurant.id);
                      }}
                      className="btn btn-warning">
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => {
                        handleDelete(e, restaurant.id);
                      }}
                      className="btn btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default List;
