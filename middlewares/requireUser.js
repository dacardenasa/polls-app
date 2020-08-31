const { getUser } = require('../controllers/user.controller');

const requireUser = async (req, res, next) => {
  const sessionUser = req.session.user;
  if (sessionUser) {
    try {
      const user = await getUser(sessionUser._id);
      res.locals.user = user;
      next();
    } catch (error) {
      console.error(error.message);
    }
  } else {
    return res.redirect("/login");
  }
};

module.exports = requireUser;