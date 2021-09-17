const {
  Schema,
  model,
  Types: { ObjectId },
} = require('mongoose');

const commentSchema = new Schema(
  {
    content: { type: String, required: true },
    user: { type: ObjectId, ref: 'user' },
    post: { type: ObjectId, ref: 'post' },
  },
  { timestamps: true },
);

const Comment = model('comment', commentSchema);

module.exports = { Comment };
