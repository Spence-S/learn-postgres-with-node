const express = require('express');
const db = require('../db');

const router = express.Router();

// SELECT all columns from actor, uses wild card and is not reccomended method,
// returns all data from a table
router.get('/', async (req, res, next) => {
  const actorTable = await db.query('SELECT * FROM actor');
  res.json(actorTable);
});

// SELECT specific columns from table -- comma seperated columns
router.get('/columns', async (req, res, next) => {
  const nameColumns = await db.query('SELECT first_name,last_name FROM actor');
  res.json(nameColumns);
});

// SELECT DISTINCT -- same as select but doesn't return any duplicate values
router.get('/distinct', async (req, res, next) => {
  const ratingTypes = await db.query('SELECT DISTINCT rating FROM film');
  res.json(ratingTypes);
});

//SELECT WHERE -- Challenge 1
router.get('/where', async (req, res, next) => {
  const nancyThomasEmail = await db.query(
    "SELECT email FROM customer WHERE first_name = 'Nancy' AND last_name = 'Thomas'"
  );
  res.json(nancyThomasEmail);
});

//SELECT WHERE -- Challenge 2
router.get('/where2', async (req, res, next) => {
  const outlawHankyDescription = await db.query(
    "SELECT description FROM film WHERE title = 'Outlaw Hanky'"
  );
  res.json(outlawHankyDescription);
});

router.get('/where3', async (req, res, next) => {
  const numFromAddress = await db.query(
    "SELECT phone FROM address WHERE address = '259 Ipoh Drive'"
  );
  res.json(numFromAddress);
});

router.get('/count', async (req, res, next) => {
  const count = await db.query('SELECT COUNT(*) FROM payment');
  res.json(count);
});

router.get('/orderby', async (req, res, next) => {
  const topTenCustomers = await db.query(
    'SELECT customer_id, amount FROM payment ORDER BY amount DESC LIMIT 10'
  );
  res.json(topTenCustomers);
});

router.get('/orderby2', async (req, res, next) => {
  const fiveFilms = await db.query(
    'SELECT film_id, title FROM film ORDER BY film_id LIMIT 5'
  );
  res.json(fiveFilms);
});

// How many payment transactions were greater than 5.00
router.get('/genchallenge1', async (req, res, next) => {
  const transGreaterThanFive = await db.query(
    'SELECT COUNT(amount) FROM payment WHERE amount > 5'
  );
  res.json(transGreaterThanFive);
});

// How many actors have the first name that starts with the letter p
router.get('/genchallenge2', async (req, res, next) => {
  const actorsWithLetterP = await db.query(
    "SELECT count(first_name) from actor WHERE first_name LIKE 'P%'"
  );
  res.json(actorsWithLetterP);
});

// How many films have a rating of R and a replacement cost between 5 and 15 dollars
router.get('/genchallenge3', async (req, res, next) => {
  const ratingR = await db.query(
    "SELECT count(*) from film WHERE rating='R' AND replacement_cost BETWEEN 5 AND 15"
  );
  res.json(ratingR);
});

router.get('/groupby', async (req, res, next) => {
  const staffMember = await db.query(
    'SELECT staff_id, COUNT(payment_id), SUM(amount) FROM payment GROUP BY staff_id'
  );
  res.json(staffMember);
});

router.get('/groupby2', async (req, res, next) => {
  const costByRating = await db.query(
    'SELECT rating, ROUND(AVG(replacement_cost),2) FROM film GROUP BY rating'
  );
  res.json(costByRating);
});

router.get('/groupby3', async (req, res, next) => {
  const bestCustomer = await db.query(
    'SELECT customer_id, SUM(amount) FROM payment GROUP BY customer_id ORDER BY SUM(amount) DESC LIMIT 5'
  );
  res.json(bestCustomer);
});

router.get('/having', async (req, res, next) => {
  const eligibleCustomers = await db.query(
    'SELECT customer_id, count(*) FROM payment GROUP BY customer_id having count(*)>40'
  );
  res.json(eligibleCustomers);
});

router.get('/having2', async (req, res, next) => {
  const avgLongRental = await db.query(
    'SELECT rating, AVG(rental_duration) FROM film GROUP BY rating HAVING AVG(rental_duration) > 5'
  );
  res.json(avgLongRental);
});

module.exports = router;
