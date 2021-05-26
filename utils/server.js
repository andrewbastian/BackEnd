const express = require("express");
const server = express();
const cors = require("cors");
require("dotenv").config()

const UserRouter = require("../utils/resources/users/users-router");

server.use(cors());
app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", process.env.APP_CLIENT); // update to match the domain you will make the request from
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    
});
server.use("/", UserRouter);

module.exports = server;
