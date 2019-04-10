import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Auth from './components/Auth/Auth';

import './styles/index.css';
import * as serviceWorker from './workers/serviceWorker';

// Function that will authenticate if someone os signed in, only people who are signed in can view the route
function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          Auth.isAuthenticated() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
}

// Declaring our routes using react router
ReactDOM.render(
    <Router>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
    </Router>
, document.getElementById('root'));

serviceWorker.unregister();
