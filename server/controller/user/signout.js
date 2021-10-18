const axios = require('axios');
const { User } = require('../../models/user');
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

      await axios.post('https://kapi.kakao.com/vi/user/logout', {
        headers: {
          Authorization: `Bearer ${req.cookies.kakaoAccessToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
    } else {
      payload = verifyAccessToken(req.cookies.accessToken).payload;
      if (!payload) {
        return res.status(400).send({ message: '유효하지 않은 접근입니다.' });
      }
    }

    User.findOneAndUpdate({ _id: ObjectId(payload) }, { refreshToken: '' }, (err, user) => {
      if (err) {
        return res.status(400).send(err);
      }
      if (!user) {
        return res.status(400).send({ message: '인증되지 않은 유저입니다.' });
      }

      return res
        .clearCookie('accessToken', { path: '/', domain: '.menuger.shop' })
        .clearCookie('refreshToken', { path: '/', domain: '.menuger.shop' })
        .clearCookie('kakaoAccessToken', { path: '/', domain: '.menuger.shop' })
        .clearCookie('kakaoRefreshToken', { path: '/', domain: '.menuger.shop' })
        .status(200)
        .send({ message: '로그아웃 하였습니다.' });
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
