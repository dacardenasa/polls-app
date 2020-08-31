const User = require("../models/User");
const bcrypt = require("bcrypt");

const createUser = async ({name, email, password}) => {
  const user = await User.findOne({ email: email });

  if (user) {
    throw new Error(`Email ${email} is already registered in system!`);
  }

  const hash = bcrypt.hashSync(password, 10);
  const newUser = new User({
    name,
    email,
    password: hash,
  });

  try {
    await newUser.save();
    return "User created succesfully!";
  } catch (error) {
    throw error;
  }
};

const getUser = async (userId) => {
  try {
    const user = await User.findOne({ _id: userId });
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  getUser,
};
