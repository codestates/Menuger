require('dotenv').config();
const axios = require('axios');
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
      if (req.cookies.kakaoAccessToken) {
        // kakao 로그인일 경우
        let { kakaoAccessToken, kakaoRefreshToken } = req.cookies;

        await User.findOne({ refreshToken: kakaoRefreshToken }, async (err, user) => {
          if (err) {
            return res.status(400).send(err);
          }
          if (!user) {
            return res.status(400).send({ message: '인증되지 않은 유저입니다.' });
          }

          const { expires_in } = await axios.get(
            'https://kapi.kakao.com/v1/user/access_token_info',
            {
              headers: {
                Authorization: `Bearer ${kakaoAccessToken}`,
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
              },
            },
            {
              withCredentials: true,
            },
          );
          if (expires_in <= 0) {
            const { access_token, refresh_token = null } = await axios.post(
              'https://kauth.kakao.com/oauth/token',
              {
                params: {
                  grant_type: 'refresh_token',
                  client_id: process.env.CLIENT_ID,
                  refresh_token: kakaoRefreshToken,
                },
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                },
              },
              {
                withCredentials: true,
              },
            );

            res.cookie('kakaoAccessToken', access_token, {
              httpOnly: true,
              ...(process.env.COOKIE_SECURE === 'true'
                ? { secure: true, sameSite: 'None', domain: '.menuger.shop' }
                : null),
            });
            req.cookies.kakaoAccessToken = access_token;

            if (refresh_token !== null) {
              res.cookie('kakaoRefreshToken', refresh_token, {
                httpOnly: true,
                ...(process.env.COOKIE_SECURE === 'true'
                  ? { secure: true, sameSite: 'None', domain: '.menuger.shop' }
                  : null),
              });
              req.cookies.kakaoRefreshToken = refresh_token;
              user.refreshToken = refresh_token;
              await user.save();
            }
          }
          next();
        });
      } else {
        // 서비스 자체 로그인일 경우
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
                ...(process.env.COOKIE_SECURE === 'true'
                  ? { secure: true, sameSite: 'None', domain: '.menuger.shop' }
                  : null),
              });
              req.cookies.accessToken = newAccessToken;
              next();
            });
          }
        } else {
          if (verifiedRefreshToken === null) {
            // accessToken 유효, refreshToken 만료인 경우
            await User.findOne({ refreshToken }, async (err, user) => {
              if (err) {
                return res.status(400).send(err);
              }
              if (!user) {
                return res.status(400).send({ message: '인증되지 않은 유저입니다.' });
              }

              const newRefreshToken = createRefreshToken({});
              res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                ...(process.env.COOKIE_SECURE === 'true'
                  ? { secure: true, sameSite: 'None', domain: '.menuger.shop' }
                  : null),
              });
              req.cookies.refreshToken = newRefreshToken;

              user.refreshToken = newRefreshToken;
              await user.save();
              next();
            });
          } else {
            // accessToken, refreshToken 모두 유효한 경우
            next();
          }
        }
      }
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  },
};
