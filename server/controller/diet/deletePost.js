const { Diet } = require('../../models/diet');
const { Comment } = require('../../models/comment');
const { Like } = require('../../models/like');
const { Bookmark } = require('../../models/bookmark');
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

    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).send({ message: '해당 게시물id는 유효하지 않습니다.' });
    }

    const diet = await Diet.findOne({ _id: id });

    if (!diet) {
      return res.status(400).send({ message: '존재하지 않는 게시물입니다.' });
    }

    if (!diet.user._id.equals(ObjectId(payload))) {
      return res.status(400).send({ message: '게시물의 작성자만 삭제할 수 있습니다' });
    }

    await Promise.all([
      Diet.deleteOne({ _id: id }),
      Comment.deleteMany({ post: id }),
      Like.deleteMany({ post: id }),
      Bookmark.deleteMany({ post: id }),
    ]);
    return res.status(200).send({ message: 'delete diet post success' });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
