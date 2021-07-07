import React from 'react';
import { Link } from 'react-router-dom';
import './Topbar.scss';

function Topbar({ title, link, linkName, style }) {
  return (
    <div className="top-bar d-flex align-items-center" style={style}>
      <h1 className="top-bar__title">{title}</h1>
      <Link className="top-bar__btn btn btn-success" to={link}>
        {linkName}
      </Link>
    </div>
  );
}

export default Topbar;
