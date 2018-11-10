const express = require('express');
const router = express.Router();
const { getAll, get, update, remove, create } = require('../controllers/moviesControllers');


/* GET users listing. */

router.get('/', getAll);

router.get('/:id', get);

router.post('/', create);

router.put('/:id', update);

router.delete('/:id', remove);

module.exports = router;
