var express = require('express');
var router = express.Router();
var knex = require('../knex');

/* GET assassins home page. */
router.get('/', function(req, res, next) {
  // Get all assassins from db.
  knex('people')
  .then(function (peopleArr) {
    // Successfully fetched all assassins. Respond however you like.
    res.render('people', {people:peopleArr});
  })
  .catch(function (error) {
    res.sendStatus(500);
  })
});

router.get('/:people_id', function(req, res, next) {
  res.render('index', { title: 'Express'});
});

module.exports = router;
