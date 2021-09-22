const {
  Schema,
  model,
  Types: { ObjectId },
} = require('mongoose');

const recipeSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: ObjectId, ref: 'user', required: true },
    like_user: { type: ObjectId, ref: 'user' },
    bookmark_user: { type: ObjectId, ref: 'user' },
    hashtag: { type: Array, ref: 'hashtag' },
  },
  { timestamps: true },
);

recipeSchema.virtual('comments', {
  ref: 'comment',
  localField: '_id',
  foreignField: 'post',
});

recipeSchema.set('toObject', { virtuals: true });
recipeSchema.set('toJSON', { virtuals: true });

const Recipe = model('recipe', recipeSchema);

module.exports = { Recipe };
