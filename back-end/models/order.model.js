const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
       customerId: String,
       productId: [String],
       totalPrice: String,
       Status: String,
})

const OrderModel = mongoose.model("order", orderSchema);

module.exports = {
       OrderModel
}