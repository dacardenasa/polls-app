const Poll = require('../models/Poll');

const createPoll = async ( name, description, options, userId ) => {
  const poll = new Poll({
    name,
    description,
    options: options.map( option => {
      return { name: option }
    }),
    author: userId,
  });

  try {
    await poll.save();
    return poll;
  } catch (error) {
    throw error;
  }
}

const getPoll = async (id) => {
  try {
    const poll = await Poll.findById(id).populate('author').exec();
    return poll;
  } catch (error) {
    throw error;
  }
}

const getPolls = async () => {
  try {
    polls = await Poll.find().populate('author');
    return polls;
  } catch (error) {
    throw error;
  }
}

const addVote = async (id, userOption) => {
  const poll = await Poll.findById(id).populate('author').exec();
  poll.options.map( option => {
    if (option.name === userOption) { option.votes++ }
  });

  try {
    await poll.save();
    return 'Vote added successfully';
  } catch (error) {
    throw error;
  }
}

const deletePoll = async(id) => {
  try {
    await Poll.findByIdAndDelete(id);
    return 'Poll delete successfully';
  } catch (error) {
    throw error;
  }
}

module.exports = { addVote, createPoll, getPolls, getPoll, deletePoll };