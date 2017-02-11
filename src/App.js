import React, { PropTypes } from 'react';
import { inject, observer } from 'mobx-react';
import Token from './containers/token';
import Main from './containers/main';

@inject('github')
@observer
class App extends React.Component {

  static get propTypes() {
    return {
      github: PropTypes.object.isRequired,
      children: PropTypes.element.isRequired,
    };
  }

  constructor = () => {
    this.props.github.checkToken();
  }

  render = () => (
    <div className="container">
      {
          !this.props.github.hasToken ?
            <Token /> :
            <Main />
      }
      {
        this.props.children
      }
    </div>
  )
}

export default App;
