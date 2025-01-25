import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

// Create a connection pool using environment variables
const db = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true, // This makes the pool wait for available connections if all are in use
    connectionLimit: 10,      // The maximum number of connections to create at once
    queueLimit: 0,            // No limit on the number of requests that can be queued up if all connections are in use
});

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// API endpoint for user signup
app.post('/api/users', async (req, res) => {
    const { full_name, email, phone, dob, wellness_goal } = req.body;
    const userId = uuidv4();

    console.log('Received Data:', { full_name, email, phone, dob, wellness_goal });

    // First, check if there's a batch with space for the user (Max 3 participants per batch for testing)
    db.query('SELECT * FROM batches WHERE number_of_people < 3 LIMIT 1', (err, batches) => {
        if (err) {
            console.error('Database query failed:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }

        console.log('Batches found:', batches);  // This will show what batches were returned

        if (batches.length > 0) {
            const batchId = batches[0].id;

            console.log(`Assigning user to batch with ID: ${batchId}`);

            // Update the Batch table, increment the number_of_people
            db.query('UPDATE batches SET number_of_people = number_of_people + 1 WHERE id = ?', [batchId], (updateErr) => {
                if (updateErr) {
                    console.error('Failed to update batch participants:', updateErr);
                    return res.status(500).json({ error: 'Failed to update batch participants' });
                }

                console.log(`Batch with ID ${batchId} updated`);

                // Insert the user into the Users table
                db.query(
                    'INSERT INTO users (user_id, full_name, email, phone, dob, wellness_goal, batch_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [userId, full_name, email, phone, dob, wellness_goal, batchId],
                    (insertErr) => {
                        if (insertErr) {
                            console.error('Failed to insert user:', insertErr);
                            return res.status(500).json({ error: 'Failed to insert user' });
                        }

                        console.log('User successfully inserted into the database with user_id:', userId);

                        return res.status(201).json({ user_id: userId, message: 'User successfully signed up and assigned to a batch' });
                    }
                );
            });
        } else {
            console.log('No batch with space, creating new batch...');

            // If no batches with space, create a new batch
            db.query('SELECT COUNT(*) AS batchCount FROM batches', (countErr, result) => {
                if (countErr) {
                    console.error('Failed to count batches:', countErr);
                    return res.status(500).json({ error: 'Failed to count batches' });
                }

                const batchCount = result[0].batchCount;
                const newBatchName = `batch_${batchCount + 1}`;
                const newBatchId = uuidv4();

                console.log(`Creating new batch with name: ${newBatchName}`);

                // Create the new batch
                const newBatch = { id: newBatchId, batch_name: newBatchName, number_of_people: 1 };

                // Insert the new batch
                db.query('INSERT INTO batches SET ?', newBatch, (insertBatchErr) => {
                    if (insertBatchErr) {
                        console.error('Failed to create new batch:', insertBatchErr);
                        return res.status(500).json({ error: 'Failed to create new batch' });
                    }

                    console.log('New batch created and inserted into the database');

                    // Insert the user into the new batch
                    db.query(
                        'INSERT INTO users (user_id, full_name, email, phone, dob, wellness_goal, batch_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
                        [userId, full_name, email, phone, dob, wellness_goal, newBatchId],
                        (insertErr) => {
                            if (insertErr) {
                                console.error('Failed to insert user into new batch:', insertErr);
                                return res.status(500).json({ error: 'Failed to insert user into new batch' });
                            }

                            console.log('User successfully inserted into the new batch with user_id:', userId);
                            return res.status(201).json({ user_id: userId, message: 'User successfully signed up and assigned to a batch' });
                        }
                    );
                });
            });
        }
    });
});

// Start the server
const port = 5000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
