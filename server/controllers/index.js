module.exports = {
  boardPost: require('./board/writing'),
  boardDelete: require('./board/deletion'),
  boardPatch: require('./board/correction'),
  boardDetailGet: require('./board/detailLookup'),
  boardGet: require('./board/lookup'),
  userAuth: require('./users/auth'),
  userBoard: require('./users/board'),
  signup: require('./users/signup'),
  login: require('./users/login'),
  logout: require('./users/logout'),
  memberWithdrawal: require('./users/memberWithdrawal'),
  editPicture: require('./users/editPicture'),
  order: require('./orders/order'),
  cancelOrder: require('./orders/cancel'),
  editMemberInformation: require('./users/editMemberInformation'),
  checkId: require('./users/checkId'),
  checkNickname: require('./users/checkNickname'),

  // feature/kakao-payment
  orderPayment: require('./orders/paymentTest'),

  // feature/token
  refreshTokenRequest: require('./users/refreshTokenRequest'),
};