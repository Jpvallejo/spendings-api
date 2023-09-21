const express = require("express");
const router = express.Router();
const { login } = require("../handlers/Login");

router.post("/", login);
module.exports = router;
