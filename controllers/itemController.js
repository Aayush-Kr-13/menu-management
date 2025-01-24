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

// Search Items by Name
exports.searchItemsByName = async (req, res) => {
    try {
        const searchQuery = req.query.name; // Get the 'name' query parameter
        if (!searchQuery) {
            res.status(400);
            throw new Error('Name query parameter is required.');
        }

        const items = await Item.find({
            name: { $regex: searchQuery, $options: 'i' }, // Case-insensitive search
        });
        res.status(200).json(items);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
};

// Get All Items under a Category
exports.getItemsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.query; // Get the 'categoryId' query parameter

        if (!categoryId) {
            res.status(400).json({ message: "Please provide 'categoryId' as a query parameter." });
            return;
        }

        const items = await Item.find({ categoryId }).populate('categoryId', 'name'); // Populate category name

        if (!items.length) {
            res.status(404).json({ message: "No items found for the given category." });
            return;
        }

        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Items under a Sub-Category
exports.getItemsBySubCategory = async (req, res) => {
    try {
        const { subCategoryId } = req.query; // Get the 'subCategoryId' query parameter

        if (!subCategoryId) {
            res.status(400).json({ message: "Please provide 'subCategoryId' as a query parameter." });
            return;
        }

        const items = await Item.find({ subCategoryId }).populate('subCategoryId', 'name'); // Populate sub-category name

        if (!items.length) {
            res.status(404).json({ message: "No items found for the given sub-category." });
            return;
        }

        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get an Item by Name or ID
exports.getItemByNameOrId = async (req, res) => {
    try {
        const { id, name } = req.query; // Get 'id' or 'name' query parameters

        if (!id && !name) {
            res.status(400).json({ message: "Please provide either 'id' or 'name' as a query parameter." });
            return;
        }

        let item;
        if (id) {
            item = await Item.findById(id).populate('categoryId', 'name').populate('subCategoryId', 'name'); // Populate category and sub-category names
        } else if (name) {
            item = await Item.findOne({ name: { $regex: name, $options: 'i' } })
                .populate('categoryId', 'name')
                .populate('subCategoryId', 'name'); // Case-insensitive search
        }

        if (!item) {
            res.status(404).json({ message: "Item not found." });
            return;
        }

        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
