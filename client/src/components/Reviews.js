import React from "react";
import StarRating from "./StarRating";

const Reviews = () => {
  return (
    <div className="row row-cols-3 mb-2 justify-content-center">
      <div className="card text-white bg-primary mb-3 mr-4" style={{ maxWidth: "30%" }}>
        <div className="card-header  d-flex justify-content-between">
          <span>John</span>
          <span>
            <StarRating rating={4} />
          </span>
        </div>
        <div className="card-body bg-secondary">
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
      <div className="card text-white bg-primary mb-3 mr-4" style={{ maxWidth: "30%" }}>
        <div className="card-header d-flex justify-content-between">
          <span>John</span>
          <span>
            <StarRating rating={4} />
          </span>
        </div>
        <div className="card-body">
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
      <div className="card text-white bg-primary mb-3 mr-4" style={{ maxWidth: "30%" }}>
        <div className="card-header d-flex justify-content-between">
          <span>John</span>
          <span>
            <StarRating rating={4} />
          </span>
        </div>
        <div className="card-body">
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
      <div className="card text-white bg-primary mb-3 mr-4" style={{ maxWidth: "30%" }}>
        <div className="card-header d-flex justify-content-between">
          <span>John</span>
          <span>
            <StarRating rating={4} />
          </span>
        </div>
        <div className="card-body">
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
      <div className="card text-white bg-primary mb-3 mr-4" style={{ maxWidth: "30%" }}>
        <div className="card-header d-flex justify-content-between">
          <span>John</span>
          <span>
            <StarRating rating={4} />
          </span>
        </div>
        <div className="card-body">
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
