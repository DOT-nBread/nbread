const {
  checkRefeshToken,
  generateAccessToken,
  resendAccessToken,
} = require('../tokenFunctions');
const { user } = require('../../models');

module.exports = (req, res) => {
  // console.log(req.cookie)
  const refreshToken = req.cookies.nbjwt;

  if (!refreshToken) {
    // return res.status(403).send("refresh token does not exist, you've never logged in before");
    return res.send({ data: null, message: 'refresh token가 존재하지 않음' });
  }

  const refreshTokenData = checkRefeshToken(refreshToken);
  if (!refreshTokenData) {
    return res.send({
      data: null,
      message: '유효하지 않은 refresh token',
    });
  }

  const { id } = refreshTokenData;
  user.findOne({ where: { id } })
    .then((data) => {
      if (!data) {
        return res.send({
          data: null,
          message: '존재하지 않는 아이디',
        });
      }
      // delete data.dataValues.password;

      const newAccessToken = generateAccessToken(data.dataValues);
      resendAccessToken(res, newAccessToken, data.dataValues);
    })
    .catch((err) => {
      console.log(err);
    });
};
