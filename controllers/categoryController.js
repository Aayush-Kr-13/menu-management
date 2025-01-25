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

// Get a Category by Name or ID
exports.getCategoryByNameOrId = async (req, res) => {
    try {
        const { id, name } = req.query;

        if (!id && !name) {
            res.status(400).json({ message: "Please provide either 'id' or 'name' as a query parameter." });
            return;
        }

        let category;
        if (id) {
            category = await Category.findById(id);
        } else if (name) {
            category = await Category.findOne({ name: { $regex: name, $options: 'i' } }); // Find by Name (case-insensitive)
        }

        if (!category) {
            res.status(404).json({ message: 'Category not found.' });
            return;
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};