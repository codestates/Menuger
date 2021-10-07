const { User } = require('../../models/user');
const { Bookmark } = require('../../models/bookmark');
const { Diet } = require('../../models/diet');
const { Recipe } = require('../../models/recipe');
const { verifyAccessToken } = require('../utils/jwt');
const {
  isValidObjectId,
  Types: { ObjectId },
} = require('mongoose');

module.exports = async (req, res) => {
  try {
    let payload;
    if (req.cookies.kakaoAccessToken) {
      const kakaoUser = await User.findOne({ refreshToken: req.cookies.kakaoRefreshToken });
      payload = kakaoUser._id;
    } else {
      payload = verifyAccessToken(req.cookies.accessToken).payload;
      if (!payload) {
        return res.status(400).send({ message: '유효하지 않은 접근입니다.' });
      }
    }

    const { postType, postId } = req.params;
    if (!(postType === 'recipes' || postType === 'diets')) {
      return res.status(400).send({ message: '올바른 게시물 타입이 아닙니다.' });
    }
    if (!isValidObjectId(postId)) {
      return res.status(400).send({ message: '해당 게시물id는 유효하지 않습니다.' });
    }

    Bookmark.findOne({ user: payload, post: postId }, async (err, bookmark) => {
      if (err) {
        return res.status(400).send({ message: err.message });
      }

      if (!bookmark) {
        return res.status(400).send({ message: '잘못된 북마크 등록 취소 요청입니다.' });
      } else {
        let updatedPost;
        if (postType === 'recipes') {
          await Promise.all([
            Bookmark.deleteOne({ user: ObjectId(payload), post: ObjectId(postId) }),
            Recipe.updateOne({ _id: ObjectId(postId) }, { $inc: { bookmarksCount: -1 } }),
          ]);
          updatedPost = await Recipe.findOne({ _id: ObjectId(postId) });
        } else {
          await Promise.all([
            Bookmark.deleteOne({ user: ObjectId(payload), post: ObjectId(postId) }),
            Diet.updateOne({ _id: ObjectId(postId) }, { $inc: { bookmarksCount: -1 } }),
          ]);
          updatedPost = await Diet.findOne({ _id: ObjectId(postId) });
        }
        return res.status(200).send({
          bookmarksCount: updatedPost.bookmarksCount,
          message: '해당 게시물의 북마크 등록을 취소하였습니다.',
        });
      }
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
