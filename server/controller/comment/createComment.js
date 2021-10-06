const { User } = require('../../models/user');
const { Diet } = require('../../models/diet');
const { Recipe } = require('../../models/recipe');
const { Comment } = require('../../models/comment');
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
    const { content } = req.body;
    if (!(postType === 'recipes' || postType === 'diets')) {
      return res.status(400).send({ message: '올바른 게시물 타입이 아닙니다.' });
    }
    if (!isValidObjectId(postId)) {
      return res.status(400).send({ message: '해당 게시물id는 유효하지 않습니다.' });
    }
    if (typeof content !== 'string') {
      return res.status(400).send({ message: '댓글 내용을 입력받지 않았습니다.' });
    }

    if (postType === 'recipes') {
      const [user, recipe] = await Promise.all([
        User.findById(ObjectId(payload)),
        Recipe.findById(ObjectId(postId)),
      ]);

      if (!user || !recipe) {
        return res.status(400).send({ message: '유저 혹은 레시피 게시물이 존재하지 않습니다.' });
      }

      const comment = new Comment({ content, user, post: postId, postType: 'recipe' });

      await Promise.all([
        comment.save(),
        Recipe.updateOne({ _id: ObjectId(postId) }, { $inc: { commentsCount: 1 } }),
      ]);

      const { commentsCount } = await Recipe.findOne({ _id: ObjectId(postId) });
      return res.status(201).send({ data: { commentsCount }, message: '댓글이 작성되었습니다.' });
    } else {
      const [user, diet] = await Promise.all([
        User.findById(ObjectId(payload)),
        Diet.findById(ObjectId(postId)),
      ]);

      if (!user || !diet) {
        return res.status(400).send({ message: '유저 혹은 식단 게시물이 존재하지 않습니다.' });
      }

      const comment = new Comment({ content, user, post: postId, postType: 'diet' });
      await Promise.all([
        comment.save(),
        Diet.updateOne({ _id: ObjectId(postId) }, { $inc: { commentsCount: 1 } }),
      ]);

      const { commentsCount } = await Diet.findOne({ _id: ObjectId(postId) });
      return res.status(201).send({ data: { commentsCount }, message: '댓글이 작성되었습니다.' });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
