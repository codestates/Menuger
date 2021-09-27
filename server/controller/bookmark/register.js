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
    const { payload } = verifyAccessToken(req.cookies.accessToken);
    if (!payload) {
      return res.status(400).send({ message: '유효하지 않은 접근입니다.' });
    }

    const { postType, postId } = req.params;
    if (!(postType === 'recipes' || postType === 'diets')) {
      return res.status(400).send({ message: '올바른 게시물 타입이 아닙니다.' });
    }
    if (!isValidObjectId(postId)) {
      return res.status(400).send({ message: '해당 게시물id는 유효하지 않습니다.' });
    }

    Bookmark.findOne({ user: payload, post: postId }, async (err, alreadyLike) => {
      if (err) {
        return res.status(400).send({ message: err.message });
      }
      if (alreadyLike) {
        return res.status(400).send({ message: '해당 게시물을 이미 북마크에 등록하였습니다' });
      } else {
        if (postType === 'recipes') {
          const recipe = await Recipe.findOne({ _id: ObjectId(postId) });
          if (!recipe) {
            return res.status(400).send({ message: '해당 레시피가 존재하지 않습니다.' });
          }

          const bookmark = new Bookmark({ user: payload, post: postId, postType: 'recipe' });

          await Promise.all([
            bookmark.save(),
            Recipe.updateOne({ _id: ObjectId(postId) }, { $inc: { bookmarksCount: 1 } }),
          ]);
        } else {
          const diet = await Diet.findOne({ _id: ObjectId(postId) });
          if (!diet) {
            return res.status(400).send({ message: '해당 식단이 존재하지 않습니다.' });
          }

          const bookmark = new Bookmark({ user: payload, post: postId, postType: 'diet' });

          await Promise.all([
            bookmark.save(),
            Diet.updateOne({ _id: ObjectId(postId) }, { $inc: { bookmarksCount: 1 } }),
          ]);
        }
        return res.status(201).send({ message: '해당 게시물을 북마크에 등록하였습니다.' });
      }
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
