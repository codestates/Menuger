const { Comment } = require('../../models/comment');
const {
  isValidObjectId,
  Types: { ObjectId },
} = require('mongoose');

module.exports = async (req, res) => {
  try {
    let { page = 1 } = req.query;
    page = parseInt(page);
    const { postType, postId } = req.params;
    if (!(postType === 'recipes' || postType === 'diets')) {
      return res.status(400).send({ message: '올바른 게시물 타입이 아닙니다.' });
    }
    if (!isValidObjectId(postId)) {
      return res.status(400).send({ message: '해당 게시물id는 유효하지 않습니다.' });
    }

    const comments = await Comment.find({ post: ObjectId(postId) })
      .sort({ createdAt: 1 })
      .skip((page - 1) * 6)
      .limit(6);
    return res.status(200).send({ comments });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
