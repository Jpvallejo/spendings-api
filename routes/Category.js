const express = require("express");
const router = express.Router();
const {
  getCategory,
  createCategory,
  deleteCategory,
  editCategory,
} = require("../handlers/Category");

router.get("/", getCategory);
router.post("/", createCategory);
router.delete("/:id", deleteCategory);
router.put("/:id", editCategory);
module.exports = router;
