require('dotenv').config();
const mysql = require('mysql2/promise');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

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
    queueLimit: 0
});

// POST endpoint to add a session
app.post('/api/sessions', async (req, res) => {
    const { sessionId, sessionName, date, time, batch } = req.body;

    // Validate input
    if (!sessionId || !sessionName || !date || !time || !batch) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Insert session data into MySQL
        const query = `
            INSERT INTO sessions (id, name, date, time, batches, created_at)
            VALUES (?, ?, ?, ?, ?, NOW())
        `;
        const [result] = await pool.execute(query, [sessionId, sessionName, date, time, batch]);

        res.status(201).json({ message: 'Session added successfully', sessionId: result.insertId });
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
