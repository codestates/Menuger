require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

module.exports = {
  createAccessToken(payload) {
    try {
      return sign({ payload }, process.env.ACCESS_SECRET, {
        expiresIn: '4h',
      });
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  createRefreshToken(payload) {
    try {
      return sign(payload, process.env.REFRESH_SECRET, {
        expiresIn: '7d',
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
};
