import React from 'react';
import { Route } from 'react-router-dom';
import Topbar from '../Components/Topbar/Topbar';
import Aside from '../Components/Aside/Aside';
import Posts from '../Components/Posts/Posts';
import Settings from '../Components/Settings/Settings';

function Admin({ match }) {
  return (
    <>
      <Topbar title="Admin panel" link="/" linkName="Home page" />
      <div className="container-fluid content">
        <div className="row">
          <div className="col-12 col-md-2">
            <Aside match={match} />
          </div>
          <div className="col-12  col-md-10">
            <main className="main">
              <Route
                exact
                path={`/admin`}
                render={(props) => <p>Here you can configure your site</p>}
              />
              <Route
                path={`/admin/posts`}
                render={(props) => <Posts {...props} />}
              />
              <Route
                path={`/admin/settings/`}
                render={(props) => <Settings {...props} />}
              />
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
