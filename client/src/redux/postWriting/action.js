import axios from 'axios';
import { WRITING_POST_SUCCESS, WRITING_POST_FAILURE } from "./types";
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io.connect(`${process.env.REACT_APP_API_URL}`);

const writingPostSuccess = (post) => {

  return {
    type : WRITING_POST_SUCCESS,
    payload : post
  }
}

const writingPostFailure = (error) => {
  return {
    type: 'WRITING_POST_FAILURE',
    error,
  }
};

export const writingPost = (post) => {

  return (dispatch) => {
    axios.post(`${process.env.REACT_APP_API_URL}/contents`, {
      address: post.address,
      body: post.body,
      category_food: post.category_food,
      delivery_fee: post.delivery_fee,
      recruitment_personnel: post.recruitment_personnel,
      restaurant_name: post.restaurant_name,
      lat: post.lat,
      lng: post.lng,
    }, {withCredentials: true})
    .then(data => {
      if(data.status === 201){
        dispatch(writingPostSuccess(post))
        
        let id = data.data.data.id
        let roomName = data.data.data.roomName
        let nickname = post.nickname
        let categoryFood = post.category_food

        socket.emit('createRoom', ({ id, nickname, roomName, categoryFood }));
      }else{
        dispatch(writingPostFailure())
      }
    })
    .catch(err=> dispatch(writingPostFailure(err)))
  }
}
