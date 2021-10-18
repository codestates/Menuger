const { User } = require('../../models/user');
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

    const { postType, postId, commentId } = req.params;
    if (!isValidObjectId(commentId)) {
      return res.status(400).send({ message: '해당 댓글id는 유효하지 않습니다.' });
    }

    const [comment, user] = await Promise.all([
      Comment.findById(ObjectId(commentId)),
      User.findOne({ _id: ObjectId(payload) }),
    ]);
    if (!comment) {
      return res.status(400).send({ message: '존재하지 않는 댓글입니다.' });
    }

    if (user.type !== 'admin') {
      if (!comment.user._id.equals(ObjectId(payload))) {
        return res.status(400).send({ message: '댓글 작성자만 삭제할 수 있습니다.' });
      }
    }

    await Promise.all([
      Comment.deleteOne({ _id: ObjectId(commentId) }),
      postType === 'recipes'
        ? Recipe.updateOne({ _id: ObjectId(postId) }, { $inc: { commentsCount: -1 } })
        : Diet.updateOne({ _id: ObjectId(postId) }, { $inc: { commentsCount: -1 } }),
    ]);

    return res.status(200).send({ message: '해당 댓글을 삭제하였습니다.' });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
