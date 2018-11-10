const express = require('express');
const router = express.Router();
const { addTv } = require('../controllers/main');


router.get('/', (req,res) => {
  res.send('tv homepage');
})


router.post('/', addTv);


module.exports = router;
