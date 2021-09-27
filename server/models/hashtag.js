const { Schema, model } = require('mongoose');

const hashtagSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true },
);

const Hashtag = model('hashtag', hashtagSchema);

module.exports = { Hashtag };
