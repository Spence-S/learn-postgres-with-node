require('dotenv').config();
const express = require('express');
const db = require('./db');

const app = express();

app.get('/', async (req, res) => {
  const users = await db.query('SELECT * FROM users');
  res.send(users);
});

app.listen(3333, console.log('Listening on port 3333'));
