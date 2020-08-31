const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const methodOverride = require('method-override');
const bodyParser = require("body-parser");
const pollRouter = require("./routes/poll");
const indexRouter = require("./routes/index");
require("dotenv").config();

const app = express();

// Set database connection
mongoose
  .connect(process.env.MONGODB_URL || "mongodb://localhost:27017/polls", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error));

// Set cookie-session config
app.use(
  cookieSession({
    keys: ['key1', 'key2'],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

// Bootstrap 4 y librerías necesarias
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use("/js", express.static(__dirname + "/node_modules/jquery/dist"));
app.use("/js", express.static(__dirname + "/node_modules/popper.js/dist"));
app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js"));
app.use("/js", express.static(__dirname + "/node_modules/share-buttons/dist"));

app.use("/", indexRouter);
app.use("/polls", pollRouter);
app.all('*', function(req, res) {
  res.redirect("/");
});

module.exports = app;
