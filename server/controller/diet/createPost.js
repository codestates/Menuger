const { User } = require('../../models/user');
const { Diet } = require('../../models/diet');
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
    const { title, subtitle, content, hashtags = [] } = req.body;

    const post = new Diet({
      title,
      subtitle,
      content,
      user,
      hashtags,
    });
    await post.save();
    return res.status(201).send({ message: '식단 작성이 완료되었습니다.' });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
