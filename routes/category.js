const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Category = require("../models/category");
const Auth = require("../middleware/auth");
const UserAuth = require("../middleware/user");
const AdminAuth = require("../middleware/admin");

router.post("/registerCategory", Auth, UserAuth, AdminAuth, async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(401).send("Process failed: Incomplete data");
  const categoryExists = await Category.findOne({ name: req.body.name });
  if (categoryExists)
    return res.status(401).send("Process failed: category already exists");

  const category = new Category({
    name: req.body.name,
    description: req.body.description,
    active: true,
  });
  const result = await category.save();
  if (!result) return res.status(401).send("Failed to register category");
  return res.status(200).send({ result });
});

router.get("/listCategories/:name?", Auth, UserAuth, async (req, res) => {
    const category = await Category.find({ name: new RegExp(req.params["name"], "i") });
    if (!category) return res.status(401).send("No categories");
    return res.status(200).send({ category });
  });
  
router.put("/updateCategory", Auth, UserAuth, AdminAuth, async (req, res) => {
    if (
        !req.body._id ||
        !req.body.name ||
        !req.body.description
        )
        return res.status(401).send("Process failed: Incomplete data");
    
      const validId = mongoose.Types.ObjectId.isValid(req.body._id);
      if (!validId) return res.status(401).send("Process failed: Invalid id");
    
      const category = await Category.findByIdAndUpdate(req.body._id, {
        name: req.body.name,
        active: req.body.active,
        description: req.body.description,
      });
      if (!category) return res.status(401).send("Process failed: category not found");
      return res.status(200).send({ category });  
  });

router.put("/deleteCategory", Auth, UserAuth, AdminAuth, async (req, res) => {
  if (
      !req.body._id ||
      !req.body.name ||
      !req.body.description
      )
    return res.status(401).send("Process failed: Incomplete data");

  const validId = mongoose.Types.ObjectId.isValid(req.body._id);
  if (!validId) return res.status(401).send("Process failed: Invalid id");

  const category = await Category.findByIdAndUpdate(req.body._id, {
    userId: req.user._id,
    name: req.body.name,
    description: req.body.description,
    active: false,
    
  });
  if (!category)
    return res.status(401).send("Process failed: category not found");
  return res.status(200).send({ category });
}); 

module.exports = router;
