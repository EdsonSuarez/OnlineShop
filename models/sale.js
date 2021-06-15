const mongoose = require("mongoose");



const saleSchema = new mongoose.Schema({
  client:  { type: mongoose.Schema.ObjectId, ref: "user" },
  employee:  { type: mongoose.Schema.ObjectId, ref: "user" },
  product: { type: mongoose.Schema.ObjectId, ref: "product" },
  cost: Double,
  active: Boolean,
  date: {type: Date, default: Date.now}
});

const Sale = mongoose.model("sale", saleSchema);
module.exports = Sale;