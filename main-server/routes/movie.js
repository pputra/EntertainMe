const express = require('express');
const router = express.Router();
const { addMovie } = require('../controllers/main');


router.get('/', (req,res) => {
  res.send('movie homepage');
})


router.post('/', addMovie);


module.exports = router;
