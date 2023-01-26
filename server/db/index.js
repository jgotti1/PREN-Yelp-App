// Postgress DB connect
const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

//db connect the pool PG option automatcily will look in the .env file to connect
const pool = new Pool();
// const pool = new Pool({
//   user: "",
//   host: "",
//   database: "",
//   password: "",
//   port: 5432,
// });

module.exports = {
  query: (text, params) => pool.query(text, params),

};
