const express = require('express');
const { createSubCategory, getSubCategories, editSubCategory } = require('../controllers/subCategoryController');

const router = express.Router();

router.post('/', createSubCategory);
router.get('/', getSubCategories);
router.put('/:id', editSubCategory);

module.exports = router;
