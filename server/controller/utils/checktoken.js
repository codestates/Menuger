require('dotenv').config();
const { User } = require('../../models/user');
const {
  verifyAccessToken,
  verifyRefreshToken,
  createAccessToken,
  createRefreshToken,
} = require('./jwt');

module.exports = {
  checkToken: async (req, res, next) => {
    try {
      let { accessToken, refreshToken } = req.cookies;
      if (accessToken === undefined) {
        return res.status(401).send({ message: '사용 권한이 없습니다' });
      }

      const verifiedAccessToken = verifyAccessToken(accessToken);
      const verifiedRefreshToken = verifyRefreshToken(refreshToken);

      if (verifiedAccessToken === null) {
        if (verifiedRefreshToken === null) {
          // accessToken, refreshToken 모두 만료된 경우
          return res.status(401).send({ message: '사용 권한이 없습니다' });
        } else {
          // accessToken 만료, refreshToken 유효한 경우
          await User.findOne({ refreshToken }, (err, user) => {
            if (err) {
              return res.status(400).send(err);
            }
            if (!user) {
              return res.status(400).send({ message: '인증되지 않은 유저입니다.' });
            }

            const newAccessToken = createAccessToken(user._id.toHexString());
            res.cookie('accessToken', newAccessToken, {
              httpOnly: true,
              // secure: false,
              // sameSite: 'None',
            });
            req.cookies.accessToken = newAccessToken;
            next();
          });
        }
      } else {
        if (verifiedRefreshToken === null) {
          // accessToken 유효, refreshToken 만료인 경우
          await User.findOne({ refreshToken }, (err, user) => {
            if (err) {
              return res.status(400).send(err);
            }
            if (!user) {
              return res.status(400).send({ message: '인증되지 않은 유저입니다.' });
            }

            const newRefreshToken = createRefreshToken({});
            res.cookie('refreshToken', newRefreshToken, {
              httpOnly: true,
              // secure: false,
              // sameSite: 'None',
            });
            req.cookies.refreshToken = newRefreshToken;
            next();
          });
        } else {
          // accessToken, refreshToken 모두 유효한 경우
          next();
        }
      }
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  },
};
