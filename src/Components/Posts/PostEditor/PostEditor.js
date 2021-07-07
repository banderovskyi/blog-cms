/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './PostEditor.scss';
import PostEditorItem from './PostEditorItem';
import LoaderBox from '../../LoaderBox/LoaderBox';
import Alert from '../../Alert/Alert';
import { initPosts } from '../../../state/action-creators';
import { useDispatch, useSelector } from 'react-redux';

function PostEditor() {
  const dispatch = useDispatch();
  const postsState = useSelector((state) => state);
  const [postsIsLoading, setPostsIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [postEdited, setPostEdited] = useState(false);
  const [postDeleted, setPostDeleted] = useState(false);

  const getPosts = () => {
    let postsArray = [];
    axios
      .get('http://localhost:3000/posts')
      .then((data) => {
        if (data.status === 200) {
          postsArray = data.data;
          dispatch(initPosts([...postsArray]));
          setPosts([...postsState.posts.postsArray]);
          setPostsIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    setPosts(postsState.posts.postsArray || []);
    return () => {
      setPosts([]);
    };
  }, [postsState]);

  return (
    <div className="post-editor-wrapper">
      <ul className="post-editors">
        {posts.map((post, index) =>
          postsIsLoading ? (
            <LoaderBox
              key={`${index}${post.title}`}
              width="300px"
              height="200px"
              marginBottom="20px"
            />
          ) : (
            <PostEditorItem
              postEditedState={{ postEdited, setPostEdited }}
              postDeletedState={{ postDeleted, setPostDeleted }}
              {...post}
              key={`${index}${post.title}`}
            />
          )
        )}
      </ul>
      <Alert text="A new post has been deleted" active={postDeleted} />
      <Alert text="A new post has been edited" active={postEdited} />
    </div>
  );
}

export default PostEditor;
