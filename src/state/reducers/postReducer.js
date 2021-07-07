const postReducer = (state = {}, action) => {
  switch (action.type) {
    case 'NEW_POST':
      return {
        ...state,
        postsArray: [...state.postsArray, action.payload],
      };
    case 'DELETE_POST':
      const deletedPostId = action.payload;
      const newPosts = state.postsArray.filter(
        (post) => deletedPostId !== post.id
      );
      return {
        ...state,
        postsArray: [...newPosts],
      };
    case 'INIT_POSTS':
      state.postsArray = action.payload;
      return state;
    default:
      return state;
  }
};

export default postReducer;
