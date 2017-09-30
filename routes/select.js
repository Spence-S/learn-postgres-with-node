const express = require('express');
const db = require('../db');

const router = express.Router();

// SELECT all columns from actor, uses wild card and is not reccomended method,
// returns all data from a table
router.get('/', async (req, res, next) => {
  const actorTable = await db.query('SELECT * FROM actor');
  res.send(actorTable);
});

// SELECT specific columns from table -- comma seperated columns
router.get('/columns', async (req, res, next) => {
  const nameColumns = await db.query('SELECT first_name,last_name FROM actor');
  res.send(nameColumns);
});

// SELECT DISTINCT -- same as select but doesn't return any duplicate values
router.get('/distinct', async (req, res, next) => {
  const ratingTypes = await db.query('SELECT DISTINCT rating FROM film');
  res.send(ratingTypes);
});

//SELECT WHERE -- Challenge 1
router.get('/where', async (req, res, next) => {
  const nancyThomasEmail = await db.query(
    "SELECT email FROM customer WHERE first_name = 'Nancy' AND last_name = 'Thomas'"
  );
  res.send(nancyThomasEmail);
});

//SELECT WHERE -- Challenge 2
router.get('/where2', async (req, res, next) => {
  const outlawHankyDescription = await db.query(
    "SELECT description FROM film WHERE title = 'Outlaw Hanky'"
  );
  res.send(outlawHankyDescription);
});

router.get('/where3', async (req, res, next) => {
  const numFromAddress = await db.query(
    "SELECT phone FROM address WHERE address = '259 Ipoh Drive'"
  );
  res.send(numFromAddress);
});

router.get('/count', async (req, res, next) => {
  const count = await db.query('SELECT COUNT(*) FROM payment');
  res.send(count);
});

module.exports = router;
