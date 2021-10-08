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
    } else {
      payload = verifyAccessToken(req.cookies.accessToken).payload;
      if (!payload) {
        return res.status(400).send({ message: '유효하지 않은 접근입니다.' });
      }
    }

    const { nickname } = req.params;

    await User.findOne({ nickname }, async (err, subscribeUser) => {
      if (err) {
        return res.status(400).send(err);
      }
      if (!subscribeUser) {
        return res.status(400).send({ message: '존재하지 않은 유저입니다.' });
      }

      await User.updateOne(
        { _id: ObjectId(payload) },
        { $pull: { subscribes: subscribeUser._id } },
      );

      return res.status(200).send({ message: '해당 유저를 구독취소하였습니다.' });
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
