import { SET_POSTS, ADD_COMMENT } from '../actions/actionTypes';

const initialState = {
  posts: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
      }
    case ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.payload.postId) {
            if (post.comments) {
              post.comments = post.comments.concat(
                action.payload.comment
              )
            } else {
              post.comments = [action.payload.comment]
            }
          }
        })
      }
    default:
      return state
  }
};

export default reducer;