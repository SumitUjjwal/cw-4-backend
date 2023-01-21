const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
       img_src: String,
       title: String,
       model: String,
       sku: Number,
       rating: Number,
       reviews: Number,
       fulfillment: String,
       price: Number,
       discount: Number,
       prevPrice: Number
})

const ProductModel = mongoose.model("product", productSchema);

module.exports = {
       ProductModel
}