import { SET_POSTS, ADD_COMMENT } from './actionTypes';
import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'https://us-central1-polonio-ig-project.cloudfunctions.net'
});

export const addPost = (post) => {
  return dispatch => {
    httpClient.post('/uploadFirebaseImage', {data: post.imageb64})
      .catch(err => console.log(err))
      .then(res => {
        post.image = res.data.imageUrl
        axios.post('/posts.json', { ...post })
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

export const setPosts = (posts) => {
  return {
    type: SET_POSTS,
    payload: posts,
  }
};

export const getPosts = () => {
  return dispatch => {
    axios.get('/posts.json')
      .catch(err => console.log(err))
      .then(res => {
        const rawPosts = res.data
        const posts = []
        for (let key in rawPosts) {
          posts.push({
            ...rawPosts[key],
            id: key
          })
        }
        dispatch(setPosts(posts))
      })
  }
};