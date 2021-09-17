const {
  Schema,
  model,
  Types: { ObjectId },
} = require('mongoose');

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: ObjectId, ref: 'user', required: true },
    subtitle: String,
    type: String,
    like_user: { type: ObjectId, ref: 'user' },
    bookmark_user: { type: ObjectId, ref: 'user' },

    hashtag: { type: ObjectId, ref: 'hashtag' },
  },
  { timestamps: true },
);

postSchema.virtual('comments', {
  ref: 'comment',
  localField: '_id',
  foreignField: 'post',
});

postSchema.set('toObject', { virtuals: true });
postSchema.set('toJSON', { virtuals: true });

const Post = model('post', postSchema);

module.exports = { Post };
