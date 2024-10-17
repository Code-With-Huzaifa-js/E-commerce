const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema(
    {
        name:String,
        price:Number,
        category:String,
        userId:String,
        company:String
    }
);

const Products = mongoose.model('products', ProductsSchema);

module.exports = Products;