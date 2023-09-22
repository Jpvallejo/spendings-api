const express = require("express");
const router = express.Router();
const { getCards, createCard } = require("../handlers/CreditCard");

router.get("/", getCards);
router.post("/", createCard);
module.exports = router;
