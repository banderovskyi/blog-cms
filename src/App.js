import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Admin from './Pages/Admin';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} />} />
          <Route path="/admin/" render={(props) => <Admin {...props} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
