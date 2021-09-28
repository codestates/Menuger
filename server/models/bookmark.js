const {
  Schema,
  model,
  Types: { ObjectId },
} = require('mongoose');

const bookmarkSchema = new Schema({
  user: { type: ObjectId, required: true, ref: 'user' },
  post: { type: ObjectId, required: true, refPath: 'postType' },
  postType: { type: String, enum: ['recipe', 'diet'] },
});

const Bookmark = model('bookmark', bookmarkSchema);

module.exports = { Bookmark };
