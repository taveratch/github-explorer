import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { Router, Route, browserHistory } from 'react-router';
import Github from './stores/github';
import Issues from './stores/issues';
import Loader from './stores/loader';
import App from './App';
import Main from './containers/main';
import AuthCallback from './containers/auth-callback';
import './scss/application.scss';

const github = new Github();
const issues = new Issues();
const loader = new Loader();

class AppRoute extends Component {

  store = {
    github,
    issues,
    loader,
  }

  render() {
    return (
      <Provider {...this.store} >
        <Router history={browserHistory}>
          <Route path="/" component={App}>
            <Route path="/callback" component={AuthCallback} />
          </Route>
          <Route path="/main/:token" component={Main} />
        </Router>
      </Provider>
    );
  }
}

export default AppRoute;
