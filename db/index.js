const { Pool } = require('pg');

const pool = new Pool();

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

pool.on('connect', client => {
  console.log('Connected to ', client.database);
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};
