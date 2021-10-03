const { User } = require('../../models/user');
const { Recipe } = require('../../models/recipe');
const { verifyAccessToken } = require('../utils/jwt');
const {
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

    const user = await User.findById(ObjectId(payload));
    const { title, content, images = [], hashtags = [] } = req.body;

    const post = new Recipe({
      title,
      content,
      user,
      hashtags,
      thumbnail_url: images.length ? images[0].imageKey : null,
      originalFileName: images.length ? images[0].originalname : null,
    });

    await post.save();
    return res
      .status(201)
      .send({ data: { postId: post._id }, message: '레시피 작성이 완료되었습니다.' });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
