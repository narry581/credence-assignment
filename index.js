const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '7382612798',
    database: 'movies_db'
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

// Create a new movie
app.post('/movies', (req, res) => {
    const { name, img, summary } = req.body;
    const query = 'INSERT INTO books (name, img, summary) VALUES ('${name}','${img}'${summary}')';
    db.query(query, [name, img, summary], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: result.insertId, name, img, summary });
    });
});

// Read all movies
app.get('/movies', (req, res) => {
    const query = 'SELECT * FROM movies';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});

// Read a single movie
app.get('/movies/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM movies WHERE id=${id};
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json(result[0]);
    });
});

// Update a movie
app.put('/movies/:id', (req, res) => {
    const { id } = req.params;
    const { name, img, summary } = req.body;
    const query = 'UPDATE movies SET name='${name}',
    img='${img}',
    summary='${summary}' WHERE id=${id};
    db.query(query, [name, img, summary, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json({ id, name, img, summary });
    });
});

// Delete a movie
app.delete('/movis/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM movies WHERE id=${id};
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(204).send();
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
