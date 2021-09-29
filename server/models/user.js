require('dotenv').config();
const { Schema, model } = require('mongoose');

const bcrypt = require('bcrypt');
let saltRound = 3; //salt를 돌리는 횟수

const userSchema = new Schema(
  {
    type: { type: String, default: 'user', enum: ['user', 'admin', 'kakao', 'google'] },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    nickname: { type: String, required: true, unique: true },
    image_url: { type: String, default: 'null' },
    refreshToken: String,
    subscribes: Array,
  },
  { timestamps: true },
);

userSchema.pre('save', function (next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(saltRound, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, (err, hashedPassword) => {
        if (err) {
          return next(err);
        }
        user.password = hashedPassword;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.method('comparePassword', function (plainPassword, callback) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
});

const User = model('user', userSchema);

module.exports = { User };
