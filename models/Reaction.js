const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;