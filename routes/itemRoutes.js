const express = require('express');
const { createItem, getItems, editItem, searchItemsByName } = require('../controllers/itemController');

const router = express.Router();

// Routes
router.post('/', createItem);
router.get('/', getItems);
router.put('/:id', editItem);
router.get('/search', searchItemsByName); // Add the search route

module.exports = router;
