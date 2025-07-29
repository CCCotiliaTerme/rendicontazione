const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const pdf = require('html-pdf-node');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

router.get('/orders/:id/print', async (req, res) => {
  const result = await pool.query('SELECT * FROM orders WHERE id = $1', [req.params.id]);
  const order = result.rows[0];

  const html = `
    <h1>Ordine #${order.id}</h1>
    <pre>${JSON.stringify(order.items, null, 2)}</pre>
    <p>Totale: € ${order.total}</p>
  `;

  let file = { content: html };
  pdf.generatePdf(file, { format: 'A4' }).then(pdfBuffer => {
    res.setHeader('Content-Disposition', 'attachment; filename=ordine_' + order.id + '.pdf');
    res.contentType("application/pdf");
    res.send(pdfBuffer);
  });
});

module.exports = router;
