const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", true);

const db_url = process.env.db_url;

const connect = mongoose.connect(db_url);

module.exports = {
       connect
}