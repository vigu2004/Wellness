require('dotenv').config(); 

const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI; 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// POST endpoint to add a session
app.post('/api/sessions', async (req, res) => {
    const { sessionName, date, time, description } = req.body;

    // Validate input
    if (!sessionName || !date || !time || !description) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        await client.connect();
        const database = client.db('Wellness'); // Replace with your database name
        const collection = database.collection('Session'); 

        const result = await collection.insertOne({ sessionName, date, time, description });
        res.status(201).json({ message: 'Session added successfully', sessionId: result.insertedId });
    } catch (error) {
        console.error('Error adding session:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await client.close();
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
