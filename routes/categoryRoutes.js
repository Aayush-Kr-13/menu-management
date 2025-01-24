const express = require('express');
const { createCategory, getCategories, editCategory, getCategoryByNameOrId } = require('../controllers/categoryController');

const router = express.Router();

router.post('/', createCategory);
router.get('/', getCategories);
router.put('/:id', editCategory);
router.get('/search', getCategoryByNameOrId);

module.exports = router;
