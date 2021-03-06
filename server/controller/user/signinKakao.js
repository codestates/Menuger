const axios = require('axios');

require('dotenv').config();
const { User } = require('../../models/user');

module.exports = async (req, res) => {
  const maxAge = 5000; // cookie maxAge: 5 seconds
  const { code } = req.query;

  try {
    const { data } = await axios.post(
      'https://kauth.kakao.com/oauth/token',
      null,
      {
        params: {
          grant_type: 'authorization_code',
          client_id: process.env.CLIENT_ID,
          redirect_uri: process.env.REDIRECT_URI,
          code,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
      {
        withCredentials: true,
      },
    );

    const {
      data: { kakao_account },
    } = await axios.get(
      'https://kapi.kakao.com/v2/user/me',
      {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      },
      {
        withCredentials: true,
      },
    );

    const {
      email,
      profile: { nickname, profile_image_url: image_url },
    } = kakao_account;

    User.findOne({ email }, async (err, user) => {
      if (err) {
        return res.status(400).send(err);
      }

      if (!user) {
        await new User({
          email,
          nickname,
          image_url,
          type: 'kakao',
          refreshToken: data.refresh_token,
        }).save();
      } else {
        user.refreshToken = data.refresh_token;
        await user.save();
      }
    });

    res.cookie('kakao_login', 'success', { maxAge, domain: '.menuger.shop' });
    res.cookie('email', email, { maxAge, domain: '.menuger.shop' });
    res.cookie('nickname', nickname, { maxAge, domain: '.menuger.shop' });
    res.cookie('image_url', image_url, { maxAge, domain: '.menuger.shop' });
    res.cookie('kakaoAccessToken', data.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      domain: '.menuger.shop',
    });
    res.cookie('kakaoRefreshToken', data.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      domain: '.menuger.shop',
    });
    res.clearCookie('accessToken').clearCookie('refreshToken');
    res.redirect(process.env.SITE_DOMAIN);
  } catch (err) {
    res.cookie('kakao_login', 'fail', { maxAge });
    res.redirect(process.env.SITE_DOMAIN);
  }
};
