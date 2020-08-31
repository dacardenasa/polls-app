const express = require("express");
const requireUser = require("../middlewares/requireUser");
const { addVote, createPoll, getPolls, getPoll, deletePoll } = require("../controllers/poll.controller");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const polls = await getPolls();
    res.render("polls", { polls, user: req.session.user });
  } catch (error) {
    res.render("polls", { error: error.message, user: req.session.user });
  }
});

router.get("/create", requireUser, (req, res) => {
  res.render("poll-form");
});

router.post("/create", async (req, res) => {
  try {
    const { name, description, options } = req.body;
    const poll = await createPoll( name, description, options, req.session.user._id);
    req.session.message = 'Poll created successfully';
    res.redirect(`/polls/${poll._id}/results`);
  } catch (error) {
    let handleErrors = {};
    if (error.name === "ValidationError") {
      const { name, description } = error.errors;
      const arrayErrors = Object.keys(error.errors);
      arrayErrors.forEach( arrayError => {
        if (arrayError === 'name') {
          handleErrors['name'] = name.message;
        } else if (arrayError === 'description') {
          handleErrors['description'] = description.message;
        } else if (arrayError !== 'name' && arrayError !== 'description') {
          handleErrors['optionsError'] = error.errors[`${arrayError}`].message;
        }
      });
      if (!handleErrors.hasOwnProperty('user')) handleErrors['user'] = req.session.user;
      res.render('poll-form', handleErrors);
    } else {
      res.render('poll-form', { user: req.session.user, error: error.message });
    }
  }
});

router.get("/:id", async (req, res) => {
  try {
    const poll = await getPoll(req.params.id);
    res.render('poll-form-vote', { poll, user: req.session.user });
  } catch {
    res.render('polls', { error: error.message });
  }
});

router.post("/:id", async (req, res) => {
  try {
    await addVote(req.params.id, req.body.option);
    res.redirect(`/polls/${req.params.id}/results`);
  } catch (error) {
    res.redirect(`/${req.params.id}`);
  }
});

router.get("/:id/results", async (req, res) => {
  try {
    const poll = await getPoll(req.params.id);
    const message = req.session.message;
    req.session.message = null;
    res.render('results', { poll, user: req.session.user, message });
  } catch {
    res.render('polls', { error: error.message });
  }
})

router.post("/delete/:id", async (req, res) => {
  try {
    const message = await deletePoll(req.params.id);
    const polls = await getPolls();
    res.render('polls', { polls, message, user: req.session.user });
  } catch {
    res.render('polls', { error: error.message });
  }
});

module.exports = router;
