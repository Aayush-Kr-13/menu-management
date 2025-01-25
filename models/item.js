const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String },
    description: { type: String },
    taxApplicable: { type: Boolean, default: false },
    tax: { type: Number, default: 0 }, // Tax as a percentage
    baseAmount: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    totalAmount: { type: Number },
    subCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
});

// Pre-save hook to calculate totalAmount
itemSchema.pre('save', async function (next) {
    try {
        const category = await mongoose.model('Category').findById(this.categoryId);

        if (!category) {
            return next(new Error('Category not found'));
        }

        this.taxApplicable = category.taxApplicable;
        this.tax = category.tax || 0;

        const discountedAmount = this.baseAmount - this.discount;
        let total = discountedAmount;

        if (this.taxApplicable && this.tax > 0) {
            total += (discountedAmount * this.tax) / 100; 
        }

        this.totalAmount = total;
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('Item', itemSchema);
