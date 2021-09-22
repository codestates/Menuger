const { User } = require('../../models/user');
const { createAccessToken, createRefreshToken } = require('../utils/jwt');

module.exports = {
  post: (req, res) => {
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
          res.status(400).send(err);
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
            secure: false, // 로컬에서 테스트할때는 https로 제공되지 않으므로 false
            sameSite: 'None',
          });
          res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'None',
          });

          user.refreshToken = refreshToken;
          await user.save();

          res.status(200).send({ message: 'sign in success' });
        });
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: err.message });
    }
  },
};