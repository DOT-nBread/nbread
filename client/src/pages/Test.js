const axios = require('axios');

const Test = () => {

  const params = {
    'cid': 'TC0ONETIME', // 테스트 코드
    'partner_order_id': 'partnet_order_id',
    'partner_user_id': 'partner_user_id',
    'item_name': '안개꽃 한 송이',
    'quantity': 1,
    'total_amount': 10000,
    'vat_amount': 200,
    'tax_free_amount': 0,
    'approval_url': 'localhost/payment/approve',
    'fail_url': 'localhost/payment/fail',
    'cancel_url': 'localhost/payment/cancel',
  };

  const handleKakaoPayment = () => {
    axios({
      url: "/v1/payment/ready",
      method: "POST",
      headers: {
        "Authorization": "KakaoAK " + process.env.REACT_APP_KAKAO_ADMIN_KEY,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      params,
    })
      .then((response) => {
        console.log(response.data)
        // const {
        //   data: {
        //     next_redirect_mobile_url, tid
        //   }
        // } = response
        // console.log(next_redirect_mobile_url)
        // console.log(tid)
      })
      .catch((err) => {
        console.log(err)
      })

    // axios.post("https://kapi.kakao.com/v1/payment/ready", params,
    //   {
    //     headers: {
    //       "Authorization": "KakaoAK " + process.env.REACT_APP_KAKAO_ADMIN_KEY,
    //       "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    //     }
    //   })
    //   .then((response) => {
    //     console.log(response.data)
    //     // return res.status(200).send({ data: response.data.next_redirect_pc_url, message: "카카오 결제 진행 페이지" })
    //   })
    //   .catch((error) => {
    //     console.log("errrrror", error)
    //   })
  }

  return (<div>
    <button onClick={handleKakaoPayment}>카카오 결제</button>
  </div>)
}
export default Test;

{/* <button onClick={() => {
  console.log("payment test")
  axios.post(`${process.env.REACT_APP_API_UR  L}/orders/payment`, {
    },{withCredentials: true})
    .then((response) => {
      console.log(response.data.data)
    })
    .catch((error) =>{
      console.log(error)
    })
}}>카카오 결제</button> */}

// axios.get(`${process.env.REACT_APP_API_URL}/chatting/${null}`)
// .then(data => dispatch(chattingModal(data)))
// .catch(err=> console.log(err))