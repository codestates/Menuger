const {
  Schema,
  model,
  Types: { ObjectId },
} = require('mongoose');

const commentSchema = new Schema(
  {
    content: { type: String, required: true },
    user: {
      _id: { type: ObjectId, ref: 'user', required: true },
      email: { type: String, required: true },
      nickname: { type: String, required: true },
      image_url: { type: String, required: true },
    },
  },
  { timestamps: true },
);

const Comment = model('comment', commentSchema);

module.exports = { Comment, commentSchema };
