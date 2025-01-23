const calculateTotalAmount = (baseAmount, discount, tax = 0) => {
    const discountedPrice = baseAmount - discount;
    const taxAmount = (discountedPrice * tax) / 100;
    return discountedPrice + taxAmount;
};

const validateObjectId = (id, mongoose) => {
    return mongoose.Types.ObjectId.isValid(id);
};

module.exports = {
    calculateTotalAmount,
    validateObjectId,
};
