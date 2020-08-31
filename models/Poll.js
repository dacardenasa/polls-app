const mongoose = require("mongoose");
const User = require("../models/User");
const Schema = mongoose.Schema;

const PollSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name required"],
      minlength: [5, "Name must have five characters minimum!"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description required"],
      minlength: [20, "Description must have twenty characters minimum!"],
      trim: true,
    },
    options: [
      {
        name: {
          type: String,
          required: [true, "Option's name required"],
          minlength: [3, "Option's name must have three characters minimum!"],
          trim: true,
        },
        votes: { type: Number, default: 0 },
      },
    ],
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

PollSchema.methods.getTotalVotes = function() {
  return this.options.reduce( (accum, cur) => {
    return accum + cur.votes
  }, 0);
}

PollSchema.methods.formatDescription = function() {
  return this.description.slice(0, 50).concat('......');
}

module.exports = mongoose.model("Poll", PollSchema);
