const SubCategory = require('../models/subCategory');

// Create a Subcategory
exports.createSubCategory = async (req, res) => {
    try {
        const subCategory = await SubCategory.create(req.body);
        res.status(201).json(subCategory);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
};

// Get All Subcategories
exports.getSubCategories = async (req, res) => {
    try {
        const subCategories = await SubCategory.find();
        res.status(200).json(subCategories);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
};

// Edit a Subcategory
exports.editSubCategory = async (req, res) => {
    try {
        const subCategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json(subCategory);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
};

// Get All Subcategories under a Category
exports.getSubCategoriesByCategory = async (req, res) => {
    try {
        const { categoryId } = req.query;

        if (!categoryId) {
            res.status(400).json({ message: "Please provide 'categoryId' as a query parameter." });
            return;
        }

        const subCategories = await SubCategory.find({ categoryId }).populate('categoryId', 'name'); // Populate category name
        if (!subCategories.length) {
            res.status(404).json({ message: "No subcategories found for the given category." });
            return;
        }

        res.status(200).json(subCategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Subcategory by Name or ID
exports.getSubCategoryByNameOrId = async (req, res) => {
    try {
        const { id, name } = req.query;

        if (!id && !name) {
            res.status(400).json({ message: "Please provide either 'id' or 'name' as a query parameter." });
            return;
        }

        let subCategory;
        if (id) {
            subCategory = await SubCategory.findById(id).populate('categoryId', 'name'); // Populate category name
        } else if (name) {
            subCategory = await SubCategory.findOne({ name: { $regex: name, $options: 'i' } }).populate('categoryId', 'name'); // Case-insensitive search
        }

        if (!subCategory) {
            res.status(404).json({ message: "Subcategory not found." });
            return;
        }

        res.status(200).json(subCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
