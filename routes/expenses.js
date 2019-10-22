const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Expense = require("../models/Expense");

// @route     GET api/expenses
// @desc      Get all expenses of a user
// @access    Private
router.get("/", auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(expenses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     POST api/expenses
// @desc      Add new expense
// @access    Private
router.post(
  "/",
  [
    auth,
    [
      check("amount", "Please enter an amount")
        .not()
        .isEmpty(),
      check("category", "Please select a category")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount, description, category, date } = req.body;

    try {
      const newExpense = new Expense({
        amount,
        description,
        category,
        date,
        user: req.user.id
      });

      const expense = await newExpense.save();
      res.json(expense);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route     PUT api/expenses/:id
// @desc      Update expense
// @access    Private
router.put("/:id", (req, res) => {
  res.send("Update expense entry");
});

// @route     DELETE api/expenses/:id
// @desc      Delete expense
// @access    Private
router.delete("/:id", (req, res) => {
  res.send("Delete expense entry");
});

module.exports = router;
