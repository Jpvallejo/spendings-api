const express = require("express");
const router = express.Router();
const {
  getExpense,
  createExpense,
  deleteExpense,
  editExpense,
} = require("../handlers/CreditCardExpense");

router.get("/:card", getExpense);
router.post("/", createExpense);
router.delete("/:id", deleteExpense);
router.put("/:id", editExpense);
module.exports = router;
