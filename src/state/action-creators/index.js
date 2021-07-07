export const newPost = (post) => {
  return (dispatch) => {
    dispatch({
      type: 'NEW_POST',
      payload: post,
    });
  };
};

export const deletePost = (post) => {
  return (dispatch) => {
    dispatch({
      type: 'DELETE_POST',
      payload: post,
    });
  };
};

export const initPosts = (post) => {
  return (dispatch) => {
    dispatch({
      type: 'INIT_POSTS',
      payload: post,
    });
  };
};
