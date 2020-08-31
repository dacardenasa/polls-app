const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name required"],
      minlength: [5, "Name must have five characteres minimum"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email required"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password required"],
      minlength: [6, "Password must have six characteres minimum"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
