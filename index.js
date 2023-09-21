// Entry Point of the API Server

const express = require("express");
require("dotenv").config();

const userRoute = require("./routes/User");
const loginRoute = require("./routes/Login");
const accountRoute = require("./routes/Account");
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

app.use("/user", userRoute);
app.use("/login", loginRoute);
app.use("/account", verifyToken, accountRoute);

// Require the Routes API
// Create a Server and run it on the port 3000
const server = app.listen(3000, function () {
  let host = server.address().address;
  let port = server.address().port;
  // Starting the Server at the port 3000
});
