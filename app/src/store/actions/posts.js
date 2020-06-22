import { ADD_POST, ADD_COMMENT } from './actionTypes';
import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'https://us-central1-polonio-ig-project.cloudfunctions.net'
});

export const addPost = (post) => {
  return dispatch => {
    httpClient.post('/uploadFirebaseImage', {data: post.image})
      .catch(err => console.log(err))
      .then(res => {
        console.log(res)
        post.image = res.data.imageUrl
        axios.post('/posts.json', {
          ...post
        })
        .catch(err => console.log(err))
        .then(res => console.log(res.data))
      })
  }
};

export const addComment = (payload) => {
  return {
    type: ADD_COMMENT,
    payload
  }
};