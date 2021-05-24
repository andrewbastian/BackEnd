const express = require("express");
const server = express();
const cors = require("cors");

const UserRouter = require("../utils/resources/users/users-router");

const corsOptions= {
    origin: process.env.DATABASE_URL
}
server.use(cors(coresOptions));

server.use("/", UserRouter);

module.exports = server;
