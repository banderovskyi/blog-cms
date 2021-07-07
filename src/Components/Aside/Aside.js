import React from 'react';
import { Link } from 'react-router-dom';
import './Aside.scss';

function Aside({ match }) {
  return (
    <aside className="aside">
      <h5>Welcome, Name!</h5>
      <ul>
        <li>
          <Link to={`${match.url}/posts/create`}>Posts</Link>
        </li>
        <li>
          <Link to={`${match.url}/settings`}>Settings</Link>
        </li>
      </ul>
    </aside>
  );
}

export default Aside;
