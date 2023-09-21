const express = require("express");
const router = express.Router();
const { getAccount, createAccount } = require("../handlers/Account");

router.get("/", getAccount);
router.post("/", createAccount);
module.exports = router;
