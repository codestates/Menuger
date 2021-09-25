const { Comment } = require('../../models/comment');
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

    const { postType, commentId } = req.params;
    if (!isValidObjectId(commentId)) {
      return res.status(400).send({ message: '해당 댓글id는 유효하지 않습니다.' });
    }

    const comment = await Comment.findById(ObjectId(commentId));
    if (!comment) {
      return res.status(400).send({ message: '존재하지 않는 댓글입니다.' });
    }

    if (!comment.user._id.equals(ObjectId(payload))) {
      return res.status(400).send({ message: '댓글 작성자만 삭제할 수 있습니다.' });
    }
    if (postType === 'recipes') {
      await Promise.all([
        Comment.deleteOne({ _id: ObjectId(commentId) }),
        Recipe.updateOne(
          { 'comments._id': ObjectId(commentId) },
          { $pull: { comments: { _id: commentId } } },
        ),
      ]);
    } else {
      await Promise.all([
        Comment.deleteOne({ _id: ObjectId(commentId) }),
        Diet.updateOne(
          { 'comments._id': ObjectId(commentId) },
          { $pull: { comments: { _id: commentId } } },
        ),
      ]);
    }
    return res.status(200).send({ message: 'delete comment success' });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};