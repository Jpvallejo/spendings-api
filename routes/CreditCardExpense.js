const express = require("express");
const router = express.Router();
const {
  getExpenses,
  createExpense,
  deleteExpense,
  editExpense,
} = require("../handlers/CreditCardExpense");

router.get("/:card", getExpenses);
router.post("/", createExpense);
router.delete("/:id", deleteExpense);
router.put("/:id", editExpense);
module.exports = router;
