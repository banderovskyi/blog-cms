import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useInput } from '../../../hooks';
import { newPost } from '../../../state/action-creators';
import Alert from '../../Alert/Alert';
import './PostCreator.scss';

function PostCreator() {
  const dispatch = useDispatch();
  const titleInput = useInput('');
  const thumbInput = useInput('');
  const descriptionInput = useInput('');
  const contentInput = useInput('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [emptyInput, setEmptyInput] = useState('');

  const handleSubmit = (event) => {
    const postObject = {};
    const formData = new FormData(event.target);
    event.preventDefault();
    for (let [key, value] of formData.entries()) {
      postObject[key] = value;
      if (postObject[key].length < 1) {
        setEmptyInput(key);
        return;
      }
    }
    axios({
      method: 'post',
      url: 'http://localhost:3000/posts',
      data: { ...postObject },
    })
      .then(function (response) {
        dispatch(newPost(response.data));
        setIsSuccess(true);
        titleInput.setInput('');
        thumbInput.setInput('');
        descriptionInput.setInput('');
        contentInput.setInput('');
        setEmptyInput('');
        setTimeout(() => setIsSuccess(false), 5000);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="post-creator-wrapper">
      {emptyInput.length > 0 && (
        <div className="alert alert-warning">
          {emptyInput[0].toUpperCase()}
          {emptyInput.slice(1)} is required
        </div>
      )}
      <form
        onSubmit={(event) => handleSubmit(event)}
        className="needs-validation"
      >
        <div className="mb-3">
          <label htmlFor="title-input" className="form-label">
            Title
          </label>
          <input
            name="title"
            type="text"
            className="form-control"
            id="title-input"
            placeholder="Type post title"
            {...titleInput.bind}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="thumb-input" className="form-label">
            Thumbnail url
          </label>
          <input
            name="thumbnail"
            type="text"
            className="form-control"
            id="thumb-input"
            placeholder="Upload image"
            {...thumbInput.bind}
          />
          {thumbInput.value.length > 0 && (
            <img src={thumbInput.value} className="preview-image" alt="" />
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="descr-input" className="form-label">
            Short description
          </label>
          <input
            name="description"
            type="text"
            className="form-control"
            id="descr-input"
            placeholder="Type short description for the post"
            {...descriptionInput.bind}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content-input" className="form-label">
            Post content
          </label>
          <textarea
            name="content"
            className="form-control"
            id="content-input"
            placeholder="Type all content for the post"
            {...contentInput.bind}
          ></textarea>
        </div>
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </div>
      </form>
      <Alert text="A new post has been created" active={isSuccess} />
    </div>
  );
}

export default PostCreator;
