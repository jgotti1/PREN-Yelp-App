import React, { useState } from "react";
// import { RestaurantsContext } from "../context/RestaurantsContext";
// import { useContext } from "react";
import RestFinder from "../api/RestFinder";

const AddNew = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");
  // const { addRestaurant } = useContext(RestaurantsContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestFinder.post("/", {
        name,
        location,
        price_range: priceRange,
      });
      // console.log(response);
      if (response.status === 200) {
        // below code to refresh the screen by running the useEffect in the list with this logic below //
        // addRestaurant(response.data);
        window.location = "/";

        //reset create form
        setName("");
        setLocation("");
        setPriceRange("Price Range");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="mb-4">
      <form action="">
        <div className="form-row">
          <div className="col">
            <input value={name} onChange={(e) => setName(e.target.value)} className="form-control" type="text" placeholder="name" />
          </div>
          <div className="col">
            <input value={location} onChange={(e) => setLocation(e.target.value)} className="form-control" type="text" placeholder="location" />
          </div>
          <div className="col">
            <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="custom-select">
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <button type="submit" onClick={handleSubmit} className="btn btn-primary">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNew;
