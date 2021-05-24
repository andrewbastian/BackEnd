const express = require("express");
const server = express();
const cors = require("cors");
const UserRouter = require("../utils/resources/users/users-router");

require('dotenv').config()

const corsOptions= {
    origin: process.env.DATABASE_URL
}
server.use(cors(corsOptions));

server.use("/", UserRouter);

module.exports = server;
