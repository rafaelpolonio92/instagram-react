import { ADD_POST, ADD_COMMENT } from './actionTypes';
import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'https://us-central1-polonio-ig-project.cloudfunctions.net'
});

export const addPost = (post) => {
  return dispatch => {
    httpClient.post('/uploadFirebaseImage', {data: post.imageb64})
      .catch(err => console.log(err))
      .then(res => {
        console.log(res)
        post.image = res.data.imageUrl
        
      })
  }
};

export const addComment = (payload) => {
  return {
    type: ADD_COMMENT,
    payload
  }
};