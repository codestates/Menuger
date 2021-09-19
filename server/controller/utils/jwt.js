require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');
const { User } = require('../../models/user');

module.exports = {
  createAccessToken(payload) {
    try {
      return sign({ payload }, process.env.ACCESS_SECRET, {
        expiresIn: '3h',
      });
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  createRefreshToken(payload) {
    try {
      return sign(payload, process.env.REFRESH_SECRET, {
        expiresIn: '14d',
      });
    } catch (err) {
      return null;
    }
  },
  verifyAccessToken(token) {
    try {
      if (!token) {
        return null;
      }
      return verify(token, process.env.ACCESS_SECRET);
    } catch (err) {
      return null;
    }
  },
  verifyRefreshToken(token) {
    try {
      if (!token) {
        return null;
      }
      return verify(token, process.env.REFRESH_SECRET);
    } catch (err) {
      return null;
    }
  },
  checkToken(req, res, next) {
    try {
      let { accessToken, refreshToken } = req.cookies;
      if (accessToken === undefined) {
        throw Error('사용 권한이 없습니다');
      }
      const verifiedAccessToken = this.verifyAccessToken(accessToken);
      const verifiedRefreshToken = this.verifyRefreshToken(refreshToken);

      if (verifiedAccessToken === null) {
        if (verifiedRefreshToken === null) {
          // accessToken, refreshToken 모두 만료된 경우
          throw Error('사용 권한이 없습니다');
        } else {
          // accessToken 만료, refreshToken 유효한 경우
          User.fineOne({ refreshToken }, (err, user) => {
            if (err) {
              return res.status(400).send(err);
            }
            if (!user) {
              return res.status(400).send({ message: '인증되지 않은 유저입니다.' });
            }

            const newAccessToken = this.createAccessToken(user._id.toHexString());
            res.cookie('accessToken', newAccessToken, {
              httpOnly: true,
              secure: true,
              sameSite: 'None',
            });
            accessToken = newAccessToken;
            next();
          });
        }
      } else {
        if (verifiedRefreshToken === null) {
          // accessToken 유효, refreshToken 만료인 경우
          const newRefreshToken = this.createRefreshToken({});
          res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
          });
          refreshToken = newRefreshToken;
          next();
        } else {
          // accessToken, refreshToken 모두 유효한 경우
          next();
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: err.message });
    }
  },
};
