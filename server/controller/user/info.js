const { User } = require('../../models/user');
const { verifyAccessToken } = require('../utils/jwt');
const {
  Types: { ObjectId },
} = require('mongoose');

module.exports = {
  get: (req, res) => {
    try {
      const { nickname } = req.params;
      if (!nickname) {
        res.status(400).send({ message: '닉네임을 입력받지 않았습니다.' });
      }

      User.findOne({ nickname }, (err, user) => {
        if (err) {
          return res.status(400).send(err);
        }

        if (!user) {
          return res.status(400).send({ message: '존재하지 않는 유저입니다.' });
        }

        const { email, nickname, image_url = '' } = user;

        res.status(200).send({ nickname, email, image_url });
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: err.message });
    }
  },
  patch: async (req, res) => {
    try {
      const { payload } = verifyAccessToken(req.cookies.accessToken);
      if (!payload) {
        return res.status(400).send({ message: '유효하지 않은 접근입니다.' });
      }

      const user = await User.findById(ObjectId(payload));

      if (!user) {
        return res.status(400).send({ message: '인증되지 않은 유저입니다.' });
      }

      const {
        password = user.password,
        image_url = user.image_url,
        nickname = user.nickname,
      } = req.body;

      user.password = password;
      user.image_url = image_url;
      user.nickname = nickname;

      await user.save();

      return res.status(200).send({ message: 'modify userinfo success' });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: err.message });
    }
  },
};
