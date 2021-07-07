/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import './Home.scss';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import LoaderBox from '../Components/LoaderBox/LoaderBox';
import Topbar from '../Components/Topbar/Topbar';

function Home() {
  const [pageIsLoading, setPageIsLoading] = useState(true);
  const [postsIsLoading, setPostsIsLoading] = useState(true);
  const [pageTitle, setPageTitle] = useState('');
  const [pageContent, setPageContent] = useState('');
  const [buttonLink, setButtonLink] = useState('#');
  const [bannerBgImg, setBannerBgImg] = useState('');
  const [bannerTextColor, setBannerTextColor] = useState('#000');
  const [bannerPadding, setBannerPadding] = useState('50');
  const [posts, setPosts] = useState([]);
  const [showTopBar, setShowTopBar] = useState(false);

  // Get data start ========
  const getPageContent = () => {
    let pageContent = {};
    axios
      .get('http://localhost:3000/mainPage')
      .then((data) => {
        if (data.status === 200) {
          pageContent = data.data[0];
          setPageTitle(pageContent.title);
          setPageContent(pageContent.content);
          setButtonLink(pageContent.btnLink);
          setBannerBgImg(pageContent.headerImage);
          setBannerTextColor(pageContent.headerTextColor);
          setBannerPadding(pageContent.headerPaddins);
          setPageIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getPosts = () => {
    let postsArray = [];
    axios
      .get('http://localhost:3000/posts')
      .then((data) => {
        if (data.status === 200) {
          postsArray = data.data;
          setPosts([...postsArray]);
          console.log(posts);
          setPostsIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getPageContent();
    getPosts();
  }, []);

  // Top bar handle start ========
  const handleShowTopBar = (event) => {
    if (event.clientY < 69) {
      setShowTopBar(true);
    } else {
      setShowTopBar(false);
    }
  };

  // Bg handle start ========
  const bannerStyles = {
    background: `url('${bannerBgImg}') no-repeat center center/cover`,
    color: bannerTextColor,
    padding: `${bannerPadding}px`,
  };

  useEffect(() => {});

  return (
    <div onMouseMove={(event) => handleShowTopBar(event)}>
      <Topbar
        title="Homepage"
        link="/admin"
        linkName="Admin panel"
        style={{
          position: 'absolute',
          width: '100%',
          top: `${showTopBar ? '0px' : '-69px'}`,
        }}
      />
      <div className="home-page">
        <div
          className="header-banner"
          style={bannerBgImg ? { ...bannerStyles } : {}}
        >
          <div className="container">
            <h1 className="site-title">
              {pageIsLoading ? (
                <LoaderBox width="270px" height="70px" />
              ) : (
                pageTitle
              )}
            </h1>
            <div className="site-descriptions">
              {pageIsLoading ? (
                <LoaderBox width="100%" height="100px" />
              ) : (
                pageContent
              )}
            </div>
            <div className="site-cta">
              {pageIsLoading ? (
                <LoaderBox width="80px" height="30px" marginRight="0" />
              ) : (
                <a href={buttonLink} className="btn btn-success">
                  Click here
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="container section-posts">
          <h2 className="section-title">Our blog</h2>
          <ul className="site-posts">
            {postsIsLoading ? (
              <LoaderBox width="100%" height="300px" />
            ) : (
              posts.map((post, index) => {
                return (
                  <li key={Date.now() + index} className="post">
                    <a href={post.moreLink} className="post__thumb">
                      <img src={post.thumbnail} alt="" />
                    </a>
                    <div className="post__body">
                      <h3 className="post__title">{post.title}</h3>
                      <p className="post__text">{post.description}</p>
                      <div className="post__more">
                        <a href={post.moreLink} className="btn btn-primary">
                          More
                        </a>
                      </div>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
