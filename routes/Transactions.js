const express = require("express");
const router = express.Router();
const {
  getTransactions,
  createTransaction,
  deleteTransaction,
  editTransaction,
} = require("../handlers/Transactions");

router.get("/:account", getTransactions);
router.post("/", createTransaction);
router.delete("/", deleteTransaction);
router.put("/", editTransaction);
module.exports = router;
