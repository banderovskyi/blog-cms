/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useInput } from '../../hooks';
import Alert from '../Alert/Alert';
import LoaderBox from '../LoaderBox/LoaderBox';
import './Settings.scss';

function Settings(props) {
  const pageTitle = useInput('');
  const pageContent = useInput('');
  const pageButtonLink = useInput('');
  const pageHeaderImage = useInput('');
  const pageHeaderTextColor = useInput('');
  const pageHeaderPaddings = useInput('50');
  const [isInputsLoading, setIsInputsLoading] = useState(true);
  const [successSend, setSuccessSend] = useState(false);

  const getPosts = () => {
    let pageData = [];
    axios
      .get('http://localhost:3000/mainPage/1')
      .then((data) => {
        if (data.status === 200) {
          pageData = data.data;
          pageTitle.setInput(pageData.title);
          pageContent.setInput(pageData.content);
          pageButtonLink.setInput(pageData.btnLink);
          pageHeaderImage.setInput(pageData.headerImage);
          pageHeaderTextColor.setInput(pageData.headerTextColor);
          pageHeaderPaddings.setInput(pageData.headerPaddins);
          setIsInputsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleSubmit = (event) => {
    const postObject = {};
    const formData = new FormData(event.target);
    event.preventDefault();
    for (let [key, value] of formData.entries()) {
      postObject[key] = value;
    }
    axios
      .put(`http://localhost:3000/mainPage/1`, postObject)
      .then(function (response) {
        console.log(response);
        setSuccessSend(true);
        setTimeout(() => {
          setSuccessSend(false);
        }, 2000);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <div>
        <h2 className="mb-4">Settings</h2>
        <h4>Home page</h4>
        <hr />
        <form onSubmit={(event) => handleSubmit(event)}>
          <input name="id" defaultValue="1" hidden />
          <div className="mb-3">
            <label htmlFor="title-input" className="form-label">
              Title
            </label>
            {isInputsLoading ? (
              <LoaderBox width="100%" height="40px" />
            ) : (
              <input
                name="title"
                type="text"
                className="form-control"
                id="title-input"
                placeholder="Type site title"
                {...pageTitle.bind}
              />
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="content-input" className="form-label">
              Content
            </label>
            {isInputsLoading ? (
              <LoaderBox width="100%" height="80px" />
            ) : (
              <textarea
                name="content"
                type="text"
                className="form-control"
                id="content-input"
                placeholder="Type site content"
                {...pageContent.bind}
              />
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="button-link" className="form-label">
              Button link
            </label>

            {isInputsLoading ? (
              <LoaderBox width="100%" height="40px" />
            ) : (
              <input
                name="btnLink"
                type="text"
                className="form-control"
                id="button-link"
                placeholder="Type a new link"
                {...pageButtonLink.bind}
              />
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="header-image" className="form-label">
              Header image url
            </label>

            {isInputsLoading ? (
              <LoaderBox width="100%" height="40px" />
            ) : (
              <input
                name="headerImage"
                type="text"
                className="form-control input-hide-symols"
                id="header-image"
                placeholder="Type a link for the header image"
                {...pageHeaderImage.bind}
              />
            )}
            {pageHeaderImage.value.length > 0 && (
              <img
                src={pageHeaderImage.value}
                className="preview-image"
                alt=""
              />
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="header-text-color" className="form-label">
              Header text color:
            </label>

            {isInputsLoading ? (
              <LoaderBox width="100%" height="40px" />
            ) : (
              <input
                name="headerTextColor"
                type="color"
                className="form-control input-color"
                id="header-text-color"
                {...pageHeaderTextColor.bind}
              />
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="header-paddings" className="form-label">
              Set header paddings: {pageHeaderPaddings.value}
            </label>

            {isInputsLoading ? (
              <LoaderBox width="100%" height="40px" />
            ) : (
              <input
                name="headerPaddins"
                type="range"
                className=" input-range"
                id="header-paddings"
                min="0"
                max="100"
                {...pageHeaderPaddings.bind}
              />
            )}
          </div>
          <button className="btn btn-primary">Save</button>
        </form>
      </div>
      <Alert text="Saved" active={successSend} />
    </>
  );
}

export default Settings;
