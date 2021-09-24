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
    post: {
      _id: { type: ObjectId, required: true, refPath: 'postType' },
      user: {
        _id: { type: ObjectId, ref: 'user', required: true },
        email: { type: String, required: true },
        nickname: { type: String, required: true },
        image_url: { type: String, required: true },
      },
      hashtag: { type: Array, required: true, ref: 'hashtag' },
      title: { type: String, required: true },
      subtitle: String,
      content: { type: String, required: true },
    },
    postType: { type: String, enum: ['recipe', 'diet'] },
  },
  { timestamps: true },
);

const Comment = model('comment', commentSchema);

module.exports = { Comment };
