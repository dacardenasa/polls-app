const express = require("express");
const router = express.Router();
const { getPolls } = require("../controllers/poll.controller");
const { createUser } = require("../controllers/user.controller");
const startSession = require("../controllers/session.controller");

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index", { user: req.session.user });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user  = await startSession(email, password);
    const polls = await getPolls();
    req.session.user = user;
    res.render('polls', { user: req.session.user, polls, message: `Welcome ${user.name}` });
  } catch (error) {
    res.render('login', { error: error.message });
  }
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const data = await createUser({ name, email, password });
    res.render("login", { success: data });
  } catch (error) {
    if (error.name === "ValidationError") {
      const { name, email } = error.errors;
      let errorsHandler;
      if (name && email) {
        errorsHandler = { name: name.message, email: email.message };
      } else if (name) {
        errorsHandler = { name: name.message };
      } else {
        errorsHandler = { email: email.message };
      }
      res.render("signup", errorsHandler);
    } else {
      res.render("signup", { error: error.message });
    }
  }
});

router.get("/logout", (req, res) => {
  req.session = null;
  res.render("login");
});

module.exports = router;
