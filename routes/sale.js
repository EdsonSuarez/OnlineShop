const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Sale = require("../models/sale");
const Auth = require("../middleware/auth");
const UserAuth = require("../middleware/user");
const AdminAuth = require("../middleware/admin");

const User = require("../models/user");
const EmployeeAuth = require("../middleware/employee");

router.post("/registerSale", Auth, UserAuth, EmployeeAuth, async (req, res) => {
  if (
    !req.body.clientId ||
    !req.body.employeeId ||
    !req.body.productId ||
    !req.body.cost
  )
    return res.status(401).send("Process failed: Incomplete data");

  const valiClientdId = mongoose.Types.ObjectId.isValid(req.body.clientId);
  const validEmployeeId = mongoose.Types.ObjectId.isValid(req.body.employeeId);
  const validProductId = mongoose.Types.ObjectId.isValid(req.body.productId);
  if (!valiClientdId || !validEmployeeId || !validProductId)
    return res.status(401).send("Process failed: Invalid id");

  const sale = new Sale({
    clientId: req.body.clientId,
    employeeId: req.body.employeeId,
    productId: req.body.productId,
    cost: req.body.cost,
    active: true,
  });

  const result = await sale.save();
  if (!result) return res.status(401).send("Failed to register sale");
  return res.status(200).send({ result });
});

router.get("/listSales/:name?", Auth, UserAuth, AdminAuth, async (req, res) => {
  const sale = await Sale.find()
    .populate("clientId")
    .populate("employeeId")
    .populate("productId")
    .exec();

  if (!sale) return res.status(401).send("No sales");
  return res.status(200).send({ sale });
});

router.put("/updateSale", Auth, UserAuth, AdminAuth, async (req, res) => {
  if (
    !req.body._id ||
    !req.body.clientId ||
    !req.body.employeeId ||
    !req.body.productId ||
    !req.body.cost
  )
    return res.status(401).send("Process failed: Incomplete data");
  const validId = mongoose.Types.ObjectId.isValid(req.body._id);
  if (!validId) return res.status(401).send("Process failed: Invalid id");

  const sale = await Sale.findByIdAndUpdate(req.body._id, {
    clientId: req.body.clientId,
    employeeId: req.body.employeeId,
    productId: req.body.productId,
    cost: req.body.cost,
    active: true,
  });

  if (!sale) return res.status(401).send("Process failed: sale not found");
  return res.status(200).send({ sale });
});

router.put("/deleteSale", Auth, UserAuth, AdminAuth, async (req, res) => {
  if (
    !req.body._id ||
    !req.body.clientId ||
    !req.body.employeeId ||
    !req.body.productId ||
    !req.body.cost
  )
    return res.status(401).send("Process failed: Incomplete data");

  const validId = mongoose.Types.ObjectId.isValid(req.body._id);
  if (!validId) return res.status(401).send("Process failed: Invalid id");

  const sale = await Sale.findByIdAndUpdate(req.body._id, {
    clientId: req.body.clientId,
    employeeId: req.body.employeeId,
    productId: req.body.productId,
    cost: req.body.cost,
    active: false,
  });
  if (!sale) return res.status(401).send("Process failed: sale not found");
  return res.status(200).send({ sale });
});

module.exports = router;
