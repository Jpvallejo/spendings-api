const express = require("express");
const router = express.Router();
const {
  getBudget,
  getAllBudgets,
  createBudget,
  deleteBudget,
  editBudget,
} = require("../handlers/Budget");

router.get("/:id", getBudget);
router.get("/", getAllBudgets);
router.post("/", createBudget);
router.delete("/:id", deleteBudget);
router.put("/:id", editBudget);
module.exports = router;
