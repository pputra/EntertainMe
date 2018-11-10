const express = require('express');
const router = express.Router();
const { getAll } = require('../controllers/main');
const movie = require('./movie');
const tv = require('./tv');


/* GET home page. */
router.get('/', getAll);

router.use('/movie', movie);

router.use('/tv', tv);


module.exports = router;
