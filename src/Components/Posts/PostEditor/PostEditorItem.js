import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useInput } from '../../../hooks';
import { deletePost } from '../../../state/action-creators/';
import './PostEditor.scss';

function PostEditorItem({
  title,
  description,
  content,
  thumbnail,
  id,
  postEditedState,
  postDeletedState,
}) {
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(true);
  const inputTitle = useInput(title);
  const descriptionInput = useInput(description);
  const contentInput = useInput(content);
  const thumbInput = useInput(thumbnail);

  const editPost = (event) => {
    event.preventDefault();
    const postObject = {};
    const formData = new FormData(event.target);
    for (let [key, value] of formData.entries()) {
      postObject[key] = value;
    }
    axios
      .put(`http://localhost:3000/posts/${postObject.id}`, postObject)
      .then(() => {
        postEditedState.setPostEdited(true);
        setTimeout(() => postEditedState.setPostEdited(false), 5000);
      });
  };

  const handleDeletePost = (event) => {
    dispatch(deletePost(id));
    axios.delete(`http://localhost:3000/posts/${id}`).then(() => {
      postDeletedState.setPostDeleted(true);
      setTimeout(() => postDeletedState.setPostDeleted(false), 5000);
    });
  };

  const handleEdit = () => {
    setIsDisabled((prev) => !prev);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsDisabled((prev) => !prev);
    editPost(event);
  };

  return (
    <li className="post-editors__item">
      <form onSubmit={(event) => handleSubmit(event)} className="post-editor">
        {isDisabled ? (
          <div
            onClick={handleEdit}
            className="post-editor-btn post-editor-btn_edit"
          ></div>
        ) : (
          <div>
            <button
              type="submit"
              className="post-editor-btn post-editor-btn_save"
            ></button>
            <div
              onClick={(event) => handleDeletePost(event)}
              className="post-editor-btn post-editor-btn_delete"
              dataid={id}
            ></div>
          </div>
        )}
        <input type="text" name="id" defaultValue={id} hidden />
        <h4>
          <div className="mb-3">
            <input
              type="text"
              name="title"
              className="form-control"
              disabled={isDisabled}
              {...inputTitle.bind}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="thumb"
              className="form-control"
              disabled={isDisabled}
              {...thumbInput.bind}
            />
            {thumbInput?.value.length > 0 && (
              <img
                src={thumbInput.value}
                className="mt-3"
                style={{ width: '100%' }}
                alt=""
              />
            )}
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="description"
              className="form-control"
              disabled={isDisabled}
              {...descriptionInput.bind}
            />
          </div>
          <div className="mb-3">
            <textarea
              name="content"
              className="form-control"
              style={{ height: '70px' }}
              disabled={isDisabled}
              {...contentInput.bind}
            />
          </div>
        </h4>
      </form>
    </li>
  );
}

export default PostEditorItem;
