const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");

const app = express();
dotenv.config();

// *********** Middleware ***********
//Middleware for logging
app.use(morgan("combined"));

// app.use((req, res, next) => {
//   console.log("MIDDLEWARE RAN");
//   next();
// });

// returns rqe.body object
app.use(express.json());

// *********** End Middleware ***********

//************** routes ********************

//Get all Restuarants
app.get("/api/v1/restaurants", (req, res) => {
  res.status(200).json({
    status: "Success",
    data: {
      resturants: ["Wendays", "Burger King"],
    },
  });
});

//Get a single Restuarant by ID
app.get("/api/v1/restaurants/:id", (req, res) => {
  res.send(req.params);
});

//UPDATE a single Restuarant by ID
app.put("/api/v1/restaurants/:id", (req, res) => {
  res.send(req.body);
});

//DELETE a single Restuarant by ID
app.delete("/api/v1/restaurants/:id", (req, res) => {
  res.send(req.params.id);
});

//Create ne Restaurant
app.post("/api/v1/restaurants", (req, res) => {
  res.send(req.body);
});

// ********* END Routes ******************

//******************* Server connect ******************
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`server is up and running on port ${port}`.green.bold);
});
