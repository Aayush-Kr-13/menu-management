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
