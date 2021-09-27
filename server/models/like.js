const {
  Schema,
  model,
  Types: { ObjectId },
} = require('mongoose');

const likeSchema = new Schema({
  user: { type: ObjectId, required: true, ref: 'user' },
  post: { type: ObjectId, required: true, refPath: 'postType' },
  postType: { type: String, enum: ['recipe', 'diet'] },
});

const Like = model('like', likeSchema);

module.exports = { Like };
