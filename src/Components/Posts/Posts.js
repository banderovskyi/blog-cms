import React, { useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import PostCreator from './PostCreator/PostCreator';
import PostEditor from './PostEditor/PostEditor';
import './Posts.scss';

function Posts({ match }) {
  const [tabs, setTabs] = useState([
    {
      path: `${match.url}/create`,
      title: `Create new`,
      isActive: true,
    },
    {
      path: `${match.url}/edit`,
      title: `Edit posts`,
      isActive: false,
    },
  ]);

  const handleTabClick = (tabIndex) => {
    setTabs((prev) => {
      const newTabs = prev.map((tab, index) => {
        if (tabIndex === index) {
          tab.isActive = true;
        } else {
          tab.isActive = false;
        }
        return tab;
      });
      return newTabs;
    });
  };

  return (
    <div>
      <h2 className="mb-4">Posts</h2>
      <div className="container-fluid container-p0">
        <div className="row">
          <div className="col-12">
            <ul className="nav nav-tabs mb-0">
              {tabs.map((tab, i) => (
                <li key={`${Date.now() + i}`} className="nav-item">
                  <Link
                    to={tab.path}
                    onClick={() => handleTabClick(i)}
                    className={`nav-link ${tab.isActive ? 'active' : ''}`}
                  >
                    {tab.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Route path={'/admin/posts/create/'} component={PostCreator} />
          </div>
          <div className="col-12">
            <Route path={'/admin/posts/edit/'} component={PostEditor} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
