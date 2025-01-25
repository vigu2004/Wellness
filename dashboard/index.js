require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid'); // UUID import using require

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection pool
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// POST endpoint to add a session
app.post('/api/sessions', async (req, res) => {
    const { sessionName, date, time, batch } = req.body;

    // Validate input
    if (!sessionName || !date || !time || !batch) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Generate a new UUID for the session
        const sessionId = uuidv4();

        // Insert session data into MySQL with the generated sessionId
        const query = `
      INSERT INTO sessions (id, name, date, time, batches)
      VALUES (?, ?, ?, ?, ?)
    `;
        const [result] = await pool.execute(query, [sessionId, sessionName, date, time, batch]);

        // Return the sessionId in the response
        res.status(201).json({ message: 'Session added successfully', sessionId: sessionId });
    } catch (error) {
        console.error('Error adding session:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET endpoint to fetch all batches
app.get('/api/batches', async (req, res) => {
    try {
        const query = 'SELECT * FROM batches'; // Fetch all batches
        const [batches] = await pool.execute(query);
        res.status(200).json(batches); // Return all batches as JSON
    } catch (error) {
        console.error('Error fetching batches:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
