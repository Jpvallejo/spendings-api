const express = require("express");
const router = express.Router();
const {
  getTransactions,
  getByCategory,
  createTransaction,
  deleteTransaction,
  editTransaction,
} = require("../handlers/Transactions");

router.get("/by-category", getByCategory);
router.get("/:account", getTransactions);
router.post("/", createTransaction);
router.delete("/", deleteTransaction);
router.put("/", editTransaction);
module.exports = router;
