import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { Router, Route, browserHistory } from 'react-router';
import Github from './stores/github';
import AppStore from './stores/app';
import Loader from './stores/loader';
import App from './App';
import Main from './containers/main';
import AuthCallback from './containers/auth-callback';
import './scss/loading.scss';
import './scss/layout.scss';

const github = new Github();
const app = new AppStore();
const loader = new Loader();

class AppRoute extends Component {

  store = {
    github,
    app,
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
