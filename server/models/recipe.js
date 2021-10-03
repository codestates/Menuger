const {
  Schema,
  model,
  Types: { ObjectId },
} = require('mongoose');

const recipeSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    user: {
      _id: { type: ObjectId, ref: 'user', required: true },
      email: { type: String, required: true },
      nickname: { type: String, required: true },
      image_url: { type: String },
    },
    commentsCount: { type: Number, default: 0 },
    likesCount: { type: Number, default: 0 },
    bookmarksCount: { type: Number, default: 0 },
    hashtags: { type: Array, ref: 'hashtag' },
    thumbnail_url: { type: String },
    originalFileName: { type: String },
  },
  { timestamps: true },
);

recipeSchema.index({ likesCount: -1, createdAt: -1 });
recipeSchema.index({ likesCount: 1, createdAt: -1 });
recipeSchema.index({ commentsCount: -1, createdAt: -1 });
recipeSchema.index({ commentsCount: 1, createdAt: -1 });

const Recipe = model('recipe', recipeSchema);

module.exports = { Recipe };
