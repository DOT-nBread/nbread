const { user } = require('../../models');
const { generateAccessToken, generateRefreshToken, sendAccessToken, sendRefreshToken } = require('../tokenFunctions'); 

module.exports = (req, res) => {
  console.log(req.body)
  user.findOne({
    where: {
      username: req.body.username,
      password: req.body.password
    }
  }).then( (result) => {
    if (!result) {
      return res.send({ message: '아이디 또는 비밀번호가 일치하지 않습니다' });
    }

    let userInfo = {
      id: result.dataValues.id,
      username: result.dataValues.username,
      nickname: result.dataValues.nickname,
      picture: result.dataValues.picture,
      address: result.dataValues.address,
      phone_number: result.dataValues.phone_number
    };
    const accessToken = generateAccessToken(userInfo);

    // feature/token
    const refreshToken = generateRefreshToken(userInfo);
    sendRefreshToken(res, refreshToken);

    sendAccessToken(res, accessToken);

    // res.status(200).send({ data: { accessToken }, message: '로그인 성공' });

  }).catch( (err) => {
    console.log(err)
    res.status(500).send({ message: '서버 에러' });
  });
};