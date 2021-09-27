const {
  Schema,
  model,
  Types: { ObjectId },
} = require('mongoose');

const dietSchema = new Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    content: { type: String, required: true },
    user: {
      _id: { type: ObjectId, ref: 'user', required: true },
      email: { type: String, required: true },
      nickname: { type: String, required: true },
      image_url: { type: String, required: true },
    },
    commentsCount: { type: Number, default: 0 },
    like_user: { type: ObjectId, ref: 'user' },
    bookmark_user: { type: ObjectId, ref: 'user' },
    hashtag: { type: Array, ref: 'hashtag' },
  },
  { timestamps: true },
);

const Diet = model('diet', dietSchema);

module.exports = { Diet };
