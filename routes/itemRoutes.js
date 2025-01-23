const express = require('express');
const { createItem, getItems, editItem } = require('../controllers/itemController');

const router = express.Router();

router.post('/', createItem);
router.get('/', getItems);
router.put('/:id', editItem);

module.exports = router;
