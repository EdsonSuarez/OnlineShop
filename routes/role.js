const express = require("express");
const router = express.Router();

const Role = require("../models/role");
const Auth = require("../middleware/auth");
const UserAuth = require("../middleware/user");
const AdminAuth = require("../middleware/admin");

router.post("/registerRole", Auth, UserAuth, AdminAuth, async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(401).send("Process failed: Incomplete data");
  const roleExists = await Role.findOne({ name: req.body.name });
  if (roleExists)
    return res.status(401).send("Process failed: role already exists");

  const role = new Role({
    name: req.body.name,
    description: req.body.description,
    active: true,
  });
  const result = await role.save();
  if (!result) return res.status(401).send("Failed to register role");
  return res.status(200).send({ result });
});

router.get("/listRole", Auth, UserAuth, AdminAuth, async (req, res) => {
  const role = await Role.find();
  if (!role) return res.status(401).send("No roles");
  return res.status(200).send({ role });
});

router.put("/updateRole", Auth, UserAuth, AdminAuth, async (req, res) => {
  if (!req.body._id || !req.body.name || !req.body.description)
    return res.status(401).send("Process failed: Incomplete data");

  const validId = mongoose.Types.ObjectId.isValid(req.body._id);
  if (!validId) return res.status(401).send("Process failed: Invalid id");

  const role = await Role.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    description: req.body.description,
    active: true,
  });
  if (!role)
    return res.status(401).send("Process failed: role not found");
  return res.status(200).send({ role });
});

router.put("/deleteRole", Auth, UserAuth, AdminAuth, async (req, res) => {
  if (!req.body._id || !req.body.name || !req.body.description)
    return res.status(401).send("Process failed: Incomplete data");

  const validId = mongoose.Types.ObjectId.isValid(req.body._id);
  if (!validId) return res.status(401).send("Process failed: Invalid id");

  const role = await Role.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    description: req.body.description,
    active: false,
  });
  if (!role)
    return res.status(401).send("Process failed: role not found");
  return res.status(200).send({ role });
});

module.exports = router;
