const express = require("express");
const { dbConnection } = require("./db/db");
const cors = require("cors");
require("dotenv").config();


const app = express();
app.use(express.json());
app.use(cors());

app.listen(process.env.PORT, () => console.log("localhost:",process.env.PORT));

dbConnection();

