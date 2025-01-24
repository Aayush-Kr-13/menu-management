const express = require('express');
const { createSubCategory, getSubCategories, editSubCategory, getSubCategoriesByCategory, getSubCategoryByNameOrId } = require('../controllers/subCategoryController');

const router = express.Router();

router.post('/', createSubCategory);
router.get('/', getSubCategories);
router.put('/:id', editSubCategory);
router.get('/by-category', getSubCategoriesByCategory);
router.get('/search', getSubCategoryByNameOrId);

module.exports = router;
