const express = require('express');
const router = express.Router();
const tv = require('./tv');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('welcome to tv-server');
});

router.use('/tv', tv);

module.exports = router;
