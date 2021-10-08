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
      image_url: { type: String },
    },
    post: { type: ObjectId, refPath: 'postType' },
    postType: { type: String, enum: ['recipe', 'diet'] },
  },
  { timestamps: true },
);

commentSchema.index({ createdAt: 1 });

const Comment = model('comment', commentSchema);

module.exports = { Comment, commentSchema };
