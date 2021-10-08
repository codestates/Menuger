const { User } = require('../../models/user');
const { Like } = require('../../models/like');
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

    Like.findOne({ user: payload, post: postId }, async (err, like) => {
      if (err) {
        return res.status(400).send({ message: err.message });
      }

      if (!like) {
        return res.status(400).send({ message: '잘못된 좋아요 취소 요청입니다.' });
      } else {
        let updatedPost;
        if (postType === 'recipes') {
          await Promise.all([
            Like.deleteOne({ user: ObjectId(payload), post: ObjectId(postId) }),
            Recipe.updateOne({ _id: ObjectId(postId) }, { $inc: { likesCount: -1 } }),
          ]);
          updatedPost = await Recipe.findOne({ _id: ObjectId(postId) });
        } else {
          await Promise.all([
            Like.deleteOne({ user: ObjectId(payload), post: ObjectId(postId) }),
            Diet.updateOne({ _id: ObjectId(postId) }, { $inc: { likesCount: -1 } }),
          ]);
          updatedPost = await Diet.findOne({ _id: ObjectId(postId) });
        }
        return res.status(200).send({
          likesCount: updatedPost.likesCount,
          message: '해당 게시물의 좋아요를 취소하였습니다.',
        });
      }
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
