const Item = require('../models/item');

// Create an Item
exports.createItem = async (req, res) => {
    try {
        const item = await Item.create(req.body);
        res.status(201).json(item);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
};

// Get All Items
exports.getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
};

// Edit an Item
exports.editItem = async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json(item);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
};
