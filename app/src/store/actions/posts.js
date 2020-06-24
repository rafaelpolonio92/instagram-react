import { SET_POSTS, ADD_COMMENT, CREATING_POST, POST_CREATED } from './actionTypes';
import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'https://us-central1-polonio-ig-project.cloudfunctions.net'
});

export const addPost = (post) => {
  return dispatch => {
    dispatch(creatingPost())
    httpClient.post('/uploadFirebaseImage', {
      image: post.imageb64
    })
      .catch(err => console.log(err))
      .then(res => {
        post.image = res.data.imageUrl
        axios.post('/posts.json', { ...post })
          .catch(err => console.log(err))
          .then(res => {
            dispatch(getPosts())
            dispatch(postCreated())
          })
      })
  }
};

export const addComment = (payload) => {
  return {
    type: ADD_COMMENT,
    payload
  };
};

export const setPosts = (posts) => {
  return {
    type: SET_POSTS,
    payload: posts,
  };
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
        dispatch(setPosts(posts.reverse()))
      })
  }
};

export const creatingPost = () => {
  return {
    type: CREATING_POST
  };
};

export const postCreated = () => {
  return {
    type: POST_CREATED
  };
};