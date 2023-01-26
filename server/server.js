const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
// const morgan = require("morgan");
const cors = require("cors");
const db = require("./db");
const path = require("path");

const app = express();
app.use(cors());
dotenv.config();

// *********** Middleware ***********
//Middleware for logging
// app.use(morgan("combined"));

// app.use((req, res, next) => {
//   console.log("MIDDLEWARE RAN");
//   next();
// });

//Deploy code for mono app
// serve static front end in production mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "public", "build")));
}

// returns rqe.body object
app.use(express.json());

// *********** End Middleware ***********

//************** routes ********************

//Get all Restuarants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    // const results = await db.query("SELECT * FROM restaurants ORDER By name");
    const results = await db.query(
      "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id ORDER By name;"
    );

    console.log(results.rows);
    res.json(results.rows);
    // console.log(`There are ${results.rowCount} records in our database`);
  } catch (error) {
    console.log(error.message);
  }
});

//Get a single Restuarant by ID
app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    // leaves us open to SQL injection below
    // const result = await db.query(`SELECT * FROM restaurants WHERE id = ${req.params.id}`);
    // correct
    // const restaurant = await db.query("SELECT * FROM restaurants WHERE id = $1", [req.params.id]);
    const restaurant = await db.query(
      "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1",
      [req.params.id]
    );

    const reviews = await db.query("SELECT * FROM reviews WHERE restaurant_id = $1", [req.params.id]);

    res.json({
      restaurant: restaurant.rows[0],
      reviews: reviews.rows,
    });
  } catch (error) {
    console.log(error.message);
  }
});

//UPDATE a single Restuarant by  ID
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const result = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *", [
      req.body.name,
      req.body.location,
      req.body.price_range,
      req.params.id,
    ]);
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//DELETE a single Restuarant by ID
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const result = await db.query("DELETE FROM restaurants WHERE id = $1 RETURNING *", [req.params.id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//Create new Restaurant
app.post("/api/v1/restaurants", async (req, res) => {
  try {
    const result = await db.query("INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *", [
      req.body.name,
      req.body.location,
      req.body.price_range,
    ]);
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});
//Create new Review
app.post("/api/v1/restaurants/reviews", async (req, res) => {
  try {
    const result = await db.query("INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *", [
      req.body.restaurant_id,
      req.body.name,
      req.body.review,
      req.body.rating,
    ]);
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// ********* END Routes ******************

//******************* Server connect ******************
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`server is up and running on port ${port}`.green.bold);
});
