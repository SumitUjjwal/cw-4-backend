const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
       firstName: String,
       lastName: String,
       location: String,
       zipCode: String,
       phone: Number,
       email: String,
       password: String
})

const UserModel = mongoose.model("user", userSchema);

module.exports = {
       UserModel
}