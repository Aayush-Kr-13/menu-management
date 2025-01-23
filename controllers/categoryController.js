const Category = require('../models/category');

// Create a Category
exports.createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
};

// Get All Categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
};

// Edit a Category
exports.editCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json(category);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
};
