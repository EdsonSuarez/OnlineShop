const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
  active: Boolean,
  date: {type: Date, default: Date.now}
});

const Category = mongoose.model("categories", categorySchema);
module.exports = Category;