const { User } = require('../../models/user');
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

    const { commentId } = req.params;
    if (!isValidObjectId(commentId)) {
      return res.status(400).send({ message: '해당 댓글id는 유효하지 않습니다.' });
    }

    const comment = await Comment.findById(ObjectId(commentId));
    if (!comment) {
      return res.status(400).send({ message: '존재하지 않는 댓글입니다.' });
    }

    if (!comment.user._id.equals(ObjectId(payload))) {
      return res.status(400).send({ message: '댓글 작성자만 수정할 수 있습니다.' });
    }

    const { content } = req.body;
    if (typeof content !== 'string') {
      return res.status(400).send({ message: '댓글의 수정할 내용을 입력해주세요.' });
    }

    await Comment.updateOne({ _id: ObjectId(commentId) }, { content });

    return res.status(200).send({ message: '해당 댓글을 수정하였습니다.' });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
