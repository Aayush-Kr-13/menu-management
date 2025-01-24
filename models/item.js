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
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
});

itemSchema.pre('save', function (next) {
    const discountedAmount = this.baseAmount - this.discount; 
    let total = discountedAmount;

    if (this.taxApplicable && this.tax > 0) {
        total += (this.baseAmount * this.tax) / 100; 
    }

    this.totalAmount = total;
    next();
});

module.exports = mongoose.model('Item', itemSchema);
