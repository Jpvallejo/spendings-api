const express = require("express");
const loginRouter = express.Router();
const registerRouter = express.Router();
const { login, signUp } = require("../handlers/Login");

loginRouter.post("/", login);
registerRouter.post("/", signUp);
module.exports = {loginRouter, registerRouter};
