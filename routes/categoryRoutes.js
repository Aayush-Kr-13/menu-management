const express = require('express');
const { createCategory, getCategories, editCategory } = require('../controllers/categoryController');

const router = express.Router();

router.post('/', createCategory);
router.get('/', getCategories);
router.put('/:id', editCategory);

module.exports = router;
