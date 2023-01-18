import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RestFinder from "../api/RestFinder";

const Update = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const restaurant = async () => {
      const response = await RestFinder.get(`/${id}`);

      setName(response.data[0].name);
      setLocation(response.data[0].location);
      setPriceRange(response.data[0].price_range);
    };
    restaurant();
  }, [id]);

  const handleBack = () => {
    navigate("/");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await RestFinder.put(`/${id}`, {
        name,
        location,
        price_range: priceRange,
      });
    } catch (error) {
      console.log(error.message);
    }
    navigate("/");
  };

  return (
    <div className="container bg-light pl-6 pr-6 pb-5">
      <button onClick={handleBack} className="btn- btn-secondary mt-3">
        Go Back
      </button>
      <input value={name} onChange={(e) => setName(e.target.value)} className="form-control mt-3" type="text" placeholder="name" />

      <input value={location} onChange={(e) => setLocation(e.target.value)} className="form-control mt-3" type="text" placeholder="location" />

      <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="custom-select mt-3">
        <option disabled>Price Range</option>
        <option value="1">$</option>
        <option value="2">$$</option>
        <option value="3">$$$</option>
        <option value="4">$$$$</option>
        <option value="5">$$$$$</option>
      </select>

      <button onClick={handleUpdate} type="submit" className="btn btn-success mt-3">
        Submit Changes
      </button>
    </div>
  );
};

export default Update;
