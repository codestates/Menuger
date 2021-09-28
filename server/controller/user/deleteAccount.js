const { User } = require('../../models/user');
const { Recipe } = require('../../models/recipe');
const { Diet } = require('../../models/diet');
const { Comment } = require('../../models/comment');
const { Like } = require('../../models/like');
const { Bookmark } = require('../../models/bookmark');
const { verifyAccessToken } = require('../utils/jwt');
const {
  Types: { ObjectId },
} = require('mongoose');

module.exports = async (req, res) => {
  try {
    const { payload } = verifyAccessToken(req.cookies.accessToken);
    if (!payload) {
      return res.status(400).send({ message: '유효하지 않은 접근입니다.' });
    }
    const { password } = req.body;
    if (!password) {
      return res.status(400).send({ message: '비밀번호를 입력받지 않았습니다.' });
    }

    await User.findOne({ _id: ObjectId(payload) }, (err, user) => {
      if (err) {
        return res.status(400).send(err);
      }
      if (!user) {
        return res.status(400).send({ message: '인증되지 않은 유저입니다.' });
      }

      user.comparePassword(password, async (err, isMatch) => {
        if (err) {
          return res.status(400).send(err);
        }

        if (!isMatch) {
          return res.status(400).send({ message: '비밀번호가 일치하지 않습니다.' });
        }

        await Promise.all([
          User.findOneAndDelete({ _id: ObjectId(payload) }),
          Recipe.deleteMany({ 'user._id': ObjectId(payload) }),
          Diet.deleteMany({ 'user._id': ObjectId(payload) }),
        ]);

        Comment.find({ 'user._id': ObjectId(payload) }, async (err, comments) => {
          if (err) {
            return res.status(400).send(err);
          }
          comments.map(async comment => {
            await Promise.all([
              Recipe.updateOne({ _id: comment.post }, { $inc: { commentsCount: -1 } }),
              Diet.updateOne({ _id: comment.post }, { $inc: { commentsCount: -1 } }),
            ]);
          });
          await Comment.deleteMany({ 'user._id': ObjectId(payload) });
        });
        Like.find({ user: ObjectId(payload) }, async (err, likes) => {
          if (err) {
            return res.status(400).send(err);
          }
          likes.map(async like => {
            await Promise.all([
              Recipe.updateOne({ _id: like.post }, { $inc: { likesCount: -1 } }),
              Diet.updateOne({ _id: like.post }, { $inc: { likesCount: -1 } }),
            ]);
          });
          await Like.deleteMany({ user: ObjectId(payload) });
        });
        Bookmark.find({ user: ObjectId(payload) }, async (err, bookmarks) => {
          if (err) {
            return res.status(400).send(err);
          }
          bookmarks.map(async bookmark => {
            await Promise.all([
              Recipe.updateOne({ _id: bookmark.post }, { $inc: { bookmarksCount: -1 } }),
              Diet.updateOne({ _id: bookmark.post }, { $inc: { bookmarksCount: -1 } }),
            ]);
          });
          await Bookmark.deleteMany({ user: ObjectId(payload) });
        });
        return res
          .clearCookie('accessToken')
          .clearCookie('refreshToken')
          .status(200)
          .send({ message: 'delete account success' });
      });
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
