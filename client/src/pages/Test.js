const axios = require('axios');

const Test = () => {
  return (<div>
    <button onClick={() => {
      console.log("payment test")
      axios.post(`${process.env.REACT_APP_API_URL}/orders/payment`, {
        },{withCredentials: true})
        .then((response) => {
          console.log(response.data.data)
        })
        .catch((error) =>{
          console.log(error)
        })
    }}>카카오 결제</button>
  </div>)
}
export default Test;

// axios.get(`${process.env.REACT_APP_API_URL}/chatting/${null}`)
// .then(data => dispatch(chattingModal(data)))
// .catch(err=> console.log(err))