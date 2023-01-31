const axios = require("axios");
require('dotenv').config()

module.exports = async (req, res) => {

  console.log("payment in progress..")

  let params = {
    'cid': 'TC0ONETIME', // 테스트 코드
    'partner_order_id': '423423',
    'partner_user_id': '---',
    'item_name': '물품',
    'quantity': 1,
    'total_amount': 20000,
    'vat_amount': 200,
    'tax_free_amount': 0,
    'approval_url': 'localhost/payment/approve',
    'fail_url': 'localhost/payment/fail',
    'cancel_url': 'localhost/payment/cancel',
  };

  axios({
    method: "post",
    url: "https://kapi.kakao.com/v1/payment/ready",
    headers: {
      "Authorization": "KakaoAK " + process.env.KAKAO_ADMIN_KEY,
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    data: params,
  })
    .then((response) => {
      // console.log(response.data)
      return res.status(200).send({ data: response.data.next_redirect_pc_url, message: "카카오 결제 진행 페이지" })
    })
    .catch((error) => {
      console.log("errrrror", error)
    })
}