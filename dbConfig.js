/*
This config file retrieves credentials from the database from a file named credentials.env
The .env should look something like this:

DB_USER= ***
DB_HOST= ***
DB_DATABASE= ***
DB_PASSWORD= ***
DB_PORT= ***

Replace *** with your desired credentials.
*/
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = pool;
