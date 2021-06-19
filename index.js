const express = require("express");
const { dbConnection } = require("./db/db");
const cors = require("cors");
require("dotenv").config();

const User = require("./routes/user");
const Auth = require("./routes/auth");
const Role = require("./routes/role");
const Category = require("./routes/category");
const Product = require("./routes/product");
const Sale = require("./routes/sale");


const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth/", Auth);
app.use("/api/user/", User);
app.use("/api/role/", Role);
app.use("/api/category", Category);
app.use("/api/product", Product);
app.use("/api/sale", Sale);

app.listen(process.env.PORT, () => console.log("localhost:",process.env.PORT));

dbConnection();

