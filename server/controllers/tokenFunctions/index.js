const { sign, verify } = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, {expiresIn: "1h"});
  },
  generateRefreshToken: (data) => {
    return sign(data, process.env.REFRESH_SECRET, { expiresIn: "30d" });
  },
  sendRefreshToken: (res, refreshToken) => {
    res.cookie("nbjwt", refreshToken, {
      httpOnly: true,
    });
  },
  sendAccessToken: (res, accessToken) => {
    res.status(200).send({ data: { accessToken }, message: '로그인 성공' });
  },
  isAuthorized: (req, res) => {

    // let auth = req.headers.cookie;
    // if (!auth) {
    //   return null;
    // }

    const token = req.headers["authorization"];
    if (!token) {
      return null;
    }

    // let token = auth.split(' ')[0].split('=')[1];

    try {
      return verify(token, process.env.ACCESS_SECRET);
    } catch (err) {
      console.log(err);
    }
  },
  resendAccessToken: (res, accessToken, data) => {
    res.send({ data: { accessToken, userInfo: data }, message: "accessToken 재발급" });
  },
  checkRefeshToken: (refreshToken) => {
    try {
      return verify(refreshToken, process.env.REFRESH_SECRET);
    } catch (err) {
      // return null if refresh token is not valid
      return null;
    }
  },
};