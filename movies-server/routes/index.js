const express = require('express');
const router = express.Router();
const movie = require('./movie');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('welcome to movies-server');
});

router.use('/movie', movie);

module.exports = router;
