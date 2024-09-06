const express = require("express");
const cors = require("cors");

const expenseRouter = require("./routers/expense");
const sequelize = require("./utils/database");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/expenses", expenseRouter);

sequelize
  .sync()
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));
