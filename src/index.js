import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Route from './route';
import './index.css';

injectTapEventPlugin(); // event listener for material-ui

const App = () => (
  <MuiThemeProvider>
    <Route />
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
