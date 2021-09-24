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
    const { payload } = verifyAccessToken(req.cookies.accessToken);
    if (!payload) {
      return res.status(400).send({ message: '유효하지 않은 접근입니다.' });
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

    const user = await User.findById(ObjectId(payload));
    if (!user) {
      return res.status(400).send({ message: '존재하지 않는 유저입니다.' });
    }
    let post;
    if (postType === 'recipes') {
      post = await Recipe.findById(ObjectId(postId));
    } else {
      post = await Diet.findById(ObjectId(postId));
    }

    if (!post) {
      return res.status(400).send({ message: '존재하지 않는 게시물입니다.' });
    }

    const comment = new Comment({ content, user, post });
    await comment.save();
    return res.status(200).send({ message: '댓글이 작성되었습니다.' });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
