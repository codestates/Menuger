const {
  Schema,
  model,
  Types: { ObjectId },
} = require('mongoose');
const { commentSchema } = require('./comment');

const recipeSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    user: {
      _id: { type: ObjectId, ref: 'user', required: true },
      email: { type: String, required: true },
      nickname: { type: String, required: true },
      image_url: { type: String, required: true },
    },
    comments: [commentSchema],
    like_user: { type: ObjectId, ref: 'user' },
    bookmark_user: { type: ObjectId, ref: 'user' },
    hashtag: { type: Array, ref: 'hashtag' },
  },
  { timestamps: true },
);

// recipeSchema.virtual('comments', {
//   ref: 'comment',
//   localField: '_id',
//   foreignField: 'post._id',
// });

// recipeSchema.set('toObject', { virtuals: true });
// recipeSchema.set('toJSON', { virtuals: true });

const Recipe = model('recipe', recipeSchema);

module.exports = { Recipe };
