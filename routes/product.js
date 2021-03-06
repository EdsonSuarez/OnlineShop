const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Product = require("../models/product");
const Auth = require("../middleware/auth");
const UserAuth = require("../middleware/user");
const AdminAuth = require("../middleware/admin");

router.post("/registerProduct", Auth, UserAuth, AdminAuth, async (req, res) => {
  if (!req.body.name || !req.body.categoryId || !req.body.supplierId)
    return res.status(401).send("Process failed: Incomplete data");

  const valiCategoryId = mongoose.Types.ObjectId.isValid(req.body.categoryId);
  const validSupplierId = mongoose.Types.ObjectId.isValid(req.body.supplierId);
  if (!valiCategoryId || !validSupplierId)
    return res.status(401).send("Process failed: Invalid id");

  const productExists = await Product.findOne({ name: req.body.name });
  if (productExists)
    return res.status(401).send("Process failed: product already exists");

  const product = new Product({
    name: req.body.name,
    categoryId: req.body.categoryId,
    supplierId: req.body.supplierId,
    active: true,
  });
  const result = await product.save();
  if (!result) return res.status(401).send("Failed to register product");
  return res.status(200).send({ result });
});

router.get("/listProducts/:name?", async (req, res) => {
  const product = await Product.find({
    name: new RegExp(req.params["name"], "i"),
  })
    .populate("categoryId")
    .populate("supplierId")
    .exec();

  if (!product) return res.status(401).send("No categories");
  return res.status(200).send({ product });
});

router.put("/updateProduct", Auth, UserAuth, AdminAuth, async (req, res) => {
  if (
    !req.body._id ||
    !req.body.name ||
    !req.body.categoryId ||
    !req.body.supplierId
  )
    return res.status(401).send("Process failed: Incomplete data");

  const validId = mongoose.Types.ObjectId.isValid(req.body._id);
  if (!validId) return res.status(401).send("Process failed: Invalid id");

  const product = await Product.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    active: req.body.active,
    categoryId: req.body.categoryId,
    supplierId: req.body.supplierId,
  });
  if (!product)
    return res.status(401).send("Process failed: product not found");
  return res.status(200).send({ product });
});

router.put("/deleteProduct", Auth, UserAuth, AdminAuth, async (req, res) => {
  if (
    !req.body._id ||
    !req.body.name ||
    !req.body.categoryId ||
    !req.body.supplierId
  )    return res.status(401).send("Process failed: Incomplete data");

  const validId = mongoose.Types.ObjectId.isValid(req.body._id);
  if (!validId) return res.status(401).send("Process failed: Invalid id");

  const product = await Product.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    categoryId: req.body.categoryId,
    supplierId: req.body.supplierId,
    active: false,
  });
  if (!product)
    return res.status(401).send("Process failed: product not found");
  return res.status(200).send({ product });
});

module.exports = router;
