const express = require("express");
const app = express.Router();
const authRoutes = require("./auth");
const userRoutes = require("./users");


app.use("/auth",authRoutes);
app.use("/users", userRoutes);


module.exports = app;