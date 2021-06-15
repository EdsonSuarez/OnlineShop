const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({ 
  name: String,
  category: { type: mongoose.Schema.ObjectId, ref: "categories" },
  active: Boolean,
  date: {type: Date, default: Date.now}
});

const Product = mongoose.model("product", productSchema);
module.exports = Product;