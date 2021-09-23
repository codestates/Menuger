const { User } = require('../../models/user');
const { verifyAccessToken } = require('../utils/jwt');
const {
  Types: { ObjectId },
} = require('mongoose');

module.exports = (req, res) => {
  try {
    const { payload } = verifyAccessToken(req.cookies.accessToken);
    if (!payload) {
      return res.status(400).send({ message: '유효하지 않은 접근입니다.' });
    }
    const { password } = req.body;
    if (!password) {
      return res.status(400).send({ message: '비밀번호를 입력받지 않았습니다.' });
    }

    User.findOne({ _id: ObjectId(payload) }, (err, user) => {
      if (err) {
        return res.status(400).send(err);
      }
      if (!user) {
        return res.status(400).send({ message: '인증되지 않은 유저입니다.' });
      }

      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          return res.status(400).send(err);
        }

        if (!isMatch) {
          return res.status(400).send({ message: '비밀번호가 일치하지 않습니다.' });
        }
        User.deleteOne({ _id: ObjectId(payload) }, err => {
          if (err) {
            return res.status(400).send(err);
          }

          return res
            .clearCookie('accessToken')
            .clearCookie('refreshToken')
            .status(200)
            .send({ message: 'delete account success' });
        });
      });
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
