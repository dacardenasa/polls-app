const bcrypt = require('bcrypt');
const User = require('../models/User');

const startSession = async (email, password) => {
  const user = await User.findOne({ email: email });
  if (user) {
    const result = bcrypt.compareSync(password, user.password);
    if (!result) throw new Error('Password doesn\'t match. Try again!');
    return user;
  } else {
    throw new Error('Email doesn\'t exist. Try again!')
  }
}

module.exports = startSession;