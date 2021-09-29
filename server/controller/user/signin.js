require('dotenv').config();
const { User } = require('../../models/user');
const { createAccessToken, createRefreshToken } = require('../utils/jwt');

module.exports = (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email) {
      return res.status(400).send({ message: '이메일을 입력받지 않았습니다.' });
    }
    if (!password) {
      return res.status(400).send({ message: '비밀번호를 입력받지 않았습니다.' });
    }
    User.findOne({ email: email }, (err, user) => {
      if (err) {
        return res.status(400).send(err);
      }

      if (!user) {
        return res
          .status(400)
          .send({ message: '입력받은 이메일에 해당하는 유저가 존재하지 않습니다.' });
      }

      user.comparePassword(password, async (err, isMatch) => {
        if (err) {
          return res.status(400).send(err);
        }

        if (!isMatch) {
          return res.status(400).send({ message: '비밀번호가 일치하지 않습니다.' });
        }
        const accessToken = createAccessToken(user._id.toHexString());
        const refreshToken = createRefreshToken({});

        res.cookie('accessToken', accessToken, {
          httpOnly: true,
          // secure: false,
          // sameSite: 'None',
        });
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          // secure: false,
          // sameSite: 'None',
        });

        user.refreshToken = refreshToken;
        await user.save();

        return res.status(200).send({
          user: {
            type: user._type,
            image_url: user.image_url,
            nickname: user.nickname,
            email: user.email,
          },
          message: '로그인에 성공하였습니다.',
        });
      });
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
