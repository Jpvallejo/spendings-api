const express = require("express");
const router = express.Router();
const {
  getAccount,
  createAccount,
  getAccountForecast,
} = require("../handlers/Account");

router.get("/", getAccount);
router.get("/forecast/:accountId", getAccountForecast);
router.post("/", createAccount);
module.exports = router;
