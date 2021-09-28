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
    dietColumnList: { type: Array, required: true, default: [] },
    commentsCount: { type: Number, default: 0 },
    likesCount: { type: Number, default: 0 },
    bookmarksCount: { type: Number, default: 0 },
    hashtags: { type: Array, ref: 'hashtag' },
  },
  { timestamps: true },
);

const Diet = model('diet', dietSchema);

module.exports = { Diet };
