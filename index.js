// Entry Point of the API Server

const express = require("express");
require("dotenv").config();
const cors = require("cors");

const userRoutes = require("./routes/User");
const {loginRouter, registerRouter} = require("./routes/Login");
const accountRoutes = require("./routes/Account");
const transactionsRoutes = require("./routes/Transactions");
const creditCardRoutes = require("./routes/CreditCard");
const categoryRoutes = require("./routes/Category");
const budgetRoutes = require("./routes/Budget");
const creditCardExpenseRoutes = require("./routes/CreditCardExpense");
/* Creates an Express application.
   The express() function is a top-level
   function exported by the express module.
*/
const app = express();
app.use(cors());

/* To handle the HTTP Methods Body Parser
is used, Generally used to extract the
entire body portion of an incoming
request stream and exposes it on req.body
*/
const bodyParser = require("body-parser");
const verifyToken = require("./middleware/ValidateToken");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));

app.use("/user", userRoutes);
app.use("/login", loginRouter);
app.use("/sign-up", registerRouter);
app.use("/account", verifyToken, accountRoutes);
app.use("/transactions", verifyToken, transactionsRoutes);
app.use("/credit-card", verifyToken, creditCardRoutes);
app.use("/budget", verifyToken, budgetRoutes);
app.use("/category", verifyToken, categoryRoutes);
app.use("/credit-card-expense", verifyToken, creditCardExpenseRoutes);
// Require the Routess API
// Create a Server and run it on the port 3000
const server = app.listen(4000, function () {
  let host = server.address().address;
  let port = server.address().port;
  // Starting the Server at the port 3000
});
