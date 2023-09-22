// Entry Point of the API Server

const express = require("express");
require("dotenv").config();

const userRoutes = require("./routes/User");
const loginRoutes = require("./routes/Login");
const accountRoutes = require("./routes/Account");
const transactionsRoutes = require("./routes/Transactions");
/* Creates an Express application.
   The express() function is a top-level
   function exported by the express module.
*/
const app = express();

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
app.use("/login", loginRoutes);
app.use("/account", verifyToken, accountRoutes);
app.use("/transactions", verifyToken, transactionsRoutes);

// Require the Routess API
// Create a Server and run it on the port 3000
const server = app.listen(3000, function () {
  let host = server.address().address;
  let port = server.address().port;
  // Starting the Server at the port 3000
});
