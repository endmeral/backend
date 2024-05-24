const express = require('express');
const { Pool } = require('pg');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

// PostgreSQL configuration
const pool = new Pool({
  user: 'ovidiu',
  host: '95.179.239.174',
  database: 'website',
  password: '3349666ovi',
  port: 5432,
});


// Middleware to parse JSON requests
app.use(express.json());

app.use(cors());

// Define API routes
app.get('/api/equations', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM equations'); // Query the "equations" table
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving data from the database' });
  }
});

app.get('/api/equations/:url_link', async (req, res) => {
  try {
    const urlLink = req.params.url_link; // Get the URL link from the route parameter

    const client = await pool.connect();
    // Query the database for the equation with the specified URL link
    const result = await client.query('SELECT * FROM equations WHERE url_link = $1', [urlLink]);

    // Check if an equation was found
    if (result.rows.length === 0) {
      res.status(404).json({ message: 'Equation not found' });
    } else {
      res.json(result.rows[0]); // Return the first equation found (assuming URL links are unique)
    }

    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving data from the database' });
  }
});


// Start the Express.js server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


