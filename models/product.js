const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({ 
  name: String,
  categoryId: { type: mongoose.Schema.ObjectId, ref: "categories" },
  supplierId: { type: mongoose.Schema.ObjectId, ref: "user"},
  active: Boolean,
  date: {type: Date, default: Date.now}
});

const Product = mongoose.model("product", productSchema);
module.exports = Product;