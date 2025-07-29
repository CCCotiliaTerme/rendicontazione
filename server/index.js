require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.post('/orders', async (req, res) => {
  const { items, total, note } = req.body;
  const result = await pool.query(
    'INSERT INTO orders (items, total, note) VALUES ($1, $2, $3) RETURNING *',
    [JSON.stringify(items), total, note]
  );
  res.json(result.rows[0]);
});

app.get('/orders', async (req, res) => {
  const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
  res.json(result.rows);
});

app.get('/orders/:id', async (req, res) => {
  const result = await pool.query('SELECT * FROM orders WHERE id = $1', [req.params.id]);
  res.json(result.rows[0]);
});

const printRoute = require('./print');
app.use(printRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
