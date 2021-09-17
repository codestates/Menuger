const {
  Schema,
  model,
  Types: { ObjectId },
} = require('mongoose');

const userSchema = new Schema(
  {
    type: { type: String, default: 'user' },
    email: { type: String, required: true },
    password: { type: String, required: true },
    nickname: { type: String, required: true, unique: true },
    image_url: String,
    subscription: { type: ObjectId, ref: 'user' },
  },
  { timestamps: true },
);

const User = model('user', userSchema);

module.exports = { User };
