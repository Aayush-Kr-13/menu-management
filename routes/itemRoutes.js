const express = require('express');
const { createItem, getItems, editItem, searchItemsByName, getItemsByCategory, getItemsBySubCategory, getItemByNameOrId } = require('../controllers/itemController');

const router = express.Router();

// Routes
router.post('/', createItem);
router.get('/', getItems);
router.put('/:id', editItem);
router.get('/search', searchItemsByName); // Add the search route
router.get('/by-category', getItemsByCategory);
router.get('/by-subcategory', getItemsBySubCategory);
router.get('/detail', getItemByNameOrId);

module.exports = router;
