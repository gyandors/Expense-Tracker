const Expense = require("../models/expense");

exports.getExpense = (req, res, next) => {
  Expense.findAll()
    .then((result) => {
      const arr = [];
      result.forEach((exp) => {
        arr.push(exp.dataValues);
      });
      res.status(200).json(arr);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json();
    });
};

exports.postExpense = (req, res, next) => {
  Expense.create({
    amount: req.body.amount,
    category: req.body.category,
    description: req.body.description,
  })
    .then((result) => {
      res.status(201).json(result.dataValues);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json();
    });
};

exports.deleteExpense = (req, res, next) => {
  Expense.destroy({ where: { _id: req.params.expenseId } })
    .then((result) => {
      res.status(200).json("Successfull");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json();
    });
};

exports.putExpense = (req, res, next) => {
  Expense.update(
    {
      amount: req.body.amount,
      category: req.body.category,
      description: req.body.description,
    },
    { where: { _id: req.params.expenseId } }
  )
    .then((result) => {
      res.status(201).json("Successfull");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json();
    });
};
