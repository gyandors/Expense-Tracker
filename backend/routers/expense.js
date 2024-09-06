const express = require("express");

const router = express.Router();

const expenseController = require("../controllers/expense");

router.get("/", expenseController.getExpense);

router.post("/", expenseController.postExpense);

router.delete("/:expenseId", expenseController.deleteExpense);

router.put("/:expenseId", expenseController.putExpense);

module.exports = router;
