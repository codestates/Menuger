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

    User.findOneAndUpdate({ _id: ObjectId(payload) }, { refreshToken: '' }, (err, user) => {
      if (err) {
        return res.status(400).send(err);
      }
      if (!user) {
        return res.status(400).send({ message: '인증되지 않은 유저입니다.' });
      }

      return res
        .clearCookie('accessToken')
        .clearCookie('refreshToken')
        .status(200)
        .send({ message: 'signout success' });
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
